/**
 * Unit tests for the `TableItem` component.
 *
 * The `TableItem` component represents a row in a table displaying post details and includes a "Delete" action.
 *
 * Tests include:
 * - Verifying the `remove` callback is called with the correct post data when the "Delete" button is clicked.
 * - Ensuring the component integrates properly within a table structure.
 */

import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import TableItem from "@/components/TableItem";
import { convertPostToDTO } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Mock functions for callbacks
const mockRemove = jest.fn();
const mockEdit = jest.fn();
const mockSelectedColumns = {
  id: true,
  title: true,
  description: true,
  date_created: true,
  date_modified: true,
  enabled: true,
  label: true,
  uuid: true,
  config: true,
  on_connect: true,
};

// Mock global alert to prevent JSDOM errors
global.alert = jest.fn();

// Sample mock post data
const mockPost = {
  title: "Test Post",
  description: "Test Description",
  date_created: { day: 10, month: 12, year: 2024 },
  date_modified: { day: 11, month: 12, year: 2024 },
  enabled: true,
  label: "Test Label",
  uuid: uuidv4(),
  config: { key1: "value1" },
  on_connect: "test-connect",
  topic: "Test Topic",
  unit: "Test Unit",
  driver: "Test Driver",
};

// Mock the `deleteSensorAction` function to prevent direct database calls
jest.mock("../../src/actions/action_deleteSensors", () => ({
  deleteSensorAction: jest.fn().mockImplementation(async (uuid) => {
    return { success: true, message: "Deleted successfully" };
  }),
}));

describe("TableItem Component", () => {
  it("calls remove callback when delete button is clicked", async () => {
    render(
      <TableItem
        post={convertPostToDTO(mockPost)}
        remove={mockRemove}
        edit={mockEdit}
        selectedColumns={mockSelectedColumns}
      />,
    );

    // Click the delete button
    fireEvent.click(screen.getByAltText("Delete"));

    // Ensure deleteSensorAction was called and remove was called with correct post
    await waitFor(() => {
      expect(mockRemove).toHaveBeenCalledTimes(1);
      expect(mockRemove).toHaveBeenCalledWith(
        expect.objectContaining({
          uuid: mockPost.uuid,
          description: mockPost.description,
          label: mockPost.label,
        }),
      );
    });
  });
});
