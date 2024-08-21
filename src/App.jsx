import Dropdown from "./components/Dropdown";
import useStorageState from "./hooks/useStorageState";
import { useEffect, useReducer, useState } from "react";
import { apiOptions } from "./config/apiOptions";
import { playersReducer } from "./reducers/playersReducer";
import { List } from "./components/List";
import { InputWithLabel } from "./components/InputWithLabel";
import { getPlayerUrl } from "./config/apiUrls";
import { teams } from "./data/teams";

const getPlayers = async (searchTerm, teamId) => {
  try {
    const response = await fetch(getPlayerUrl(searchTerm, teamId), apiOptions);
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

  // team id is set in the dropdown component, it gives us team.id to use in the API call
  const [teamId, setTeamId] = useState("");

  const [players, dispatchPlayers] = useReducer(playersReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChange = (item) => {
    setTeamId(item.id);
    searchTerm && setSearchTerm("");
  };

  useEffect(() => {
    dispatchPlayers({ type: "PLAYERS_FETCH_INIT" });
    getPlayers(searchTerm, teamId)
      .then((result) => {
        dispatchPlayers({
          type: "PLAYERS_FETCH_SUCCESS",
          payload: result.response,
        });
      })
      .catch(() => dispatchPlayers({ type: "PLAYERS_FETCH_FAILURE" }));
  }, [searchTerm, teamId]);

  console.log(teams);

  return (
    <div className="bg-blue-1000">
      <div className="container mx-auto">
        <header className="h-1/2 pt-28 pb-14 bg-blue-diagonal bg-cover bg-no-repeat">
          <h1 className="mb-12 font-heading text-4xl text-slate-50 uppercase">
            Players
          </h1>

          <div className="flex flex-col">
            <InputWithLabel
              id="search"
              label="Search"
              value={searchTerm}
              onInputChange={handleSearch}
            >
              Search
            </InputWithLabel>
            <Dropdown
              id="team-dropdown"
              data={teams}
              title="All Teams"
              hasImage={true}
              category="team"
              imgKey="logo"
              onChange={handleChange}
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

export default App;
