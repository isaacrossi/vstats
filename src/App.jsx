import { Dropdown } from "./components/Dropdown";
import { useCallback, useEffect, useReducer, useState } from "react";
import { apiOptions } from "./config/apiOptions";
import { playersReducer } from "./reducers/playersReducer";
import { Table } from "./components/Table";
import { SearchForm } from "./components/SearchForm";
import { getPlayerUrl } from "./config/apiUrls";
import { teams } from "./data/teams";
import axios from "axios";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("0");
  const [urls, setUrls] = useState(getPlayerUrl("", "0", "1"));

  const [players, dispatchPlayers] = useReducer(playersReducer, {
    data: [],
    page: "1",
    isLoading: false,
    isError: false,
  });

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSubmittedSearchTerm(searchTerm);
    setSelectedTeamId("0");
    setUrls(getPlayerUrl(searchTerm, "0"));
  };

  const handleSearchCancel = () => {
    setSearchTerm("");
    setSubmittedSearchTerm("");
    setSelectedTeamId("0");
    setUrls(getPlayerUrl("", "0"));
  };

  const handleDropdownChange = (item) => {
    setSelectedTeamId(item.id);
    setUrls(getPlayerUrl(submittedSearchTerm, item.id));
    searchTerm && setSearchTerm("");
  };

  const handleFetchPlayers = useCallback(async () => {
    dispatchPlayers({ type: "PLAYERS_FETCH_INIT" });

    try {
      console.log("Fetching players with URL:", urls); // Log the URL
      const result = await axios.get(urls, apiOptions);
      console.log("API response:", result.data); // Log the API response
      dispatchPlayers({
        type: "PLAYERS_FETCH_SUCCESS",
        payload: {
          list: result.data.response,
          page: result.data.paging.current,
        },
      });
    } catch (error) {
      console.error("API fetch error:", error); // Log any errors
      dispatchPlayers({ type: "PLAYERS_FETCH_FAILURE" });
    }
  }, [urls]);

  useEffect(() => {
    handleFetchPlayers();
  }, [handleFetchPlayers]);

  return (
    <div className="bg-blue-1000">
      <div className="container mx-auto">
        <header className="h-1/2 pt-28 pb-14 bg-blue-diagonal bg-cover bg-no-repeat">
          <h1 className="mb-12 font-heading text-4xl text-slate-50 uppercase">
            Players
          </h1>

          <div className="flex flex-col">
            <SearchForm
              searchTerm={searchTerm}
              submittedSearchTerm={submittedSearchTerm}
              onSearchInput={handleSearchInput}
              onSearchSubmit={handleSearchSubmit}
              onSearchCancel={handleSearchCancel}
            />
            <Dropdown
              id="team-dropdown"
              data={teams}
              title="All Teams"
              selectedItemId={selectedTeamId}
              hasImage={true}
              category="team"
              imgKey="logo"
              onChange={handleDropdownChange}
              submittedSearchTerm={submittedSearchTerm}
            />
          </div>
        </header>
        <hr className="border-slate-600" />
        {players.isError && (
          <p className="text-slate-50">Something went wrong...</p>
        )}
        {players.isLoading ? (
          <p className="text-slate-50">Loading....</p>
        ) : (
          <Table
            list={players.data}
            searchTerm={searchTerm}
            submittedSearchTerm={submittedSearchTerm}
          />
        )}
      </div>
    </div>
  );
};

export default App;
