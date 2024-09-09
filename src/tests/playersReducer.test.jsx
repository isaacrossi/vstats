import { describe, it, expect } from "vitest";
import { playersReducer } from "../reducers/playersReducer";
import { players } from "./dummyPlayers";

describe("playersReducer", () => {
  it("initializes a fetch request from the API", () => {
    const action = { type: "PLAYERS_FETCH_INIT" };
    const state = {
      data: [],
      page: 1,
      isLoading: false,
      isError: false,
    };

    const newState = playersReducer(state, action);

    const expectedState = {
      data: [],
      page: 1,
      isLoading: true,
      isError: false,
    };

    expect(newState).toEqual(expectedState);
  });

  it("successfully fetches players from the API", () => {
    const action = {
      type: "PLAYERS_FETCH_SUCCESS",
      payload: {
        list: players,
        page: 1,
      },
    };
    const state = {
      data: [],
      page: 1,
      isLoading: true,
      isError: false,
    };

    const newState = playersReducer(state, action);

    const expectedState = {
      data: players,
      page: 1,
      isLoading: false,
      isError: false,
    };

    expect(newState).toEqual(expectedState);
  });

  it("fails to fetch players from the API", () => {
    const action = { type: "PLAYERS_FETCH_FAILURE" };
    const state = {
      data: [],
      page: 1,
      isLoading: true,
      isError: false,
    };

    const newState = playersReducer(state, action);

    const expectedState = {
      data: [],
      page: 1,
      isLoading: false,
      isError: true,
    };

    expect(newState).toEqual(expectedState);
  });

  it("resets the players state", () => {
    const action = { type: "PLAYERS_RESET" };
    const state = {
      data: players,
      page: 1,
      isLoading: false,
      isError: false,
    };

    const newState = playersReducer(state, action);

    const expectedState = {
      data: [],
      page: 1,
      isLoading: false,
      isError: false,
    };

    expect(newState).toEqual(expectedState);
  });
});
