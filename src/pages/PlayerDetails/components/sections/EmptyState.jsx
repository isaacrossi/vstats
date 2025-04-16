import { Section } from "../../../../shared/components/Section";
import { H2WithDropdown } from "../H2WithDropdown";

export const EmptyState = ({
  dropdownData,
  handleDropdownChange,
  selectedItemId,
  name,
}) => {
  const nextYear = (parseInt(selectedItemId) + 1).toString().slice(-2);
  return (
    <Section>
      <H2WithDropdown
        dropdownData={dropdownData}
        handleDropdownChange={handleDropdownChange}
        selectedItemId={selectedItemId}
      />
      <p>
        {name} has not featured in the {selectedItemId}/{nextYear} A-League
        season
      </p>
    </Section>
  );
};
