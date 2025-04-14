import { getPlayerSeasonsUrl } from "../config/apiUrls";
import { apiOptions } from "../config/apiOptions";

export const fetchPlayerSeasons = async (id) => {
  const url = getPlayerSeasonsUrl(id);

  const result = await fetch(url, apiOptions);

  if (!result.ok) {
    throw new Error("player seasons fetch not ok");
  }

  const data = await result.json();

  console.log("data", data);

  return data.response;
};
