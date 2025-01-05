/**
 * Unit tests for the `TableItem` component.
 *
 * The `TableItem` component represents a row in a table displaying post details and includes a "Delete" action.
 *
 * Tests include:
 * - Verifying the `remove` callback is called with the correct post data when the "Delete" button is clicked.
 * - Ensuring the component integrates properly within a table structure.
 */

import { render, screen, fireEvent } from "@testing-library/react";
import TableItem from "@/app/components/TableItem";
import { Post } from "@/app/types";
import "@testing-library/jest-dom";

describe("TableItem Component", () => {
  // Mock data for the post object
  const mockPost: Post = {
    id: 1,
    title: "Test Post",
    description: "Test Description",
    date_created: { day: 10, month: 12, year: 2024 }, // Format as "YYYY-MM-DD"
    date_modified: { day: 11, month: 12, year: 2024 }, // Format as "YYYY-MM-DD"
    enabled: true, // Convert the boolean to a string
    label: "Test Label",
    uuid: "uuid-123",
    config: { key1: "value1" }, // Convert the object to a JSON string
    on_connect: "test-connect",
    topic: "Test Topic",
    unit: "Test Unit",
    driver: "Test Driver",
  };

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

  it("calls remove callback when remove button is clicked", () => {
    render(
      <table>
        <tbody>
          <TableItem
            post={mockPost}
            remove={mockRemove} // Only pass remove, since edit is no longer part of TableItemProps
            edit={mockEdit}
            selectedColumns={mockSelectedColumns}
          />
        </tbody>
      </table>,
    );

    // Trigger the remove button click
    const removeButton = screen.getByAltText("Delete");
    fireEvent.click(removeButton);

    // Check if the remove function was called with the correct post
    expect(mockRemove).toHaveBeenCalledWith(mockPost);
  });
});
