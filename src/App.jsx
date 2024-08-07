import Dropdown from "./components/Dropdown";
import useStorageState from "./hooks/useStorageState";
import { useEffect, useState } from "react";

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

const App = () => {
  const initialPlayers = [
    {
      id: 1,
      name: "Jack Clisby",
      team: "Western Sydney Wanderers",
      country: "Australia",
      role: "defender",
    },
    {
      id: 2,
      name: "Keanu Baccus",
      team: "Western Sydney Wanderers",
      country: "Australia",
      role: "midfielder",
    },
  ];

  const [searchTerm, setSearchTerm] = useStorageState("search", "");

  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const handleSelect = (id) => {
    setSelectedTeamId(id);
    console.log(`Selected team ID: ${id}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getAsyncPlayers = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { players: initialPlayers } });
      }, 2000);
    });

  useEffect(() => {
    setIsLoading(true);
    getAsyncPlayers()
      .then((result) => {
        setPlayers(result.data.players);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  const searchedPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {isError && <p className="text-slate-50">Something went wrong...</p>}
        {isLoading ? (
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
      <Item key={item.id} item={item} />
    ))}
  </ul>
);

const Item = ({ item }) => (
  <li className="grid grid-cols-4  text-slate-50">
    <span>{item.name}</span>
    <span>{item.team}</span>
    <span>{item.country}</span>
    <span>{item.role}</span>
  </li>
);

export default App;
