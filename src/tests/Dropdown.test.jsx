import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Dropdown } from "../components/Dropdown";

describe("Dropdown", () => {
  const dropdownProps = {
    id: "dropdown",
    data: [
      { id: 0, name: "All", img: "all.png" },
      { id: 1, name: "Team 1", img: "team1.png" },
      { id: 2, name: "Team 2", img: "team2.png" },
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
    screen.debug();
  });

  it("displays the selected item name in the button", () => {
    render(<Dropdown {...dropdownProps} />);
    expect(screen.getByText("All")).toBeInTheDocument();
  });

  it("calls onChange when an item is selected", () => {
    render(<Dropdown {...dropdownProps} />);
    // Open the dropdown
    fireEvent.click(screen.getByRole("button", { name: "Toggle dropdown" }));
    // Select an item
    fireEvent.click(screen.getByText("Team 1"));
    expect(dropdownProps.onChange).toHaveBeenCalledTimes(1);
  });

  it("initially renders with the dropdown closed", () => {
    render(<Dropdown {...dropdownProps} />);
    expect(screen.queryByText("All")).toBeInTheDocument();
  });

  it("opens and closes the dropdown when the button is clicked", () => {
    render(<Dropdown {...dropdownProps} />);
    const toggleButton = screen.getByRole("button", {
      name: "Toggle dropdown",
    });

    // Initially, the dropdown should be closed and only the selected item should be visible
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.queryByText("Team 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Team 2")).not.toBeInTheDocument();

    // Open the dropdown
    fireEvent.click(toggleButton);
    expect(screen.getAllByRole("listitem")).toHaveLength(
      dropdownProps.data.length
    );

    // Close the dropdown
    fireEvent.click(toggleButton);
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.queryByText("Team 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Team 2")).not.toBeInTheDocument();
  });
});
