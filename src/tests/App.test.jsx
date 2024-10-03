import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { players } from "./dummyPlayers";
import axios from "axios";
import { describe, vi, it, expect } from "vitest";
import { App } from "../App";

vi.mock("axios");

vi.mock("axios");

describe("App", () => {
  it("succeeds fetching data", async () => {
    const promise = Promise.resolve({
      data: {
        response: players.response, // Use the response array containing playerOne and playerTwo
        paging: players.paging, // Use the paging information
      },
    });

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    // Ensure the "Loading" text is in the document at first
    expect(screen.queryByText(/Loading/)).toBeInTheDocument();

    // Wait for the "Loading" text to disappear
    await waitForElementToBeRemoved(() => screen.queryByText(/Loading/));

    // Ensure axios promise resolves
    await waitFor(async () => await promise);

    screen.debug();

    expect(screen.getByText("J. Bidois")).toBeInTheDocument();
    expect(screen.getByText("A. Smith")).toBeInTheDocument();
  });
});
