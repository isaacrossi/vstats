import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Dropdown } from "../components/Dropdown";

describe("Dropdown", () => {
  const dropdownProps = {
    id: "dropdown",
    data: [
      { id: 1, name: "Team 1", img: "team1.png" },
      { id: 2, name: "Team 2", img: "team2.png" },
    ],
    title: "select",
    selectedItemId: 1,
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
    expect(screen.getByText("Team 1")).toBeInTheDocument();
  });

  it("calls onChange when an item is selected", () => {
    render(<Dropdown {...dropdownProps} />);
    // Open the dropdown
    fireEvent.click(screen.getByRole("button", { name: "Toggle dropdown" }));
    // Select an item
    fireEvent.click(screen.getByText("Team 2"));
    expect(dropdownProps.onChange).toHaveBeenCalledTimes(1);
  });
});
