import { H2WithSlash } from "../H2WithSlash";
import { StatWithDividers } from "../StatWithDividers";
import { DoughnutWithCenteredStat } from "../DoughnutWithCenteredStat";
import { LabelWithIconAndValue } from "../LabelWithIconAndValue";
import RoyalBlueSlash from "../../../../assets/royal-blue-slash.svg?react";
import NavyBlueSlash from "../../../../assets/navy-blue-slash.svg?react";
import { calculatePercentage } from "../../../../utils/calculatePercentage";
import Red600Slash from "../../../../assets/red-600-slash.svg?react";
import Yellow300Slash from "../../../../assets/yellow-300-slash.svg?react";
import { formatValue } from "../../../../utils/formatValue";

export const DefenceSection = ({ data }) => (
  <section className="container mx-auto px-4 pt-10 md:pt-14 pb-14 md:pb-20">
    <H2WithSlash title="Defence" />
    <div className="flex flex-col md:flex-row">
      <StatWithDividers statTitle="Tackles" hasSolidBorder={true}>
        {formatValue(data?.tackles?.total)}
      </StatWithDividers>
      <StatWithDividers statTitle="Blocks" hasSolidBorder={true}>
        {formatValue(data?.tackles?.blocks)}
      </StatWithDividers>
      <StatWithDividers statTitle="Interceptions" hasSolidBorder={true}>
        {formatValue(data?.tackles?.interceptions)}
      </StatWithDividers>
      <StatWithDividers statTitle="Fouls" hasSolidBorder={false}>
        {formatValue(data?.fouls?.committed)}
      </StatWithDividers>
    </div>
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 mb-16 md:mb-0">
        <DoughnutWithCenteredStat
          doughnutData={[
            data?.duels?.won,
            data?.duels?.total - data?.duels?.won,
          ]}
          colourOne="#1D4ED8"
          colourTwo="#1E3A8A"
          centeredData={
            calculatePercentage(data?.duels?.won, data?.duels?.total) + "%"
          }
          statText="Duel Success"
        />
        <div className="w-full md:w-2/3 mx-auto h-fit">
          <LabelWithIconAndValue
            Icon={RoyalBlueSlash}
            label="successful"
            value={formatValue(data?.duels?.won)}
            textColor="text-slate-900"
          />
          <LabelWithIconAndValue
            Icon={NavyBlueSlash}
            label="failed"
            value={
              formatValue(data?.duels?.total) - formatValue(data?.duels?.won)
            }
            textColor="text-slate-900"
          />
          <LabelWithIconAndValue
            label="Total"
            value={formatValue(data?.duels?.total)}
            isWithoutSlash={true}
            border={false}
            textColor="text-slate-900"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 mb-16 md:mb-0">
        <DoughnutWithCenteredStat
          doughnutData={[
            data?.cards?.yellow + data?.cards?.yellowred,
            data?.cards?.red + data?.cards?.yellowred,
          ]}
          colourOne="#fde047"
          colourTwo="#dc2626"
          centeredData={
            formatValue(data?.cards?.yellow) +
            formatValue(data?.cards?.red) +
            formatValue(data?.cards?.yellowred)
          }
          statText="cards"
        />
        <div className="w-full md:w-2/3 mx-auto h-fit">
          <LabelWithIconAndValue
            Icon={Yellow300Slash}
            label="yellow"
            value={formatValue(data?.cards?.yellow)}
            textColor="text-slate-900"
          />
          <LabelWithIconAndValue
            Icon={Red600Slash}
            label="red"
            value={formatValue(data?.cards?.red)}
            textColor="text-slate-900"
          />
        </div>
      </div>
    </div>
  </section>
);
