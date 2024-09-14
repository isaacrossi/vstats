import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SearchForm } from "../components/SearchForm";

describe("SearchForm", () => {
  const searchFormProps = {
    searchTerm: "test",
    submittedSearchTerm: "",
    onSearchInput: vi.fn(),
    onSearchSubmit: vi.fn(),
  };

  it("renders the input field with its value", () => {
    render(<SearchForm {...searchFormProps} />);
    expect(screen.getByDisplayValue("test")).toBeInTheDocument();
    screen.debug();
  });

  it("renders the correct label for the input field", () => {
    render(<SearchForm {...searchFormProps} />);
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
  });

  it("renders a clickable search button", () => {
    render(<SearchForm {...searchFormProps} />);
    expect(
      screen.getByRole("button", { name: "Submit search" })
    ).toBeInTheDocument();
  });

  it("does not render a cancel button when no search term has been submitted", () => {
    render(<SearchForm {...searchFormProps} />);
    expect(
      screen.queryByRole("button", { name: "Cancel search" })
    ).not.toBeInTheDocument();
  });
});
