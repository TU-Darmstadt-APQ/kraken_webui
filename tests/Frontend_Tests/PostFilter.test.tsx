/**
 * Unit tests for the `PostFilter` component.
 *
 * The `PostFilter` component provides filtering functionality for posts by query and sorting options.
 *
 * Tests include:
 * - Updating the query field and verifying the filter is updated correctly.
 * - Changing the sort option and verifying the filter is updated correctly.
 * - Ensuring `setFilter` is not called when no changes are made to the inputs.
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PostFilter from "@/app/components/PostFilter";
import { Filter } from "@/app/types";

describe("PostFilter", () => {
  const setFilter = jest.fn();
  const filter: Filter = { query: "", sort: "title", searchField: "all" };

  let input: HTMLInputElement;
  let select: HTMLSelectElement;
  let searchFieldSelect: HTMLSelectElement;

  /**
   * Sets up the test environment for each test case.
   * - Resets the mock function `setFilter` to ensure clean test results.
   * - Renders the `PostFilter` component and queries DOM elements (`input`, `select` and `searchFieldSelect` elements).
   */
  beforeEach(() => {
    setFilter.mockClear(); // Reset previous calls to the mock function

    const { container } = render(
      <PostFilter filter={filter} setFilter={setFilter} />,
    );
    input = container.querySelector<HTMLInputElement>("input")!;
    const selects = container.querySelectorAll<HTMLSelectElement>("select");

    select = selects[0]; // The first `<select>` is for `sort`
    searchFieldSelect = selects[1]; // The second `<select>` is for `searchField`
  });

  it("should update the query when typed into the input", () => {
    fireEvent.change(input, { target: { value: "test" } });
    expect(setFilter).toHaveBeenCalledWith({
      query: "test",
      sort: "title",
      searchField: "all",
    });
  });

  it("should update the sort when a new option is selected", () => {
    fireEvent.change(select, { target: { value: "description" } });
    expect(setFilter).toHaveBeenCalledWith({
      query: "",
      sort: "description",
      searchField: "all",
    });
  });

  it("should update the searchField when a new option is selected", () => {
    fireEvent.change(searchFieldSelect, { target: { value: "title" } });

    expect(setFilter).toHaveBeenCalledWith({
      query: "",
      sort: "title",
      searchField: "title",
    });
  });

  it("should not call setFilter if no changes are made", () => {
    expect(setFilter).not.toHaveBeenCalled();
  });
});
