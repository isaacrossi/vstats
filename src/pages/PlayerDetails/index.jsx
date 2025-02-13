import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getPlayerUrl } from "../../config/apiUrls";
import { apiOptions } from "../../config/apiOptions";
import { HeaderWithDetails } from "./components/HeaderWithDetails";
import { StatsPanel } from "./components/StatsPanel";
import RedSlash from "../../assets/red-slash.svg?react";
import { Dropdown } from "../Players/components/Dropdown";
import { seasons } from "../../data/seasons";

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
          <div className="container mx-auto relative px-4 pt-10 md:pt-14 pb-14 md:pb-20 flex flex-col-reverse md:flex-col">
            <div>
              <div className="flex items-center justify-between w-full mb-4 md:mb-6">
                <div className="flex items-center">
                  <RedSlash className="mr-3" />
                  <h2 className="text-3xl lg:text-4xl font-heading uppercase">
                    General
                  </h2>
                </div>
                <Dropdown
                  data={seasons}
                  title="2024"
                  id="league-dropdown"
                  hasImage={false}
                />
              </div>
              <div className="w-full md:w-2/3 relative md:mr-12">
                <span className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-slate-300 to-blue-50" />
                <h4 className="text-xl lg:text-2xl font-heading text-center pt-5 mb-1">
                  344
                </h4>
                <p className="uppercase text-sm text-center pb-5">
                  Total passes
                </p>
                <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-slate-300 to-blue-50" />
              </div>
            </div>

            <StatsPanel data={findALeagueAndPlayed} />
          </div>
        </>
      )}
    </>
  );
};

export default PlayerDetails;
