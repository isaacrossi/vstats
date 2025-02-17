import { Slash } from "../../../shared/components/Slash";

export const H2WithSlash = () => (
  <div className="flex items-center">
    <span className="mr-3">
      <Slash />
    </span>
    <h2 className="text-3xl lg:text-4xl font-heading uppercase">General</h2>
  </div>
);
