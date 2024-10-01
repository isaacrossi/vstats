import { useReducer } from "react";
import { fetchPlayers } from "../utils/fetchPlayers";

const playersReducer = (state, action) => {
  switch (action.type) {
    case `PLAYERS_FETCH_INIT`:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case `PLAYERS_FETCH_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data:
          action.payload.page === 1
            ? action.payload.list
            : state.data.concat(action.payload.list),
        page: action.payload.page,
        totalPage: action.payload.totalPage,
      };
    case `PLAYERS_FETCH_FAILURE`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "PLAYERS_RESET":
      return {
        ...state,
        data: [],
        page: 1,
        totalPage: null,
      };
    default:
      throw new Error();
  }
};

export const usePlayers = (
  selectedTeamId,
  submittedSearchTerm,
  setHasReachedBottom
) => {
  const [players, dispatchPlayers] = useReducer(playersReducer, {
    data: [],
    page: 1,
    totalPage: null,
    isLoading: false,
    isError: false,
  });

  const fetchMorePlayers = () => {
    if (!players.isLoading && players.page < players.totalPage) {
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

  return [players, dispatchPlayers, fetchMorePlayers];
};
