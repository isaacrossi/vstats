import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Dropdown } from "../components/Dropdown";

describe("Dropdown", () => {
  const dropdownProps = {
    id: "dropdown",
    data: [
      {
        id: 0,
        name: "All Teams",
        logo: "",
      },
      {
        id: 948,
        name: "Adelaide United",
        logo: "https://media.api-sports.io/football/teams/948.png",
      },
      {
        id: 24608,
        name: "Aukland FC",
        logo: "https://media.api-sports.io/football/teams/24608.png",
      },
    ],
    title: "select",
    selectedItemId: 0,
    hasImage: true,
    imgKey: "img",
    onChange: vi.fn(),
  };

  it("renders a dropdown button", () => {
    render(<Dropdown {...dropdownProps} />);
    expect(
      screen.getByRole("button", { name: "Toggle dropdown" })
    ).toBeInTheDocument();
  });

  it("displays the selected item name in the button", () => {
    render(<Dropdown {...dropdownProps} />);
    expect(screen.getByText("All Teams")).toBeInTheDocument();
  });

  it("calls onChange when an item is selected", () => {
    render(<Dropdown {...dropdownProps} />);
    // Open the dropdown
    fireEvent.click(screen.getByRole("button", { name: "Toggle dropdown" }));
    // Select an item
    fireEvent.click(screen.getByText("Adelaide United"));
    expect(dropdownProps.onChange).toHaveBeenCalledTimes(1);
  });

  it("initially renders with the dropdown closed", () => {
    render(<Dropdown {...dropdownProps} />);
    expect(screen.queryByText("All Teams")).toBeInTheDocument();
  });

  it("opens and closes the dropdown when the button is clicked", () => {
    const { rerender } = render(<Dropdown {...dropdownProps} />);
    // Initially, the dropdown should be closed and only the selected item should be visible
    expect(screen.getByText("All Teams")).toBeInTheDocument();
    expect(screen.queryByText("Adelaide United")).not.toBeInTheDocument();
    expect(screen.queryByText("Aukland FC")).not.toBeInTheDocument();

    // Open the dropdown
    fireEvent.click(screen.getByRole("button", { name: "Toggle dropdown" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(
      dropdownProps.data.length
    );

    // Select an item and close the dropdown
    fireEvent.click(screen.getByText("Adelaide United"));
    expect(dropdownProps.onChange).toHaveBeenCalledWith({
      id: 948,
      name: "Adelaide United",
      logo: "https://media.api-sports.io/football/teams/948.png",
    });

    // Update the selectedItemId prop to reflect the new selection
    rerender(<Dropdown {...dropdownProps} selectedItemId={948} />);

    // Verify the selected item is displayed
    expect(screen.getByText("Adelaide United")).toBeInTheDocument();
    expect(screen.queryByText("All Teams")).not.toBeInTheDocument();
    expect(screen.queryByText("Aukland FC")).not.toBeInTheDocument();

    // Open the dropdown again and select "All Teams"
    fireEvent.click(screen.getByRole("button", { name: "Toggle dropdown" }));
    fireEvent.click(screen.getByText("All Teams"));
    expect(dropdownProps.onChange).toHaveBeenCalledWith({
      id: 0,
      name: "All Teams",
      logo: "",
    });

    // Update the selectedItemId prop to reflect the new selection
    rerender(<Dropdown {...dropdownProps} selectedItemId={0} />);

    // Verify the selected item is displayed
    expect(screen.getByText("All Teams")).toBeInTheDocument();
    expect(screen.queryByText("Adelaide United")).not.toBeInTheDocument();
    expect(screen.queryByText("Aukland FC")).not.toBeInTheDocument();
  });

  it("closes the dropdown when clicking outside", () => {
    render(<Dropdown {...dropdownProps} />);
    const toggleButton = screen.getByRole("button", {
      name: "Toggle dropdown",
    });

    // Open the dropdown
    fireEvent.click(toggleButton);
    expect(screen.getAllByRole("listitem")).toHaveLength(
      dropdownProps.data.length
    );

    // Click outside the dropdown
    fireEvent.mouseDown(document);
    expect(screen.queryByText("Adelaide United")).not.toBeInTheDocument();
    expect(screen.queryByText("Aukland FC")).not.toBeInTheDocument();
  });
});
