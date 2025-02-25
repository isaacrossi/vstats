import { Doughnut } from "react-chartjs-2";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";

export const DoughnutWithCenteredStat = ({
  doughnutData,
  colourOne,
  colourTwo,
  centeredData,
  statText,
  isDark = false,
}) => (
  <div className="w-48 mx-auto relative mb-6 md:mb-9 ">
    <Doughnut
      data={{
        datasets: [
          {
            data: doughnutData,
            backgroundColor: [colourOne, colourTwo],
            cutout: "80%",
            borderWidth: 0,
          },
        ],
      }}
    />
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center text-center mt-6 ${
        isDark ? "text-slate-50" : "text-slate-900"
      }`}
    >
      <h4 className="text-xl lg:text-2xl font-heading text-center pt-5 mb-1">
        {centeredData}
      </h4>
      <p className="uppercase text-sm lg:text-base text-center pb-5">
        <p className="uppercase text-sm lg:text-base text-center pb-5">
          {(statText ?? "").includes(" ")
            ? statText.split(" ").map((word, index) => (
                <span key={index} className="block">
                  {word}
                </span>
              ))
            : statText}
        </p>
      </p>
    </div>
  </div>
);
