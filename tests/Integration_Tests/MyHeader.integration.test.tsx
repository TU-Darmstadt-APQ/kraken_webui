/**
 * Integration test for the MyHeader component.
 *
 * This test verifies that:
 * - The search input (`MyInput`) updates the filter state correctly.
 * - The sorting dropdown (`MySelect`) updates the sorting field.
 * - The search field dropdown (`MySelect`) updates the search field.
 * - Clicking the "Add new Sensor" button (`MyButton`) triggers its callback function.
 *
 * It ensures that `PostFilter`, `MyHeader`, and `MyButton` work together as expected.
 */

import { fireEvent, render, screen } from "@testing-library/react";
import MyHeader from "@/components/UI/header/MyHeader";
import React from "react";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";

describe("MyHeader Integration Test", () => {
  it("updates filter when typing in MyInput and selecting MySelect", () => {
    const addingNewSensor = jest.fn(); // Mock function
    const setFilter = jest.fn(); // Mock function to track state updates

    // Ensure the filter object matches the Filter interface
    const filter = {
      query: "",
      sort: "title" as keyof tinkerforgeDTO, // Ensure sort is a valid key of Post
      searchField: "all" as keyof tinkerforgeDTO | "all", // Ensure searchField is a valid key of Post or "all"
    };

    render(
      <MyHeader
        addingNewSensor={addingNewSensor}
        filter={filter}
        setFilter={setFilter}
      />,
    );

    // 1. Find MyInput and type into it
    const inputElement = screen.getByPlaceholderText("Search for...");
    fireEvent.change(inputElement, { target: { value: "sensor1" } });

    // Expect the setFilter function to be called with updated query
    expect(setFilter).toHaveBeenCalledWith({ ...filter, query: "sensor1" });

    // 2. Find MySelect (Sort dropdown) and select a new option
    const sortDropdowns = screen.getAllByRole("combobox"); // Get all combobox elements
    const sortDropdown = sortDropdowns[0]; // First combobox is the "Sort by" dropdown
    fireEvent.change(sortDropdown, { target: { value: "uuid" } });

    // Expect setFilter to be called with new sort field
    expect(setFilter).toHaveBeenCalledWith({ ...filter, sort: "uuid" });

    // 3. Find MySelect (Search Field dropdown) and select a new search field
    const searchFieldDropdown = sortDropdowns[1]; // Second combobox is the "Search by" dropdown
    fireEvent.change(searchFieldDropdown, { target: { value: "description" } });

    // Expect setFilter to be called with new search field
    expect(setFilter).toHaveBeenCalledWith({
      ...filter,
      searchField: "description",
    });

    // 4. Click the Add Sensor button
    const addButton = screen.getByRole("button", { name: /add new sensor/i });
    fireEvent.click(addButton);

    // Expect the addingNewSensor function to have been called
    expect(addingNewSensor).toHaveBeenCalled();
  });
});
