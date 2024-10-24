import React, { useState, useEffect } from "react";
import { Dropdown } from "./components/Dropdown";
import { Table } from "./components/Table";
import { SearchForm } from "./components/SearchForm";
import { teams } from "../../data/teams";
import { fetchPlayers } from "../../utils/fetchPlayers";
import { monitorScrollForInfiniteFetching } from "../../utils/scrollUtils";
import { usePlayers } from "../../hooks/usePlayers";

export const Players = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState(0);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);

  const [players, dispatchPlayers, fetchMorePlayers] = usePlayers(
    selectedTeamId,
    submittedSearchTerm,
    setHasReachedBottom
  );

  useEffect(() => {
    monitorScrollForInfiniteFetching(
      fetchMorePlayers,
      players,
      setHasReachedBottom,
      hasReachedBottom
    );
  }, [players.isLoading, hasReachedBottom]);

  const handleSearchCancel = () => {
    setSearchTerm("");
    setSubmittedSearchTerm("");
    setSelectedTeamId(0);
    dispatchPlayers({ type: "PLAYERS_RESET" });
    fetchPlayers(1, "", 0, dispatchPlayers);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatchPlayers({ type: "PLAYERS_RESET" });
    setSubmittedSearchTerm(searchTerm);
    fetchPlayers(1, searchTerm, selectedTeamId, dispatchPlayers);
  };

  const handleDropdownChange = (item) => {
    if (item.id !== selectedTeamId) {
      dispatchPlayers({ type: "PLAYERS_RESET" });
      searchTerm && setSearchTerm("");
      setSubmittedSearchTerm("");
      setSelectedTeamId(item.id);
      fetchPlayers(1, "", item.id, dispatchPlayers);
      setHasReachedBottom(false); // Reset bottom state
    }
  };

  useEffect(() => {
    fetchPlayers(1, searchTerm, selectedTeamId, dispatchPlayers);
  }, []);

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

export default Players;
