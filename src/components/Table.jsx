import { shortenTeamName } from "../utils/shortenTeamName";
import { countries } from "../data/countries";

const headers = ["Player", "Team", "Country", "Role"];

const Table = ({ list }) => (
  <table className="mt-14 mx-auto">
    {list.length !== 0 && (
      <thead>
        <tr className="text-left grid grid-cols-4 gap-x-32 p-5 text-s uppercase text-slate-500 border-b border-red-600">
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
    )}
    <tbody>
      {list.map((item) => (
        <tr
          key={item.player.id}
          className="grid grid-cols-4 gap-x-32 p-5 text-s uppercase text-slate-50 border-b border-red-600"
        >
          <td className="w-56">{item.player.name}</td>
          <td className="flex w-56">
            <img
              className="w-6 h-6 mr-2"
              src={item.statistics[0].team.logo}
              alt={item.statistics[0].team.name + "logo"}
            />
            {shortenTeamName(item.statistics[0].team.name)}
          </td>
          <td className="flex w-56">
            <img
              className="h-5 w-auto mr-2"
              src={`https://flagsapi.com/${
                countries[item.player.nationality]
              }/flat/64.png`}
              alt="country flag"
            />
            {item.player.nationality}
          </td>
          <td className="w-56">{item.statistics[0].games.position}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export { Table };
