import RedSlash from "../../../assets/red-slash.svg?react";

export const H2WithSlash = () => (
  <div className="flex items-center">
    <span className="mr-3">
      <RedSlash />
    </span>
    <h2 className="text-3xl lg:text-4xl font-heading uppercase">General</h2>
  </div>
);
