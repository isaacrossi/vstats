import Dropdown from "./components/Dropdown";
import useStorageState from "./hooks/useStorageState";
import { useCallback, useEffect, useReducer, useState } from "react";
import { apiOptions } from "./config/apiOptions";
import { playersReducer } from "./reducers/playersReducer";
import { List } from "./components/List";
import { InputWithLabel } from "./components/InputWithLabel";
import { getPlayerUrl } from "./config/apiUrls";
import { teams } from "./data/teams";

const getPlayers = async (searchTerm, selectedTeamId) => {
  try {
    const response = await fetch(
      getPlayerUrl(searchTerm, selectedTeamId),
      apiOptions
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return { response: [] };
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useStorageState(
    "submitted search",
    ""
  );

  // team id is set in the dropdown component, it gives us team.id to use in the API call
  const [selectedTeamId, setSelectedTeamId] = useState("0");

  const [players, dispatchPlayers] = useReducer(playersReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.length < 4) {
      return;
    }
    setSubmittedSearchTerm(searchTerm);
  };

  const handleDropdownChange = (item) => {
    setSelectedTeamId(item.id);
    searchTerm && setSearchTerm("");
  };

  const handleFetchPlayers = useCallback(() => {
    dispatchPlayers({ type: "PLAYERS_FETCH_INIT" });
    getPlayers(submittedSearchTerm, selectedTeamId)
      .then((result) => {
        dispatchPlayers({
          type: "PLAYERS_FETCH_SUCCESS",
          payload: result.response,
        });
      })
      .catch(() => dispatchPlayers({ type: "PLAYERS_FETCH_FAILURE" }));
  }, [submittedSearchTerm, selectedTeamId]);

  useEffect(() => {
    handleFetchPlayers();
  }, [handleFetchPlayers]);

  console.log(teams);

  return (
    <div className="bg-blue-1000">
      <div className="container mx-auto">
        <header className="h-1/2 pt-28 pb-14 bg-blue-diagonal bg-cover bg-no-repeat">
          <h1 className="mb-12 font-heading text-4xl text-slate-50 uppercase">
            Players
          </h1>

          <div className="flex flex-col">
            <div className="relative max-w-80 h-auto">
              <InputWithLabel
                id="search"
                label="Search"
                value={searchTerm}
                onInputChange={handleInputChange}
                onSubmit={handleInputSubmit}
              >
                Search
              </InputWithLabel>
              <IconButton
                onInputSubmit={handleInputSubmit}
                searchTerm={searchTerm}
              />
            </div>
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
          <List list={players.data} />
        )}
      </div>
    </div>
  );
};

const IconButton = ({ onInputSubmit, searchTerm }) => (
  <button
    type="button"
    disabled={searchTerm.length < 4}
    onClick={onInputSubmit}
    className="absolute right-0 bottom-8 bg-search-icon bg-no-repeat bg-right bg-auto w-5 h-5"
  />
);

export default App;
