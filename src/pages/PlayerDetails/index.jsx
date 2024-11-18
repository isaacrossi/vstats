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

      <div className="w-full lg:w-1/4 float-right text-sm text-slate-50 uppercase px-4 py-8 border-t-4 border-t-red-600 border-r border-l border-b border-slate-600">
        <h3 className="font-heading text-slate-50 text-xl uppercase mb-8">
          Quick stats
        </h3>
        <div className="flex justify-between border-b border-slate-600 pb-2 mb-4">
          <p>Appearances</p>
          <p>32</p>
        </div>

        <div className="flex justify-between border-b border-slate-600 pb-2 mb-4">
          <p>Minutes</p>
          <p>415</p>
        </div>

        <div className="flex justify-between border-b border-slate-600 pb-2 mb-4">
          <p>Goals</p>
          <p>4</p>
        </div>
        <div className="flex justify-between border-b border-slate-600 pb-2 mb-4">
          <p>Assists</p>
          <p>1</p>
        </div>
        <div className="flex justify-between">
          <p>Rating</p>
          <p>6.5</p>
        </div>
      </div>
    </main>
  );
};

export default PlayerDetails;
