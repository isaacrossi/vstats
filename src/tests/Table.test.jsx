import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TableRow } from "../components/Table";
import { players } from "./dummyPlayers";
import { shortenTeamName } from "../utils/shortenTeamName";

describe("TableRow", () => {
  it("renders player name", () => {
    render(<TableRow item={players[0]} />);
    expect(screen.getByText("J. Bidois")).toBeInTheDocument();
  });

  it("renders team logo and name", () => {
    render(<TableRow item={players[0]} />);
    const teamLogo = screen.getByAltText("Auckland logo");
    expect(teamLogo).toBeInTheDocument();
    expect(teamLogo).toHaveAttribute(
      "src",
      "https://media.api-sports.io/football/teams/24608.png"
    );
    expect(screen.getByText(shortenTeamName("Auckland"))).toBeInTheDocument();
  });

  it("renders country flag and nationality", () => {
    render(<TableRow item={players[0]} />);
    const flagImage = screen.getByAltText("country flag");
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute(
      "src",
      "https://flagsapi.com/NZ/flat/64.png"
    );
    expect(screen.getByText("New Zealand")).toBeInTheDocument();
  });

  it("renders player position", () => {
    render(<TableRow item={players[0]} />);
    expect(screen.getByText("Attacker")).toBeInTheDocument();
  });
});
