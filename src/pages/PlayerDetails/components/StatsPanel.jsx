import Goals from "../../../assets/goals.svg?react";
import Apps from "../../../assets/appearances.svg?react";
import Assists from "../../../assets/assists.svg?react";
import Rating from "../../../assets/rating.svg?react";
import { formatNumber } from "../../../utils/formatNumber";
import { LabelWithIconAndValue } from "./LabelWithIconAndValue";

const StatsPanel = ({ data }) => (
  <div className="w-full md:w-1/3 md:absolute md:top-[122px] md:right-4 relative text-sm lg:text-base text-slate-50 uppercase px-4 pt-8 pb-4 border-r border-l border-b border-slate-300  bg-blue-50 mb-24">
    <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-600 to-rose-800"></span>
    <h3 className="font-heading text-slate-900 text-xl lg:text-2xl uppercase mb-8">
      Quick Stats
    </h3>
    <ul>
      <LabelWithIconAndValue
        label="Appearances"
        Icon={Apps}
        value={data?.games?.appearences || "0"}
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
        value={formatNumber(data?.games?.rating) || "0"}
        border={false}
      />
    </ul>
  </div>
);

export { StatsPanel };
