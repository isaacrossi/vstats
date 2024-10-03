import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Table, TableRow, TableBody } from "../components/Table";
import { players } from "./dummyPlayers";
import { shortenTeamName } from "../utils/shortenTeamName";
import { headers } from "../data/headers";

describe("Table", () => {
  it("renders TableHeader and TableBody components when list is not empty", () => {
    render(<Table list={players.response} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(
      screen.getByRole("table").querySelector("thead")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("table").querySelector("tbody")
    ).toBeInTheDocument();
    screen.debug();
  });

  it("does not render TableHeader when list is empty", () => {
    render(<Table list={[]} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(
      screen.getByRole("table").querySelector("thead")
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("table").querySelector("tbody")
    ).toBeInTheDocument();
  });
});

describe("TableRow", () => {
  it("renders header cells with headers data when isHeader is true", () => {
    render(<TableRow item={headers} isHeader={true} />);
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
      expect(screen.getByText(header).closest("th")).toBeInTheDocument();
    });
  });

  it("renders no header cells when isHeader is false", () => {
    render(<TableRow item={players.response[0]} isHeader={false} />);
    expect(screen.queryAllByRole("th")).toHaveLength(0);
  });

  it("renders player name in body row", () => {
    render(<TableRow item={players.response[0]} />);
    expect(screen.getByText("J. Bidois")).toBeInTheDocument();
  });

  it("renders team logo and name in body row", () => {
    render(<TableRow item={players.response[0]} />);
    const teamLogo = screen.getByAltText("Auckland logo");
    expect(teamLogo).toBeInTheDocument();
    expect(teamLogo).toHaveAttribute(
      "src",
      "https://media.api-sports.io/football/teams/24608.png"
    );
    expect(screen.getByText(shortenTeamName("Auckland"))).toBeInTheDocument();
  });

  it("renders country flag and nationality in body row", () => {
    render(<TableRow item={players.response[0]} />);
    const flagImage = screen.getByAltText("country flag");
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute(
      "src",
      "https://flagsapi.com/NZ/flat/64.png"
    );
    expect(screen.getByText("New Zealand")).toBeInTheDocument();
  });

  it("renders player position in body row", () => {
    render(<TableRow item={players.response[0]} />);
    expect(screen.getByText("Attacker")).toBeInTheDocument();
  });
});

describe("TableBody", () => {
  it("renders the correct number of TableRow components", () => {
    render(<TableBody list={players.response} />);
    expect(screen.getAllByRole("row")).toHaveLength(players.response.length);
  });

  it("renders no TableRow components when list is empty", () => {
    render(<TableBody list={[]} />);
    expect(screen.queryAllByRole("row")).toHaveLength(0);
  });
});
