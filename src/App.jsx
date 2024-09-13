import { Dropdown } from "./components/Dropdown";
import { useCallback, useEffect, useReducer, useState } from "react";
import { apiOptions } from "./config/apiOptions";
import { playersReducer } from "./reducers/playersReducer";
import { Table } from "./components/Table";
import { SearchForm } from "./components/SearchForm";
import { getPlayerUrl } from "./config/apiUrls";
import { teams } from "./data/teams";
import axios from "axios";

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
      },
    });
  } catch (error) {
    console.error("API fetch error:", error); // Log any errors
    dispatch({ type: "PLAYERS_FETCH_FAILURE" });
  }
};

const App = () => {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState(0);

  const [players, dispatchPlayers] = useReducer(playersReducer, {
    data: [],
    page: 1,
    isLoading: false,
    isError: false,
  });

  const atBottom = () => {
    const reachedBottom =
      viewportHeight + scrollY >= document.body.offsetHeight;
    if (reachedBottom && !players.isLoading) {
      handleMore();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      atBottom();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [viewportHeight, scrollY]);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatchPlayers({ type: "PLAYERS_RESET" });
    setSubmittedSearchTerm(searchTerm);
    fetchPlayers(1, searchTerm, selectedTeamId, dispatchPlayers); // Fetch players for the new search term
  };

  const handleMore = () => {
    fetchPlayers(
      players.page + 1,
      submittedSearchTerm,
      selectedTeamId,
      dispatchPlayers
    );
  };

  const handleSearchCancel = () => {
    setSearchTerm("");
    setSubmittedSearchTerm("");
    setSelectedTeamId(0);
    dispatchPlayers({ type: "PLAYERS_RESET" });
    fetchPlayers(1, "", 0, dispatchPlayers); // Fetch initial players
  };

  const handleDropdownChange = (item) => {
    if (item.id !== selectedTeamId) {
      dispatchPlayers({ type: "PLAYERS_RESET" });
      setSelectedTeamId(item.id);
      fetchPlayers(1, submittedSearchTerm, item.id, dispatchPlayers); // Fetch players for the selected team
      searchTerm && setSearchTerm("");
    }
  };

  useEffect(() => {
    fetchPlayers(1, searchTerm, selectedTeamId, dispatchPlayers);
  }, []);

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
                onSearchInput={handleSearchInput}
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
