import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HeaderWithDetails } from "./components/HeaderWithDetails";
import { findALeagueAndPlayed, findALeague } from "../../utils/findUtils";
import { useMemo } from "react";
import { fetchPlayer } from "../../utils/fetchPlayer";
import { GeneralSection } from "./components/sections/GeneralSection";
import { AttackSection } from "./components/sections/AttackSection";
import { DefenceSection } from "./components/sections/DefenceSection";

const PlayerDetails = () => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeasonId, setSelectedSeasonId] = useState(2024);

  const { id } = useParams();

  useEffect(() => {
    fetchPlayer(id, setPlayer, setLoading, selectedSeasonId);
  }, [id]);

  const handleDropdownChange = (item) => {
    setSelectedSeasonId(item.id);
    fetchPlayer(id, setPlayer, setLoading, item.id);
    console.log(item.id);
  };

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

          <GeneralSection
            data={leagueAndPlayedData}
            handleDropdownChange={handleDropdownChange}
            selectedItemId={selectedSeasonId}
          />
          <AttackSection data={leagueAndPlayedData} />
          <DefenceSection data={leagueAndPlayedData} />
        </>
      )}
    </>
  );
};

export default PlayerDetails;
