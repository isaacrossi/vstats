import Goals from "../../../assets/goals.svg?react";
import Apps from "../../../assets/appearances.svg?react";
import Minutes from "../../../assets/minutes.svg?react";
import Assists from "../../../assets/assists.svg?react";
import Rating from "../../../assets/rating.svg?react";

const StatsPanel = ({ data }) => (
  <div className="w-full md:w-1/4 float-right text-sm lg:text-base text-slate-50 uppercase px-4 pt-8 pb-4 border-t-4 border-t-red-600 border-r border-l border-b border-slate-600">
    <h3 className="font-heading text-slate-50 text-xl lg:text-2xl uppercase mb-8">
      Quick Stats
    </h3>
    <ul>
      <LabelWithIconAndValue
        label="Appearances"
        Icon={Apps}
        value={data?.games?.appearences || "0"}
      />

      <LabelWithIconAndValue
        label="Minutes"
        Icon={Minutes}
        value={data?.games?.minutes || "0"}
      />

      <LabelWithIconAndValue
        label="Goals"
        Icon={Goals}
        value={data?.goals?.total || "0"}
      />

      <LabelWithIconAndValue
        label="Assists"
        Icon={Assists}
        value={data?.goals?.assists || "0"}
      />

      <LabelWithIconAndValue
        label="Rating"
        Icon={Rating}
        value={data?.games?.rating || "0"}
        border={false}
      />
    </ul>
  </div>
);

const LabelWithIconAndValue = ({
  label,
  Icon,
  value,
  bold = false,
  textColor = "text-slate-400",
  iconColor = "text-slate-400",
  border = true,
}) => (
  <li
    className={`flex justify-between pb-2 mb-4 ${
      border ? "border-b border-slate-600" : ""
    }`}
  >
    <div className="flex items-center">
      {Icon ? <Icon className={`w-6 h-6 mr-2 ${iconColor}`} /> : null}
      <p className={`${textColor} ${bold ? "font-bold" : "font-medium"}`}>
        {label}
      </p>
    </div>
    {value && <p className="font-bold">{value}</p>}
  </li>
);

export { StatsPanel };
