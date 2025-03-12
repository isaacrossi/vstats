import { getPlayerUrl } from "../config/apiUrls";
import { apiOptions } from "../config/apiOptions";

export const fetchPlayer = async (id, season) => {
  const url = getPlayerUrl(id, season);

  const result = await fetch(url, apiOptions);

  if (!result.ok) {
    throw new Error("player fetch not ok");
  }

  const data = await result.json();

  console.log("data", data);

  return data.response[0];
};
