import { apiOptions } from "../config/apiOptions";
import axios from "axios";
import { getPlayersUrl } from "../config/apiUrls";

export const fetchPlayers = async (page, searchTerm, teamId, dispatch) => {
  dispatch({ type: "PLAYERS_FETCH_INIT" });

  try {
    const url = getPlayersUrl(searchTerm, teamId, page);
    console.log("Fetching players with URL:", url); // Log the URL
    const result = await axios.get(url, apiOptions);
    console.log("API response:", result.data); // Log the API response
    dispatch({
      type: "PLAYERS_FETCH_SUCCESS",
      payload: {
        list: result.data.response,
        page: result.data.paging.current,
        totalPage: result.data.paging.total,
      },
    });
  } catch (error) {
    console.error("API fetch error:", error); // Log any errors
    dispatch({ type: "PLAYERS_FETCH_FAILURE" });
  }
};
