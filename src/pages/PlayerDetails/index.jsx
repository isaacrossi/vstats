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
import { LabelWithIconAndValue } from "./components/LabelWithIconAndValue";
import RoyalBlueSlash from "../../assets/royal-blue-slash.svg?react";
import NavyBlueSlash from "../../assets/navy-blue-slash.svg?react";
import { DoughnutWithStat } from "./components/DoughnutWithStat";
import { findALeagueAndPlayed, findALeague } from "../../utils/findUtils";
import { calculatePercentage } from "../../utils/calculatePercentage";
import { useMemo } from "react";

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

          <section className="container mx-auto relative px-4 pt-10 md:pt-14 pb-14 md:pb-20 flex flex-col-reverse md:flex-col">
            <div>
              <div className="flex items-center justify-between w-full mb-4 md:mb-6">
                <H2WithSlash title="General" marginBottom={false} />
                <Dropdown
                  data={seasons}
                  title="2024"
                  id="league-dropdown"
                  hasImage={false}
                />
              </div>
              <StatWithDividers statTitle="Total Passes" hasSidebar={true}>
                {leagueAndPlayedData?.passes?.total}
              </StatWithDividers>
              <div className="w-full md:w-2/3 md:pr-[7px] h-fit">
                <DoughnutWithStat
                  doughnutData={[
                    leagueAndPlayedData?.games?.lineups,
                    leagueAndPlayedData?.substitutes?.in,
                  ]}
                  colourOne="#1D4ED8"
                  colourTwo="#1E3A8A"
                  centeredData={leagueAndPlayedData?.games?.appearences}
                  statText="Appearences"
                />
                <div className="w-full md:w-2/3 mx-auto h-fit">
                  <LabelWithIconAndValue
                    Icon={RoyalBlueSlash}
                    label="started"
                    value={leagueAndPlayedData?.games?.lineups}
                  />
                  <LabelWithIconAndValue
                    Icon={NavyBlueSlash}
                    label="subbed"
                    value={leagueAndPlayedData?.substitutes?.in}
                  />
                  <LabelWithIconAndValue
                    label="Minutes"
                    value={leagueAndPlayedData?.games?.minutes}
                    isWithoutSlash={true}
                    border={false}
                  />
                </div>
              </div>
            </div>

            <StatsPanel data={leagueAndPlayedData} />
          </section>

          <section className="bg-blue-1000 px-4 pt-10 md:pt-14 pb-14 md:pb-20">
            <div className="container mx-auto">
              <H2WithSlash title="Attack" textColour="text-slate-50" />
              <div className="flex flex-col md:flex-row">
                <StatWithDividers
                  statTitle="Key Passes"
                  isDark={true}
                  hasSolidBorder={true}
                >
                  {leagueAndPlayedData?.passes?.key}
                </StatWithDividers>
                <StatWithDividers
                  statTitle="Fouls Drawn"
                  isDark={true}
                  hasSolidBorder={false}
                >
                  {leagueAndPlayedData?.fouls?.drawn}
                </StatWithDividers>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 ">
                  <DoughnutWithStat
                    doughnutData={[
                      leagueAndPlayedData?.shots?.on,
                      leagueAndPlayedData?.shots?.total -
                        leagueAndPlayedData?.shots?.on,
                    ]}
                    colourOne="#1D4ED8"
                    colourTwo="#1E3A8A"
                    centeredData={
                      calculatePercentage(
                        leagueAndPlayedData?.shots?.on,
                        leagueAndPlayedData?.shots?.total
                      ) + "%"
                    }
                    statText="Shot Accuracy"
                    isDark={true}
                  />
                  <div className="w-full md:w-2/3 mx-auto h-fit">
                    <LabelWithIconAndValue
                      Icon={RoyalBlueSlash}
                      label="on"
                      value={leagueAndPlayedData?.games?.lineups}
                      textColor="text-slate-50"
                    />
                    <LabelWithIconAndValue
                      Icon={NavyBlueSlash}
                      label="off"
                      value={leagueAndPlayedData?.substitutes?.in}
                      textColor="text-slate-50"
                    />
                    <LabelWithIconAndValue
                      label="Total"
                      value={leagueAndPlayedData?.games?.minutes}
                      isWithoutSlash={true}
                      border={false}
                      textColor="text-slate-50"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <DoughnutWithStat
                    doughnutData={[
                      leagueAndPlayedData?.dribbles?.success,
                      leagueAndPlayedData?.dribbles?.attempts -
                        leagueAndPlayedData?.dribbles?.success,
                      leagueAndPlayedData?.shots?.total -
                        leagueAndPlayedData?.shots?.on,
                    ]}
                    colourOne="#1D4ED8"
                    colourTwo="#1E3A8A"
                    centeredData={
                      calculatePercentage(
                        leagueAndPlayedData?.dribbles?.success,
                        leagueAndPlayedData?.dribbles?.attempts
                      ) + "%"
                    }
                    statText="Dribble Success"
                    isDark={true}
                  />
                  <div className="w-full md:w-2/3 mx-auto h-fit">
                    <LabelWithIconAndValue
                      Icon={RoyalBlueSlash}
                      label="successful"
                      value={leagueAndPlayedData?.games?.lineups}
                      textColor="text-slate-50"
                    />
                    <LabelWithIconAndValue
                      Icon={NavyBlueSlash}
                      label="failed"
                      value={leagueAndPlayedData?.substitutes?.in}
                      textColor="text-slate-50"
                    />
                    <LabelWithIconAndValue
                      label="Total"
                      value={leagueAndPlayedData?.games?.minutes}
                      isWithoutSlash={true}
                      border={false}
                      textColor="text-slate-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default PlayerDetails;
