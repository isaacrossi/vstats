import Dropdown from "./components/Dropdown";
import useStorageState from "./hooks/useStorageState";
import { useEffect, useReducer, useState } from "react";
import { countries } from "./data/countries";

const teams = [
  {
    id: 1,
    name: "Wanderers",
    imageUrl: "src/assets/wanderers.svg",
  },
  {
    id: 2,
    name: "Victory",
    imageUrl: "src/assets/wanderers.svg",
  },
];

const playersReducer = (state, action) => {
  switch (action.type) {
    case "PLAYERS_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "PLAYERS_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "PLAYERS_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const getPlayers = async () => {
  const url =
    "https://api-football-v1.p.rapidapi.com/v3/players?league=188&season=2024";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_API_KEY,
      "x-rapidapi-host": import.meta.env.VITE_API_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log("from getPlayers func", result);
    return result;
  } catch (error) {
    console.error(error.message);
    return { response: [] };
  }
};

function shortenTeamName(teamName) {
  const words = teamName.split(" ");
  return words.length > 2 ? words.slice(0, 2).join(" ") : teamName;
}

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "");

  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const handleSelect = (id) => {
    setSelectedTeamId(id);
    console.log(`Selected team ID: ${id}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const [players, dispatchPlayers] = useReducer(playersReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    dispatchPlayers({ type: "PLAYERS_FETCH_INIT" });
    getPlayers()
      .then((result) => {
        console.log("Data before dispatch", result.response);
        dispatchPlayers({
          type: "PLAYERS_FETCH_SUCCESS",
          payload: result.response,
        });
      })
      .catch(() => dispatchPlayers({ type: "PLAYERS_FETCH_FAILURE" }));
  }, []);

  const searchedPlayers = players.data.filter((player) =>
    player.player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("players.data", players.data);

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
              title="All teams"
              data={teams}
              hasImage={true}
              selectedId={selectedTeamId}
              onSelect={handleSelect}
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
          <List list={searchedPlayers} />
        )}
      </div>
    </div>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}) => (
  <form className="mb-6">
    <label htmlFor={id} className="sr-only">
      {children}
    </label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      autoFocus={isFocused}
      onChange={onInputChange}
      placeholder="Search for a player"
      className="w-64 py-2 bg-transparent border-b border-red-600 bg-search-icon bg-no-repeat bg-right bg-auto text-slate-50"
    />
  </form>
);

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.player.id} item={item} />
    ))}
  </ul>
);

const Item = ({ item }) => (
  <li className="grid grid-cols-4 text-s uppercase text-slate-50 px-5 py-4 border-b border-red-600">
    <span>{item.player.name}</span>
    <span className="flex">
      <img
        className="w-6 h-6 mr-2"
        src={item.statistics[0].team.logo}
        alt={item.statistics[0].team.name + "logo"}
      />
      {shortenTeamName(item.statistics[0].team.name)}
    </span>
    <span className="flex">
      <img
        className="h-5 w-auto mr-2"
        src={`https://flagsapi.com/${
          countries[item.player.nationality]
        }/flat/64.png`}
        alt="country flag"
      />
      {item.player.nationality}
    </span>
    <span>{item.statistics[0].games.position}</span>
  </li>
);

export default App;
