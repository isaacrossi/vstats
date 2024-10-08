import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import { players, anotherPlayer } from "./dummyPlayers";
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

  it("fails fetching data", async () => {
    const promise = Promise.reject();

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    expect(screen.queryByText(/Loading/)).toBeInTheDocument();

    try {
      await waitFor(async () => await promise);
    } catch (error) {
      expect(screen.queryByText(/Loading/)).toBeNull();
      expect(screen.getByText(/went wrong/)).toBeInTheDocument();
    }
  });

  it("searches for players", async () => {
    const initialPromise = Promise.resolve({
      data: {
        response: players.response,
        paging: players.paging,
      },
    });

    const searchPromise = Promise.resolve({
      data: {
        response: [anotherPlayer],
        paging: players.paging,
      },
    });

    axios.get.mockImplementation((url) => {
      if (url.includes("colli")) {
        return searchPromise;
      } else {
        return initialPromise;
      }
    });

    render(<App />);

    // Wait for the initial data to be rendered
    await waitFor(() =>
      expect(screen.getByText("J. Bidois")).toBeInTheDocument()
    );
    expect(screen.getByText("A. Smith")).toBeInTheDocument();
    expect(screen.queryByText("G. Colli")).toBeNull();

    // Simulate user typing "colli" in the search input
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "colli" },
    });

    expect(screen.getByDisplayValue("colli")).toBeInTheDocument();

    fireEvent.submit(screen.getByRole("form"));

    // Wait for the search results to be rendered
    await waitFor(() =>
      expect(screen.getByText("G. Colli")).toBeInTheDocument()
    );

    // Verify that the initial players are no longer in the document
    expect(screen.queryByText("J. Bidois")).toBeNull();
    expect(screen.queryByText("A. Smith")).toBeNull();
  });
});
