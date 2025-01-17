import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getPlayerUrl } from "../../config/apiUrls";
import { apiOptions } from "../../config/apiOptions";
import { HeaderWithDetails } from "./components/HeaderWithDetails";
import Goals from "../../assets/goals.svg?react";
import Apps from "../../assets/appearances.svg?react";
import Assists from "../../assets/assists.svg?react";
import Minutes from "../../assets/minutes.svg?react";
import Rating from "../../assets/rating.svg?react";

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

  const aLeague = player?.statistics.find(
    (stat) => stat.league?.name === "A-League"
  );

  return (
    <main className="container mx-auto px-5">
      {loading ? (
        <p className="text-slate-50">Loading...</p>
      ) : (
        <HeaderWithDetails statData={aLeague} playerData={player} />
      )}

      <hr className="border-slate-600 mb-12" />

      <div className="w-full md:w-1/3 float-right text-sm lg:text-base text-slate-50 uppercase px-4 py-8 border-t-4 border-t-red-600 border-r border-l border-b border-slate-600">
        <h3 className="font-heading text-slate-50 text-xl lg:text-2xl uppercase mb-8">
          Quick Stats
        </h3>
        <ul>
          <li className="flex justify-between border-b border-slate-600 pb-2 mb-4">
            <div className="flex items-center">
              <Apps className="w-6 h-6 mr-2" />
              <p className="text-slate-400 font-medium">Appearances</p>
            </div>
            <p className="font-bold">{aLeague?.games?.appearences || "0"}</p>
          </li>

          <li className="flex justify-between border-b border-slate-600 pb-2 mb-4">
            <div className="flex items-center">
              <Minutes className="w-6 h-6 mr-2" />
              <p className="text-slate-400 font-medium">Minutes</p>
            </div>
            <p className="font-bold">{aLeague?.games?.minutes || "0"}</p>
          </li>

          <li className="flex justify-between border-b border-slate-600 pb-2 mb-4">
            <div className="flex items-center">
              <Goals className="w-6 h-6 mr-2" />
              <p className="text-slate-400 font-medium">Goals</p>
            </div>
            <p className="font-bold">{aLeague?.goals?.total || "0"}</p>
          </li>

          <li className="flex justify-between border-b border-slate-600 pb-2 mb-4">
            <div className="flex items-center">
              <Assists className="w-6 h-6 mr-2" />
              <p className="text-slate-400 font-medium">Assists</p>
            </div>
            <p className="font-bold">{aLeague?.goals?.assists || "0"}</p>
          </li>

          <li className="flex justify-between">
            <div className="flex items-center">
              <Rating className="w-6 h-6 mr-2" />
              <p className="text-slate-400 font-medium">Rating</p>
            </div>
            <p className="font-bold">{aLeague?.games?.rating || "0"}</p>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default PlayerDetails;
