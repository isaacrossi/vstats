import { Doughnut } from "react-chartjs-2";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";

export const DoughnutWithStat = ({
  doughnutData,
  colourOne,
  colourTwo,
  centeredData,
  statText,
}) => (
  <div className="w-48 mx-auto relative mb-6 md:mb-9">
    <Doughnut
      data={{
        datasets: [
          {
            data: doughnutData,
            backgroundColor: [colourOne, colourTwo],
            cutout: "80%",
          },
        ],
      }}
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
      <h4 className="text-xl lg:text-2xl font-heading text-center pt-5 mb-1">
        {centeredData}
      </h4>
      <p className="uppercase text-sm lg:text-base text-center pb-5">
        {statText}
      </p>
    </div>
  </div>
);
