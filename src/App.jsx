import { Dropdown } from "./components/Dropdown";
import { useCallback, useEffect, useReducer, useState } from "react";
import { apiOptions } from "./config/apiOptions";
import { playersReducer } from "./reducers/playersReducer";
import { Table } from "./components/Table";
import { SearchForm } from "./components/SearchForm";
import { getPlayerUrl } from "./config/apiUrls";
import { teams } from "./data/teams";
import axios from "axios";

const fetchPlayers = async (url, options) => {
  try {
    console.log("Fetching players with URL:", url);
    const result = await axios.get(url, options);
    console.log("API response:", result.data);
    return result.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("0");
  const [urls, setUrls] = useState([getPlayerUrl(searchTerm, "0", "1")]);

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
    dispatchPlayers({ type: "PLAYERS_RESET" });
    setSubmittedSearchTerm(searchTerm);
    const url = getPlayerUrl(searchTerm, "0", "1");
    setUrls(urls.concat(url));
    event.preventDefault();
  };

  const handleMore = () => {
    const url = getPlayerUrl(
      submittedSearchTerm,
      selectedTeamId,
      players.page + 1
    );
    setUrls(urls.concat(url));
  };

  const handleSearchCancel = () => {
    setSearchTerm("");
    setSubmittedSearchTerm("");
    setSelectedTeamId("0");
    setUrls(getPlayerUrl("", "0"));
  };

  const handleDropdownChange = (item) => {
    dispatchPlayers({ type: "PLAYERS_RESET" });
    setSelectedTeamId(item.id);
    setUrls(getPlayerUrl(submittedSearchTerm, item.id, "1"));
    searchTerm && setSearchTerm("");
  };

  const handleFetchPlayers = useCallback(async () => {
    dispatchPlayers({ type: "PLAYERS_FETCH_INIT" });

    try {
      console.log("Fetching players with URL:", urls); // Log the URL
      const data = await fetchPlayers(urls, apiOptions);
      console.log("API response:", data); // Log the API response
      dispatchPlayers({
        type: "PLAYERS_FETCH_SUCCESS",
        payload: {
          list: data.response,
          page: data.paging.current,
        },
      });
    } catch (error) {
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
      <button
        className="block w-full py-4 text-white bg-blue-500"
        onClick={handleMore}
      >
        MORE
      </button>
    </div>
  );
};

export default App;
