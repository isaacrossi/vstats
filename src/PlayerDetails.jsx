import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getPlayerUrl } from "./config/apiUrls";
import { apiOptions } from "./config/apiOptions";
import { cmToFeetAndInches } from "./utils/cmToFeetAndInches";
import { countries } from "./data/countries";

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

  console.log(player);

  const { id } = useParams();

  useEffect(() => {
    fetchPlayer(id, setPlayer, setLoading);
  }, [id]);

  return (
    <main className="container mx-auto">
      <header className="pt-28 pb-14 bg-blue-diagonal bg-contain bg-no-repeat">
        {loading ? (
          <p className="text-slate-50">Loading...</p>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="flex flex-col w-full">
                <h2 className="font-heading text-4xl text-slate-50 uppercase mb-1">
                  {player.player.lastname}
                </h2>
                <h1 className="font-heading text-6xl text-outline uppercase mb-12">
                  {player.player.firstname}
                </h1>
                <div className="grid grid-cols-8">
                  <ul className="col-span-4">
                    <li className="mb-4">
                      <h3 className="text-s text-slate-500 uppercase mb-2">
                        Role
                      </h3>
                      <p className="text-base uppercase text-slate-50">
                        {player.statistics[0].games.position}
                      </p>
                    </li>
                    <li className="mb-4">
                      <h3 className="text-s text-slate-500 uppercase mb-2">
                        Country
                      </h3>
                      <div className="flex items-center">
                        <img
                          className="h-5 w-auto mr-2"
                          src={`https://flagsapi.com/${
                            countries[player.player.nationality]
                          }/flat/64.png`}
                          alt={`${player.player.nationality} flag`}
                        />
                        <p className="text-base uppercase text-slate-50">
                          {player.player.nationality}
                        </p>
                      </div>
                    </li>
                    <li className="mb-4">
                      <h3 className="text-s text-slate-500 uppercase mb-2">
                        Team
                      </h3>
                      <div className="flex items-center">
                        <img
                          className="w-6 h-6 mr-2"
                          src={player.statistics[0].team.logo}
                          alt={`${player.statistics[0].team.name} logo`}
                        />
                        <p className="text-base uppercase text-slate-50">
                          {player.statistics[0].team.name}
                        </p>
                      </div>
                    </li>
                  </ul>

                  <ul className="col-span-4">
                    <li className="mb-4">
                      <h3 className="text-s text-slate-500 uppercase mb-2">
                        Weight
                      </h3>
                      <p className="text-base uppercase text-slate-50">
                        {player.statistics[0].games.position}
                      </p>
                    </li>
                    <li className="mb-4">
                      <h3 className="text-s text-slate-500 uppercase mb-2">
                        Height
                      </h3>
                      <p className="text-base uppercase text-slate-50">
                        {cmToFeetAndInches(player.player.height)}
                      </p>
                    </li>
                    <li className="mb-4">
                      <h3 className="text-s text-slate-500 uppercase mb-2">
                        Birth
                      </h3>
                      <p className="text-base uppercase text-slate-50">
                        {player.player.birth.date} ({player.player.age} years
                        old)
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative w-1/3">
                <img
                  className="w-full rounded-full"
                  src={player.player.photo}
                  alt={`${player.player.firstname} ${player.player.lastname}`}
                />
                <img
                  className="absolute right-60 top-48 w-40 h-40"
                  src={player.statistics[0].team.logo}
                  alt={`${player.statistics[0].team.name} logo`}
                />
              </div>
            </div>
          </>
        )}
      </header>
    </main>
  );
};

export default PlayerDetails;
