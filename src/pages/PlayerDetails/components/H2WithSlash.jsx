import RedSlash from "../../../assets/red-slash.svg?react";

export const H2WithSlash = ({
  title,
  textColour = "text-slate-900",
  marginBottom = true,
  hasinput = false,
}) => (
  <div
    className={`flex items-center ${marginBottom && "mb-4 md:mb-6"} ${
      hasinput && "mb-4 md:mb-0"
    }`}
  >
    <span className="mr-3">
      <RedSlash />
    </span>
    <h2 className={`text-3xl lg:text-4xl font-heading uppercase ${textColour}`}>
      {title}
    </h2>
  </div>
);
