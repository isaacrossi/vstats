import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getPlayerUrl } from "../../config/apiUrls";
import { apiOptions } from "../../config/apiOptions";
import { HeaderWithDetails } from "./components/HeaderWithDetails";
import { StatsPanel } from "./components/StatsPanel";

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

  const findALeagueAndPlayed = player?.statistics.find(
    (stat) => stat.league?.name === "A-League" && stat.games.appearences > 0
  );

  const findALeague = player?.statistics.find(
    (stat) => stat.league?.name === "A-League"
  );

  return (
    <>
      {loading ? (
        <p className="text-slate-50">Loading...</p>
      ) : (
        <>
          <div className="bg-blue-1000">
            <HeaderWithDetails
              statData={
                findALeagueAndPlayed ? findALeagueAndPlayed : findALeague
              }
              playerData={player}
            />
          </div>
          <div className="container mx-auto">
            <StatsPanel data={findALeagueAndPlayed} />
            <h2>General</h2>
          </div>
        </>
      )}
    </>
  );
};

export default PlayerDetails;
