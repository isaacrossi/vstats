import { getPlayerUrl } from "../config/apiUrls";
import axios from "axios";
import { apiOptions } from "../config/apiOptions";

export const fetchPlayer = async (id, setState, loadingState, season) => {
  try {
    const url = getPlayerUrl(id, season);
    loadingState(true);
    const result = await axios.get(url, apiOptions);
    const response = result.data.response[0];
    console.log(response);
    setState(response);
  } catch (error) {
    console.error("API fetch error:", error);
  } finally {
    loadingState(false);
  }
};
