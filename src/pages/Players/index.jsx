import React, { useState, useEffect } from "react";
import { Dropdown } from "../../shared/components/Dropdown";
import { Table } from "./components/Table";
import { SearchForm } from "./components/SearchForm";
import { teams } from "../../data/teams";
import { monitorScrollForInfiniteFetching } from "../../utils/scrollUtils";
import { usePlayers } from "../../hooks/usePlayers";
import { Header } from "../../shared/components/Header";

export const Players = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState(0);

  const {
    players,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePlayers(selectedTeamId, submittedSearchTerm);

  useEffect(() => {
    monitorScrollForInfiniteFetching(
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage
    );
  }, [hasNextPage, isFetchingNextPage]);

  const handleSearchCancel = () => {
    setSearchTerm("");
    setSubmittedSearchTerm("");
    setSelectedTeamId(0);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSubmittedSearchTerm(searchTerm);
  };

  const handleDropdownChange = (item) => {
    if (item.id !== selectedTeamId) {
      searchTerm && setSearchTerm("");
      setSubmittedSearchTerm("");
      setSelectedTeamId(item.id);
    }
  };

  console.log(players);

  return (
    <div className="bg-blue-50 pb-28">
      <div className="bg-blue-1000">
        <Header>
          <h1 className="mb-12 font-heading text-3xl lg:text-4xl text-slate-50 uppercase">
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
              isDark={true}
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
        </Header>
      </div>
      {isError && <p className="text-slate-50">Something went wrong...</p>}
      <div className="xl:container mx-auto px-4 pt-10 md:pt-14 pb-14 md:pb-20">
        <Table
          list={players}
          searchTerm={searchTerm}
          submittedSearchTerm={submittedSearchTerm}
        />
        {isLoading && <p className="text-slate-50">Loading....</p>}
      </div>
    </div>
  );
};

export default Players;
