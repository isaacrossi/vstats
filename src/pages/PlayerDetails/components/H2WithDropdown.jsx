import { H2WithSlash } from "./H2WithSlash";
import { Dropdown } from "../../../shared/components/Dropdown";

export const H2WithDropdown = ({
  dropdownData,
  handleDropdownChange,
  selectedItemId,
}) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-4 md:mb-6">
    <H2WithSlash title="General" marginBottom={false} hasinput={true} />
    <Dropdown
      data={dropdownData}
      title="2024"
      id="league-dropdown"
      hasImage={false}
      onChange={handleDropdownChange}
      selectedItemId={selectedItemId}
    />
  </div>
);
