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
    <>
      {loading ? (
        <p className="text-slate-50">Loading...</p>
      ) : (
        <>
          <div className="bg-blue-1000">
            <HeaderWithDetails
              statData={
                findALeagueAndPlayed(player)
                  ? findALeagueAndPlayed(player)
                  : findALeague(player)
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
                {findALeagueAndPlayed(player)?.passes?.total}
              </StatWithDividers>
              <div className="w-full md:w-2/3 md:pr-[7px]">
                <DoughnutWithStat
                  doughnutData={[
                    findALeagueAndPlayed(player)?.games?.lineups,
                    findALeagueAndPlayed(player)?.substitutes?.in,
                  ]}
                  colourOne="#1D4ED8"
                  colourTwo="#1E3A8A"
                  centeredData={
                    findALeagueAndPlayed(player)?.games?.appearences
                  }
                  statText="Appearences"
                />
                <div className="w-full md:w-2/3 mx-auto">
                  <LabelWithIconAndValue
                    Icon={RoyalBlueSlash}
                    label="started"
                    value={findALeagueAndPlayed(player)?.games?.lineups}
                  />
                  <LabelWithIconAndValue
                    Icon={NavyBlueSlash}
                    label="subbed"
                    value={findALeagueAndPlayed(player)?.substitutes?.in}
                  />
                  <LabelWithIconAndValue
                    label="Minutes"
                    value={findALeagueAndPlayed(player)?.games?.minutes}
                    isWithoutSlash={true}
                  />
                </div>
              </div>
            </div>

            <StatsPanel data={findALeagueAndPlayed(player)} />
          </section>
          <section className="bg-blue-1000 px-4 pt-10 md:pt-14 pb-14 md:pb-20">
            <div className="container mx-auto">
              <H2WithSlash title="Attack" textColour="text-slate-50" />
              <StatWithDividers statTitle="Key Passes" isDark={true}>
                {findALeagueAndPlayed(player)?.passes?.key}
              </StatWithDividers>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default PlayerDetails;
