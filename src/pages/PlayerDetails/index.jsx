import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getPlayerUrl } from "../../config/apiUrls";
import { apiOptions } from "../../config/apiOptions";
import { HeaderWithDetails } from "./components/HeaderWithDetails";
import { StatsPanel } from "./components/StatsPanel";
import { Dropdown } from "../Players/components/Dropdown";
import { seasons } from "../../data/seasons";
import { H2WithSlash } from "./components/H2WithSlash";
import { StatWithDividers } from "./components/StatWithDividers";
import { Doughnut } from "react-chartjs-2";

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

  // find object that contains A-League stats and has played at least one game
  const findALeagueAndPlayed = player?.statistics.find(
    (stat) => stat.league?.name === "A-League" && stat.games.appearences > 0
  );

  // find object that contains A-League stats
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
                <H2WithSlash />
                <Dropdown
                  data={seasons}
                  title="2024"
                  id="league-dropdown"
                  hasImage={false}
                />
              </div>
              <StatWithDividers statTitle="Total Passes">
                {findALeague.passes.total}
              </StatWithDividers>
              <div className="w-full md:w-2/3 md:pr-[7px]">
                <div className="w-48 mx-auto relative mb-6 md:mb-9">
                  <Doughnut
                    data={{
                      datasets: [
                        {
                          data: [
                            findALeague.games.lineups,
                            findALeague.substitutes.in,
                          ],
                          backgroundColor: ["#1D4ED8", "#1E3A8A"],
                          cutout: "80%",
                        },
                      ],
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <h4 className="text-xl lg:text-2xl font-heading text-center pt-5 mb-1">
                      {findALeague.games.appearences}
                    </h4>
                    <p className="uppercase text-sm text-center pb-5">
                      appearences
                    </p>
                  </div>
                </div>
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
