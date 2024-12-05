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
    <main className="container mx-auto px-5">
      {loading ? (
        <p className="text-slate-50">Loading...</p>
      ) : (
        <HeaderWithDetails data={player} />
      )}

      <hr className="border-slate-600 mb-12" />

      <div className="w-full md:w-1/3  float-right text-sm lg:text-base text-slate-50 uppercase px-4 py-8 border-t-4 border-t-red-600 border-r border-l border-b border-slate-600">
        <h3 className="font-heading text-slate-50 text-xl lg:text-2xl uppercase mb-8">
          Quick stats
        </h3>
        <div className="flex justify-between border-b border-slate-600 pb-2 mb-4">
          <p className="text-slate-400 font-medium">Appearences</p>
          <p className="font-bold">
            {player?.statistics[0]?.games?.appearences === null
              ? "0"
              : player?.statistics[0]?.games?.appearences}
          </p>
        </div>

        <div className="flex justify-between border-b border-slate-600 pb-2 mb-4">
          <p className="text-slate-400 font-medium">Minutes</p>
          <p className="font-bold">
            {player?.statistics[0]?.games?.minutes === null
              ? "0"
              : player?.statistics[0]?.games?.minutes}
          </p>
        </div>

        <div className="flex justify-between border-b border-slate-600 pb-2 mb-4">
          <p className="text-slate-400 font-medium">Goals</p>
          <p className="font-bold">
            {player?.statistics[0]?.goals?.total === null
              ? "0"
              : player?.statistics[0]?.goals?.total}
          </p>
        </div>
        <div className="flex justify-between border-b border-slate-600 pb-2 mb-4">
          <p className="text-slate-400 font-medium">Assists</p>
          <p className="font-bold">
            {player?.statistics[0]?.goals?.assists === null
              ? "0"
              : player?.statistics[0]?.goals?.assists}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-slate-400 font-medium">Rating</p>
          <p className="font-bold">
            {player?.statistics[0]?.games?.rating === null
              ? "0"
              : player?.statistics[0]?.games?.rating}
          </p>
        </div>
      </div>
    </main>
  );
};

export default PlayerDetails;
