import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HeaderWithDetails } from "./components/HeaderWithDetails";
import { findALeagueAndPlayed, findALeague } from "../../utils/findUtils";
import { useMemo } from "react";
import { fetchPlayer } from "../../utils/fetchPlayer";
import { GeneralSection } from "./components/sections/GeneralSection";
import { AttackSection } from "./components/sections/AttackSection";
import { DefenceSection } from "./components/sections/DefenceSection";
import { getPlayerSeasonsUrl } from "../../config/apiUrls";
import axios from "axios";
import { apiOptions } from "../../config/apiOptions";

const fetchPlayerSeasons = async (id, setState, loadingState) => {
  try {
    const url = getPlayerSeasonsUrl(id);
    loadingState(true);
    const result = await axios.get(url, apiOptions);
    const response = result.data.response;
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
  const [playerSeasons, setPlayerSeasons] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetchPlayer(id, setPlayer, setLoading);
  }, [id]);

  useEffect(() => {
    fetchPlayerSeasons(id, setPlayerSeasons, setLoading);
  }, [id]);

  console.log("playerSeasons", playerSeasons);

  const leagueAndPlayedData = useMemo(
    () => findALeagueAndPlayed(player),
    [player]
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
                leagueAndPlayedData ? leagueAndPlayedData : findALeague(player)
              }
              playerData={player}
            />
          </div>

          <GeneralSection data={leagueAndPlayedData} />
          <AttackSection data={leagueAndPlayedData} />
          <DefenceSection data={leagueAndPlayedData} />
        </>
      )}
    </>
  );
};

export default PlayerDetails;
