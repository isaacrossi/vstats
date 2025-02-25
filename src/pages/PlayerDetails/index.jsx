import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HeaderWithDetails } from "./components/HeaderWithDetails";
import { StatsPanel } from "./components/StatsPanel";
import { Dropdown } from "../Players/components/Dropdown";
import { seasons } from "../../data/seasons";
import { H2WithSlash } from "./components/H2WithSlash";
import { StatWithDividers } from "./components/StatWithDividers";
import { LabelWithIconAndValue } from "./components/LabelWithIconAndValue";
import RoyalBlueSlash from "../../assets/royal-blue-slash.svg?react";
import NavyBlueSlash from "../../assets/navy-blue-slash.svg?react";
import { DoughnutWithCenteredStat } from "./components/DoughnutWithCenteredStat";
import { findALeagueAndPlayed, findALeague } from "../../utils/findUtils";
import { calculatePercentage } from "../../utils/calculatePercentage";
import Blue500Slash from "../../assets/blue-500-slash.svg?react";
import Blue300Slash from "../../assets/blue-300-slash.svg?react";
import { useMemo } from "react";
import Red600Slash from "../../assets/red-600-slash.svg?react";
import Yellow300Slash from "../../assets/yellow-300-slash.svg?react";
import { fetchPlayer } from "../../utils/fetchPlayer";

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
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-4 md:mb-6">
                <H2WithSlash
                  title="General"
                  marginBottom={false}
                  hasinput={true}
                />
                <Dropdown
                  data={seasons}
                  title="2024"
                  id="league-dropdown"
                  hasImage={false}
                />
              </div>
              <StatWithDividers
                statTitle="Total Passes"
                hasSidebar={true}
                isSingle={true}
              >
                {leagueAndPlayedData?.passes?.total}
              </StatWithDividers>
              <div className="w-full md:w-2/3 md:pr-[7px]">
                <DoughnutWithCenteredStat
                  doughnutData={[
                    leagueAndPlayedData?.games?.lineups,
                    leagueAndPlayedData?.substitutes?.in,
                  ]}
                  colourOne="#1D4ED8"
                  colourTwo="#1E3A8A"
                  centeredData={leagueAndPlayedData?.games?.appearences}
                  statText="Appearences"
                />
                <div className="w-full md:w-2/3 mx-auto">
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
                <div className="w-full md:w-1/2 mb-16 md:mb-0">
                  <DoughnutWithCenteredStat
                    doughnutData={[
                      leagueAndPlayedData?.shots?.on,
                      leagueAndPlayedData?.shots?.total -
                        leagueAndPlayedData?.shots?.on,
                    ]}
                    colourOne="#3b82f6"
                    colourTwo="#93c5fd"
                    centeredData={
                      calculatePercentage(
                        leagueAndPlayedData?.shots?.on,
                        leagueAndPlayedData?.shots?.total
                      ) + "%"
                    }
                    statText="Shot Accuracy"
                    isDark={true}
                  />
                  <div className="w-full md:w-2/3 mx-auto">
                    <LabelWithIconAndValue
                      Icon={Blue500Slash}
                      label="on"
                      value={leagueAndPlayedData?.shots?.on}
                      textColor="text-slate-50"
                      isDark={true}
                    />
                    <LabelWithIconAndValue
                      Icon={Blue300Slash}
                      label="off"
                      value={
                        leagueAndPlayedData?.shots?.total -
                        leagueAndPlayedData?.shots?.on
                      }
                      textColor="text-slate-50"
                      isDark={true}
                    />
                    <LabelWithIconAndValue
                      label="Total"
                      value={leagueAndPlayedData?.shots?.total}
                      isWithoutSlash={true}
                      border={false}
                      textColor="text-slate-50"
                      isDark={true}
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <DoughnutWithCenteredStat
                    doughnutData={[
                      leagueAndPlayedData?.dribbles?.success,
                      leagueAndPlayedData?.dribbles?.attempts -
                        leagueAndPlayedData?.dribbles?.success,
                    ]}
                    colourOne="#3b82f6"
                    colourTwo="#93c5fd"
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
                      Icon={Blue500Slash}
                      label="successful"
                      value={leagueAndPlayedData?.dribbles?.success}
                      textColor="text-slate-50"
                      isDark={true}
                    />
                    <LabelWithIconAndValue
                      Icon={Blue300Slash}
                      label="failed"
                      value={
                        leagueAndPlayedData?.dribbles?.attempts -
                        leagueAndPlayedData?.dribbles?.success
                      }
                      textColor="text-slate-50"
                      isDark={true}
                    />
                    <LabelWithIconAndValue
                      label="Total"
                      value={leagueAndPlayedData?.dribbles?.attempts}
                      isWithoutSlash={true}
                      border={false}
                      textColor="text-slate-50"
                      isDark={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="container mx-auto px-4 pt-10 md:pt-14 pb-14 md:pb-20">
            <H2WithSlash title="Defence" />
            <div className="flex flex-col md:flex-row">
              <StatWithDividers statTitle="Tackles" hasSolidBorder={true}>
                {leagueAndPlayedData?.tackles?.total}
              </StatWithDividers>
              <StatWithDividers statTitle="Blocks" hasSolidBorder={true}>
                {leagueAndPlayedData?.tackles?.blocks}
              </StatWithDividers>
              <StatWithDividers statTitle="Interceptions" hasSolidBorder={true}>
                {leagueAndPlayedData?.tackles?.interceptions}
              </StatWithDividers>
              <StatWithDividers statTitle="Fouls" hasSolidBorder={false}>
                {leagueAndPlayedData?.fouls?.committed}
              </StatWithDividers>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2">
                <DoughnutWithCenteredStat
                  doughnutData={[
                    leagueAndPlayedData?.duels?.won,
                    leagueAndPlayedData?.duels?.total -
                      leagueAndPlayedData?.duels?.won,
                  ]}
                  colourOne="#1D4ED8"
                  colourTwo="#1E3A8A"
                  centeredData={
                    calculatePercentage(
                      leagueAndPlayedData?.duels?.won,
                      leagueAndPlayedData?.duels?.total
                    ) + "%"
                  }
                  statText="Duel Success"
                />
                <div className="w-full md:w-2/3 mx-auto h-fit">
                  <LabelWithIconAndValue
                    Icon={RoyalBlueSlash}
                    label="successful"
                    value={leagueAndPlayedData?.duels?.won}
                    textColor="text-slate-900"
                  />
                  <LabelWithIconAndValue
                    Icon={NavyBlueSlash}
                    label="failed"
                    value={
                      leagueAndPlayedData?.duels?.total -
                      leagueAndPlayedData?.duels?.won
                    }
                    textColor="text-slate-900"
                  />
                  <LabelWithIconAndValue
                    label="Total"
                    value={leagueAndPlayedData?.duels?.total}
                    isWithoutSlash={true}
                    border={false}
                    textColor="text-slate-900"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 mb-16 md:mb-0">
                <DoughnutWithCenteredStat
                  doughnutData={[
                    leagueAndPlayedData?.cards?.yellow +
                      leagueAndPlayedData?.cards?.yellowred,
                    leagueAndPlayedData?.cards?.red +
                      leagueAndPlayedData?.cards?.yellowred,
                  ]}
                  colourOne="#fde047"
                  colourTwo="#dc2626"
                  centeredData={
                    leagueAndPlayedData?.cards?.yellow +
                    leagueAndPlayedData?.cards?.red +
                    leagueAndPlayedData?.cards?.yellowred
                  }
                  statText="cards"
                />
                <div className="w-full md:w-2/3 mx-auto h-fit">
                  <LabelWithIconAndValue
                    Icon={Yellow300Slash}
                    label="yellow"
                    value={leagueAndPlayedData?.cards?.yellow}
                    textColor="text-slate-900"
                  />
                  <LabelWithIconAndValue
                    Icon={Red600Slash}
                    label="red"
                    value={leagueAndPlayedData?.cards?.red}
                    textColor="text-slate-900"
                  />
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
