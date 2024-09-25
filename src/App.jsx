import React, { useState, useReducer, useEffect } from "react";
import { debounce } from "lodash";
import { playersReducer } from "./reducers/playersReducer";
import { Dropdown } from "./components/Dropdown";
import { Table } from "./components/Table";
import { SearchForm } from "./components/SearchForm";
import { teams } from "./data/teams";
import { apiOptions } from "./config/apiOptions";
import axios from "axios";
import { getPlayerUrl } from "./config/apiUrls";

const fetchPlayers = async (page, searchTerm, teamId, dispatch) => {
  dispatch({ type: "PLAYERS_FETCH_INIT" });

  try {
    const url = getPlayerUrl(searchTerm, teamId, page);
    console.log("Fetching players with URL:", url); // Log the URL
    const result = await axios.get(url, apiOptions);
    console.log("API response:", result.data); // Log the API response
    dispatch({
      type: "PLAYERS_FETCH_SUCCESS",
      payload: {
        list: result.data.response,
        page: result.data.paging.current,
        totalPage: result.data.paging.total,
      },
    });
  } catch (error) {
    console.error("API fetch error:", error); // Log any errors
    dispatch({ type: "PLAYERS_FETCH_FAILURE" });
  }
};

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

  // Function to check if the user has scrolled to the bottom
  const checkScrollPosition = debounce(() => {
    const buffer = 100; // Buffer to trigger early
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const isScrollNearEnd = viewportHeight + scrollY + buffer >= documentHeight;

    if (isScrollNearEnd && !players.isLoading && !hasReachedBottom) {
      console.log("Reached bottom, fetching more players...");
      setHasReachedBottom(true); // Prevent further fetches
      handleMore();
    }
  }, 500); // Debounce with 200ms delay

  // Handle scroll and resize events
  useEffect(() => {
    const handleScroll = () => {
      checkScrollPosition(); // Check scroll position directly
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listeners on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [players.isLoading, hasReachedBottom]); // Only reattach if loading state or bottom state changes

  // Function to handle fetching more players
  const handleMore = () => {
    if (!players.isLoading && players.page <= players.totalPage) {
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
      dispatchPlayers({ type: "PLAYERS_RESET" });
      setSelectedTeamId(item.id);
      fetchPlayers(1, submittedSearchTerm, item.id, dispatchPlayers);
      searchTerm && setSearchTerm("");
    }
  };

  // Initial fetch for players when component mounts or dependencies change
  useEffect(() => {
    fetchPlayers(1, searchTerm, selectedTeamId, dispatchPlayers);
  }, [searchTerm, selectedTeamId]);

  return (
    <div className="bg-blue-1000">
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
