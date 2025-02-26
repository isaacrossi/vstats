import { H2WithSlash } from "../H2WithSlash";
import { StatWithDividers } from "../StatWithDividers";
import { DoughnutWithCenteredStat } from "../DoughnutWithCenteredStat";
import { LabelWithIconAndValue } from "../LabelWithIconAndValue";
import Blue500Slash from "../../../../assets/blue-500-slash.svg?react";
import Blue300Slash from "../../../../assets/blue-300-slash.svg?react";
import { calculatePercentage } from "../../../../utils/calculatePercentage";
import { formatValue } from "../../../../utils/formatValue";

export const AttackSection = ({ data }) => (
  <section className="bg-blue-1000 px-4 pt-10 md:pt-14 pb-14 md:pb-20">
    <div className="container mx-auto">
      <H2WithSlash title="Attack" textColour="text-slate-50" />
      <div className="flex flex-col md:flex-row">
        <StatWithDividers
          statTitle="Key Passes"
          isDark={true}
          hasSolidBorder={true}
        >
          {formatValue(data?.passes?.key)}
        </StatWithDividers>
        <StatWithDividers
          statTitle="Fouls Drawn"
          isDark={true}
          hasSolidBorder={false}
        >
          {formatValue(data?.fouls?.drawn)}
        </StatWithDividers>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-16 md:mb-0">
          <DoughnutWithCenteredStat
            doughnutData={[
              data?.shots?.on,
              data?.shots?.total - data?.shots?.on,
            ]}
            colourOne="#3b82f6"
            colourTwo="#93c5fd"
            centeredData={
              calculatePercentage(data?.shots?.on, data?.shots?.total) + "%"
            }
            statText="Shot Accuracy"
            isDark={true}
          />
          <div className="w-full md:w-2/3 mx-auto">
            <LabelWithIconAndValue
              Icon={Blue500Slash}
              label="on"
              value={formatValue(data?.shots?.on)}
              textColor="text-slate-50"
              isDark={true}
            />
            <LabelWithIconAndValue
              Icon={Blue300Slash}
              label="off"
              value={
                formatValue(data?.shots?.total) - formatValue(data?.shots?.on)
              }
              textColor="text-slate-50"
              isDark={true}
            />
            <LabelWithIconAndValue
              label="Total"
              value={formatValue(data?.shots?.total)}
              isWithoutSlash={true}
              border={false}
              textColor="text-slate-50"
              isDark={true}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <DoughnutWithCenteredStat
            doughnutData={[
              data?.dribbles?.success,
              data?.dribbles?.attempts - data?.dribbles?.success,
            ]}
            colourOne="#3b82f6"
            colourTwo="#93c5fd"
            centeredData={
              calculatePercentage(
                data?.dribbles?.success,
                data?.dribbles?.attempts
              ) + "%"
            }
            statText="Dribble Success"
            isDark={true}
          />
          <div className="w-full md:w-2/3 mx-auto h-fit">
            <LabelWithIconAndValue
              Icon={Blue500Slash}
              label="successful"
              value={formatValue(data?.dribbles?.success)}
              textColor="text-slate-50"
              isDark={true}
            />
            <LabelWithIconAndValue
              Icon={Blue300Slash}
              label="failed"
              value={
                formatValue(data?.dribbles?.attempts) -
                formatValue(data?.dribbles?.success)
              }
              textColor="text-slate-50"
              isDark={true}
            />
            <LabelWithIconAndValue
              label="Total"
              value={formatValue(data?.dribbles?.attempts)}
              isWithoutSlash={true}
              border={false}
              textColor="text-slate-50"
              isDark={true}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);
