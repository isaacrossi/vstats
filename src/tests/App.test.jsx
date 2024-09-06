import { describe, it, expect } from "vitest";

//describe block is our test suite
//Note: tests can be used without suites
describe("something truthy and falsy", () => {
  //it blocks are out test cases
  it("true to be true", () => {
    expect(true).toBeTruthy();
  });

  it("fasle to be false", () => {
    expect(false).toBeFalsy();
  });
});
