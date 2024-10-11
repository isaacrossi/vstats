import { shortenTeamName } from "../utils/shortenTeamName";
import { countries } from "../data/countries";
import { headers } from "../data/headers";
import { Link } from "react-router-dom";

const Table = ({ list }) => (
  <table className="mt-14 mx-auto">
    {list.length !== 0 && <TableHeader />}
    <TableBody list={list} />
  </table>
);

const TableRow = ({ item, isHeader = false }) => (
  <tr className="grid grid-cols-4 gap-x-32 p-5 text-s text-left uppercase text-slate-50 border-b border-red-600">
    {isHeader ? (
      item.map((header, index) => (
        <th key={index} className="text-slate-500">
          {header}
        </th>
      ))
    ) : (
      <>
        <TableCell>
          <Link to={`/details/${item.player.id}`}>{item.player.name}</Link>
        </TableCell>
        <TableCell className="flex w-56">
          <img
            className="w-6 h-6 mr-2"
            src={item.statistics[0].team.logo}
            alt={`${item.statistics[0].team.name} logo`}
          />
          {shortenTeamName(item.statistics[0].team.name)}
        </TableCell>
        <TableCell className="flex w-56">
          <img
            className="h-5 w-auto mr-2"
            src={`https://flagsapi.com/${
              countries[item.player.nationality]
            }/flat/64.png`}
            alt="country flag"
          />
          {item.player.nationality}
        </TableCell>
        <TableCell className="w-56">
          {item.statistics[0].games.position}
        </TableCell>
      </>
    )}
  </tr>
);

const TableHeader = () => (
  <thead>
    <TableRow item={headers} isHeader />
  </thead>
);

const TableBody = ({ list }) => (
  <tbody>
    {list.map((item) => (
      <TableRow key={item.player.id} item={item} />
    ))}
  </tbody>
);

const TableCell = ({ children }) => <td className="flex w-56">{children}</td>;

export { Table, TableHeader, TableBody, TableRow };
