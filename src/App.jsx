import React, { useState, useReducer, useEffect } from "react";
import { playersReducer } from "./reducers/playersReducer";
import { Dropdown } from "./components/Dropdown";
import { Table } from "./components/Table";
import { SearchForm } from "./components/SearchForm";
import { teams } from "./data/teams";
import { fetchPlayers } from "./utils/fetchPlayers";
import { monitorScrollForInfiniteFetching } from "./utils/scrollUtils";

const App = () => {
  //we've basically added a reachedBottom state to track if the user has reached the bottom of the page and then debounced our checkScrollPosition function to run every 200ms. This way, we can avoid calling the function too frequently and causing performance issues.

  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState(0);
  const [hasReachedBottom, setHasReachedBottom] = useState(false); // Track if bottom is reached

  const [players, dispatchPlayers] = useReducer(playersReducer, {
    data: [],
    page: 1,
    totalPage: null,
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    monitorScrollForInfiniteFetching(
      fetchMorePlayers,
      players,
      setHasReachedBottom,
      hasReachedBottom
    );
  }, [players.isLoading, hasReachedBottom]); // Only reattach if loading state or bottom state changes

  // Function to handle fetching more players
  const fetchMorePlayers = () => {
    if (!players.isLoading && players.page < players.totalPage) {
      fetchPlayers(
        players.page + 1,
        submittedSearchTerm,
        selectedTeamId,
        dispatchPlayers
      ).then(() => {
        setHasReachedBottom(false); // Allow fetching again once new data is loaded
      });
    }
  };

  const handleSearchCancel = () => {
    setSearchTerm("");
    setSubmittedSearchTerm("");
    setSelectedTeamId(0);
    dispatchPlayers({ type: "PLAYERS_RESET" });
    fetchPlayers(1, "", 0, dispatchPlayers);
  };

  // Function to handle search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatchPlayers({ type: "PLAYERS_RESET" });
    setSubmittedSearchTerm(searchTerm);
    fetchPlayers(1, searchTerm, selectedTeamId, dispatchPlayers);
  };

  // Function to handle dropdown selection
  const handleDropdownChange = (item) => {
    if (item.id !== selectedTeamId) {
      searchTerm && setSearchTerm("");
      dispatchPlayers({ type: "PLAYERS_RESET" });
      setSelectedTeamId(item.id);
      fetchPlayers(1, submittedSearchTerm, item.id, dispatchPlayers);
      setHasReachedBottom(false); // Reset bottom state
    }
  };

  // Initial fetch for players when component mounts or dependencies change
  useEffect(() => {
    fetchPlayers(1, searchTerm, selectedTeamId, dispatchPlayers);
  }, [searchTerm, selectedTeamId]);

  return (
    <div className="bg-blue-1000 pb-28">
      <div className="container mx-auto">
        <header className="h-1/2 pt-28 pb-14 bg-blue-diagonal bg-contain bg-no-repeat">
          <h1 className="mb-12 font-heading text-4xl text-slate-50 uppercase">
            Players
          </h1>

          <div className="flex flex-col">
            <Dropdown
              id="team-dropdown"
              data={teams}
              title="All Teams"
              selectedItemId={selectedTeamId}
              hasImage={true}
              category="team"
              imgKey="logo"
              onChange={handleDropdownChange}
            />
            {selectedTeamId === 0 && (
              <SearchForm
                searchTerm={searchTerm}
                submittedSearchTerm={submittedSearchTerm}
                onSearchInput={(e) => setSearchTerm(e.target.value)}
                onSearchSubmit={handleSearchSubmit}
                onSearchCancel={handleSearchCancel}
                selectedItemId={selectedTeamId}
              />
            )}
          </div>
        </header>
        <hr className="border-slate-600" />
        {players.isError && (
          <p className="text-slate-50">Something went wrong...</p>
        )}
        <Table
          list={players.data}
          searchTerm={searchTerm}
          submittedSearchTerm={submittedSearchTerm}
        />
        {players.isLoading && <p className="text-slate-50">Loading....</p>}
      </div>
    </div>
  );
};

export default App;
