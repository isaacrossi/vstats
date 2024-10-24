import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getPlayerUrl } from "../../config/apiUrls";
import { apiOptions } from "../../config/apiOptions";
import { HeaderWithDetails } from "./components/HeaderWithDetails";

const fetchPlayer = async (id, setState, loadingState) => {
  try {
    const url = getPlayerUrl(id);
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

const PlayerDetails = () => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    fetchPlayer(id, setPlayer, setLoading);
  }, [id]);

  return (
    <main className="container mx-auto">
      {loading ? (
        <p className="text-slate-50">Loading...</p>
      ) : (
        <HeaderWithDetails data={player} />
      )}
    </main>
  );
};

export default PlayerDetails;
