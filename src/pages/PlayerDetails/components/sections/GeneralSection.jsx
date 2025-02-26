import { H2WithSlash } from "../H2WithSlash";
import { Dropdown } from "../../../Players/components/Dropdown";
import { seasons } from "../../../../data/seasons";
import { StatWithDividers } from "../StatWithDividers";
import { DoughnutWithCenteredStat } from "../DoughnutWithCenteredStat";
import { LabelWithIconAndValue } from "../LabelWithIconAndValue";
import RoyalBlueSlash from "../../../../assets/royal-blue-slash.svg?react";
import NavyBlueSlash from "../../../../assets/navy-blue-slash.svg?react";
import { StatsPanel } from "../StatsPanel";
import { formatValue } from "../../../../utils/formatValue";

export const GeneralSection = ({ data }) => (
  <section className="container mx-auto relative px-4 pt-10 md:pt-14 pb-14 md:pb-20 flex flex-col-reverse md:flex-col">
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-4 md:mb-6">
        <H2WithSlash title="General" marginBottom={false} hasinput={true} />
        <Dropdown
          data={seasons}
          title="2024"
          id="league-dropdown"
          hasImage={false}
        />
      </div>
      <StatWithDividers
        statTitle="Total Passes"
        hasSidebar={true}
        isSingle={true}
      >
        {formatValue(data?.passes?.total)}
      </StatWithDividers>
      <div className="w-full md:w-2/3 md:pr-[7px]">
        <DoughnutWithCenteredStat
          doughnutData={[data?.games?.lineups, data?.substitutes?.in]}
          colourOne="#1D4ED8"
          colourTwo="#1E3A8A"
          centeredData={formatValue(data?.games?.appearences)}
          statText="Appearences"
        />
        <div className="w-full md:w-2/3 mx-auto">
          <LabelWithIconAndValue
            Icon={RoyalBlueSlash}
            label="started"
            value={formatValue(data?.games?.lineups)}
          />
          <LabelWithIconAndValue
            Icon={NavyBlueSlash}
            label="subbed"
            value={formatValue(data?.substitutes?.in)}
          />
          <LabelWithIconAndValue
            label="Minutes"
            value={formatValue(data?.games?.minutes)}
            isWithoutSlash={true}
            border={false}
          />
        </div>
      </div>
    </div>

    <StatsPanel data={data} />
  </section>
);
