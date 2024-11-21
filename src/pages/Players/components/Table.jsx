import { shortenTeamName } from "../../../utils/shortenTeamName";
import { countries } from "../../../data/countries";
import { headers } from "../../../data/headers";
import { Link } from "react-router-dom";

const Table = ({ list }) => (
  <table className="w-full mt-14 mx-auto text-sm lg:text-base">
    {list.length !== 0 && <TableHeader />}
    <TableBody list={list} />
  </table>
);

const TableRow = ({ item, isHeader = false }) => (
  <tr className="grid grid-cols-7 gap-x-16 justify-between p-5 text-s text-left uppercase text-slate-50 border-b border-red-600">
    {isHeader ? (
      item.map((header, index) => (
        <th
          key={index}
          className="text-slate-500 [&:nth-child(-n+3)]:col-span-2"
        >
          {header}
        </th>
      ))
    ) : (
      <>
        <TableCell>
          <Link to={`/details/${item.player.id}`}>{item.player.lastname}</Link>
        </TableCell>
        <TableCell className="flex">
          <img
            className="w-6 h-6 mr-2"
            src={item.statistics[0].team.logo}
            alt={`${item.statistics[0].team.name} logo`}
          />
          <p className="hidden md:inline">
            {shortenTeamName(item.statistics[0].team.name)}
          </p>
        </TableCell>
        <TableCell className="flex ">
          <img
            className="h-5 w-auto mr-2"
            src={`https://flagsapi.com/${
              countries[item.player.nationality]
            }/flat/64.png`}
            alt="country flag"
          />
          <p className="hidden md:inline">{item.player.nationality}</p>
        </TableCell>
        <TableCell className="justify-self-end">
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

const TableCell = ({ children }) => (
  <td className="flex [&:nth-child(-n+3)]:col-span-2 ">{children}</td>
);

export { Table, TableHeader, TableBody, TableRow };
