import { apiOptions } from "../config/apiOptions";
// import axios from "axios";
import { getPlayersUrl } from "../config/apiUrls";

export const fetchPlayers = async (page, searchTerm, teamId) => {
  const url = getPlayersUrl(searchTerm, teamId, page);
  const result = await fetch(url, apiOptions);

  if (!result.ok) {
    throw new Error(`players fetch not ok`);
  }

  const data = await result.json(); // Make sure to parse the JSON response

  return {
    list: data.response, // Make sure this matches your API response
    page: data.paging.current,
    totalPage: data.paging.total,
  };
};
