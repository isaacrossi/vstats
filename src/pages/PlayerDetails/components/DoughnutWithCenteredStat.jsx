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
}) => {
  const isZeroValue =
    centeredData === 0 ||
    centeredData === "0" ||
    parseFloat(centeredData) === 0;

  const colors = isZeroValue
    ? isDark
      ? ["#475569"]
      : ["#CBD5E1"]
    : [colourOne, colourTwo];

  return (
    <div className="w-48 h-48 mx-auto relative mb-6 md:mb-9 ">
      <Doughnut
        data={{
          datasets: [
            {
              data: isZeroValue ? [1] : doughnutData,
              backgroundColor: colors,
              cutout: "80%",
              borderWidth: 0,
            },
          ],
        }}
      />
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center ${
          isDark ? "text-slate-50" : "text-slate-900"
        }`}
      >
        <h4 className="text-xl lg:text-2xl font-heading text-center pt-5 mb-1">
          {centeredData}
        </h4>
        <p className="uppercase text-sm lg:text-base text-center pb-5">
          {(statText ?? "").includes(" ")
            ? statText.split(" ").map((word, index) => (
                <span key={index} className="block">
                  {word}
                </span>
              ))
            : statText}
        </p>
      </div>
    </div>
  );
};
