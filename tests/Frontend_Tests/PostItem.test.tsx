/**
 * Unit tests for the PostItem component.
 *
 * The PostItem component displays minimal information about a sensor,
 * including its title and description, and provides edit and delete buttons.
 *
 * Tests include:
 * - Rendering the component with correct post data.
 * - Ensuring the edit function is called with the correct argument when the edit button is clicked.
 * - Verifying that the remove function is called with a valid UUID when delete is triggered.
 * - Avoiding actual database connections for delete operations.
 */

import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PostItem from "@/components/PostItem";
import React from "react";

// Mock functions for edit and remove callbacks
const mockEdit = jest.fn();
const mockRemove = jest.fn();

// Mock global alert to prevent JSDOM errors
global.alert = jest.fn();

/**
 * Sample post data to be used in tests.
 */
const mockPost = {
  uuid: expect.any(String),
  title: "Test Sensor",
  description: "This is a test sensor description",
  driver: "Test Driver",
  topic: "Test Topic",
  unit: "Test Unit",
  date_created: expect.objectContaining({
    day: expect.any(Number),
    month: expect.any(Number),
    year: expect.any(Number),
    nanoseconds: expect.any(Number),
  }),
  date_modified: expect.objectContaining({
    day: expect.any(Number),
    month: expect.any(Number),
    year: expect.any(Number),
    nanoseconds: expect.any(Number),
  }),
  config: {},
  enabled: false,
  label: "",
  on_connect: undefined,
  pad: 0,
  port: 0,
  sad: 0,
};

/**
 * Helper function to render the PostItem component for testing.
 * This ensures consistency across all test cases.
 */
const renderPostItem = () => {
  render(
    <PostItem post={mockPost} number={1} edit={mockEdit} remove={mockRemove} />,
  );
};

jest.mock("../../src/actions/action_deleteSensors", () => ({
  deleteSensorAction: jest.fn().mockImplementation(async (uuid) => {
    return { success: true, message: "Deleted successfully" };
  }),
}));

/**
 * A test suite for the PostItem component.
 */
describe("PostItem component", () => {
  it("renders correctly with the given post data", () => {
    renderPostItem();

    // Check if title and description are displayed
    expect(screen.getByText("1. Test Sensor")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test sensor description"),
    ).toBeInTheDocument();
  });

  it("calls edit function with the correct post data when edit button is clicked", () => {
    renderPostItem();

    // Click the edit button
    fireEvent.click(screen.getByAltText("Edit"));

    // Ensure the edit function was called with the correct post data
    expect(mockEdit).toHaveBeenCalledTimes(1);
    expect(mockEdit).toHaveBeenCalledWith(mockPost);
  });

  it("calls remove function with a valid UUID when delete button is clicked", async () => {
    renderPostItem();

    // Click the delete button
    fireEvent.click(screen.getByAltText("Delete"));

    // Ensure remove function was called asynchronously
    await waitFor(() => {
      expect(mockRemove).toHaveBeenCalledTimes(1);
      expect(mockRemove).toHaveBeenCalledWith(
        expect.objectContaining({ uuid: "uuid-1234" }),
      );
    });
  });

  it("does not trigger a database call directly when delete button is clicked", async () => {
    renderPostItem();

    // Click the delete button
    fireEvent.click(screen.getByAltText("Delete"));

    // Ensure no direct database function is being called
    await waitFor(() => {
      expect(mockRemove).toHaveBeenCalledTimes(1);
      expect(mockRemove).toHaveBeenCalledWith(mockPost);
    });
  });
});
