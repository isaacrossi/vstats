export const playersReducer = (state, action) => {
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
        page: "1",
      };
    default:
      throw new Error();
  }
};
