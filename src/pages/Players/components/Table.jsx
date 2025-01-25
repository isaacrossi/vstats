import { shortenToTwo, shortenToOne } from "../../../utils/shortenTeamName";
import { trimString } from "../../../utils/trimString";
import { countries } from "../../../data/countries";
import { headers } from "../../../data/headers";
import { Link } from "react-router-dom";

const Table = ({ list }) => (
  <table className="w-full min-w-[380px] mt-14 text-sm lg:text-base">
    {list.length !== 0 && <TableHeader />}
    <TableBody list={list} />
  </table>
);

const TableRow = ({ item, isHeader = false }) => (
  <tr
    className={`grid grid-cols-5 md:grid-cols-7 justify-between p-2 md:p-5 text-left uppercase text-slate-900 gap-x-4 ${
      isHeader ? "bg-slate-100 font-bold" : "even:bg-slate-50"
    }`}
  >
    {isHeader ? (
      item.map((header, index) => (
        <th
          key={index}
          className="text-slate-900 font-bold md:[&:nth-child(-n+3)]:col-span-2 first:col-span-2 md:first:col-span-3 [&:nth-child(2)]:col-span-1 md:[&:nth-child(2)]:col-span-2 last:text-right last:md:text-left"
        >
          {header}
        </th>
      ))
    ) : (
      <>
        <td className="col-span-2">
          <Link to={`/details/${item.player.id}`}>{item.player.lastname}</Link>
        </td>

        <td className="flex md:col-span-2">
          <img
            className="w-6 h-6 mr-2"
            src={item.statistics[0].team.logo}
            alt={`${item.statistics[0].team.name} logo`}
          />
          <div className="hidden md:inline">
            <p className="hidden lg:inline">
              {shortenToTwo(item.statistics[0].team.name)}
            </p>
            <p className="lg:hidden">
              {shortenToOne(item.statistics[0].team.name)}
            </p>
          </div>
        </td>

        <td className="flex md:col-span-2">
          <img
            className="h-5 w-auto mr-2"
            src={`https://flagsapi.com/${
              countries[item.player.nationality]
            }/flat/64.png`}
            alt="country flag"
          />
          <p className="hidden md:inline">{item.player.nationality}</p>
        </td>

        <td className="text-right md:text-left">
          <span className="hidden md:inline">
            {item.statistics[0].games.position}
          </span>
          <span className="md:hidden">
            {trimString(item.statistics[0].games.position)}
          </span>
        </td>
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

export { Table, TableHeader, TableBody, TableRow };
