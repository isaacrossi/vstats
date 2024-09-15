import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SearchForm, InputWithLabel } from "../components/SearchForm";

describe("SearchForm", () => {
  const searchFormProps = {
    searchTerm: "test",
    submittedSearchTerm: "",
    onSearchInput: vi.fn(),
    onSearchSubmit: vi.fn(),
    onSearchCancel: vi.fn(),
  };

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

  it("calls onSearchInput when the input field value changes", () => {
    render(<SearchForm {...searchFormProps} />);
    fireEvent.change(screen.getByDisplayValue("test"), {
      target: { value: "new value" },
    });

    expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
  });

  it("calls onSearchSubmit when the SearchButton is clicked", () => {
    render(<SearchForm {...searchFormProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Submit search" }));
    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
  });

  it("calls onSearchCancel when the CancelButton is clicked", () => {
    render(<SearchForm {...searchFormProps} submittedSearchTerm="thomas" />);
    fireEvent.click(screen.getByRole("button", { name: "Cancel search" }));
    expect(searchFormProps.onSearchCancel).toHaveBeenCalledTimes(1);
  });

  it("disables the search button when the search term length is between 1 and 3 characters", () => {
    render(<SearchForm {...searchFormProps} searchTerm="tho" />);
    expect(
      screen.getByRole("button", { name: "Submit search" })
    ).toBeDisabled();
  });
});

describe("InputWithLabel", () => {
  const inputProps = {
    id: "search",
    value: "test",
    children: "Search",
    onInputChange: vi.fn(),
    type: "text",
    isFocused: true,
  };

  it("renders the input field with its value", () => {
    render(<InputWithLabel {...inputProps} />);
    expect(screen.getByDisplayValue("test")).toBeInTheDocument();
  });

  it("renders the correct label for the input field", () => {
    render(<InputWithLabel {...inputProps} />);
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
  });

  it("renders the correct placeholder text", () => {
    render(<InputWithLabel {...inputProps} />);
    expect(
      screen.getByPlaceholderText("Search must be at least 4 characters")
    ).toBeInTheDocument();
  });

  it("renders the correct id for the input field", () => {
    render(<InputWithLabel {...inputProps} />);
    expect(screen.getByDisplayValue("test").id).toBe("search");
  });

  it("renders the correct type for the input field", () => {
    render(<InputWithLabel {...inputProps} />);
    expect(screen.getByDisplayValue("test").type).toBe("text");
  });

  it("renders the input field with autoFocus", () => {
    render(<InputWithLabel {...inputProps} />);
    expect(screen.getByDisplayValue("test")).toHaveFocus();
  });

  it("calls onInputChange when the input field value changes", () => {
    render(<InputWithLabel {...inputProps} />);
    fireEvent.change(screen.getByDisplayValue("test"), {
      target: { value: "new value" },
    });
    expect(inputProps.onInputChange).toHaveBeenCalledTimes(1);
  });
});
