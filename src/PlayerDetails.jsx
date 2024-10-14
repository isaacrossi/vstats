import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { getPlayerUrl } from "./config/apiUrls";
import { apiOptions } from "./config/apiOptions";

const fetchPlayer = async (id) => {
  try {
    const url = getPlayerUrl(id);
    const result = await axios.get(url, apiOptions);
    console.log("API response:", result.data);
    return result.data.response;
  } catch (error) {
    console.error("API fetch error:", error);
    return null;
  }
};

const PlayerDetails = () => {
  const { id } = useParams();

  useEffect(() => {
    fetchPlayer(id);
  }, [id]);

  return <h1>{id}</h1>;
};

export default PlayerDetails;
