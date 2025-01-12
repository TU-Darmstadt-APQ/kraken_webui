/**
 * Unit tests for the `PostItem` component.
 *
 * The `PostItem` component displays individual post details and provides actions such as editing or deleting the post.
 *
 * Tests include:
 * - Verifying correct rendering of post data (title and description).
 * - Ensuring the "Edit" and "Delete" buttons are rendered.
 * - Checking that the `remove` function is called with the correct post data when the "Delete" button is clicked.
 * - Confirming that title and description are rendered within the appropriate HTML elements.
 * - Cleaning up the DOM after each test to prevent side effects.
 */

import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import PostItem from "@/components/PostItem";
import "@testing-library/jest-dom";
// Mocking the remove function passed as props
const mockRemove = jest.fn();
const mockEdit = jest.fn();

// Mock post data
const mockPost = {
  id: 1,
  title: "Test Post Title",
  description: "Test post description",
  date_created: { day: 1, month: 1, year: 2025, nanoseconds: 0 },
  date_modified: { day: 1, month: 1, year: 2025, nanoseconds: 0 },
  uuid: "uuid-1234",
  topic: "Topic",
  unit: "Unit",
  driver: "Driver",
};

const mockNumber = 1;

afterEach(() => {
  cleanup(); // Clean up the DOM after each test
});

describe("PostItem component", () => {
  it("renders correctly with post data", () => {
    render(
      <PostItem
        number={mockNumber}
        post={mockPost}
        remove={mockRemove}
        edit={mockEdit}
      />,
    );

    // Check if title and description are displayed
    expect(screen.getByText("1. Test Post Title")).toBeInTheDocument();
    expect(screen.getByText("Test post description")).toBeInTheDocument();
  });

  it("calls remove function when delete button is clicked", () => {
    render(
      <PostItem
        number={mockNumber}
        post={mockPost}
        remove={mockRemove}
        edit={mockEdit}
      />,
    );

    const deleteButton = screen.getByAltText("Delete");
    fireEvent.click(deleteButton);

    // Check if remove function is called once with the correct post
    expect(mockRemove).toHaveBeenCalledTimes(1);
    expect(mockRemove).toHaveBeenCalledWith(mockPost);
  });

  //  Check if Edit button is rendered
  it('renders the "Edit" button', () => {
    render(
      <PostItem
        number={mockNumber}
        post={mockPost}
        remove={mockRemove}
        edit={mockEdit}
      />,
    );
    const editButton = screen.getByAltText("Edit");
    expect(editButton).toBeInTheDocument(); // Ensure the "Edit" button is rendered
  });

  //  Check if Delete button is rendered
  it('renders the "Delete" button', () => {
    render(
      <PostItem
        number={mockNumber}
        post={mockPost}
        remove={mockRemove}
        edit={mockEdit}
      />,
    );
    const deleteButton = screen.getByAltText("Delete");
    expect(deleteButton).toBeInTheDocument(); // Ensure the "Delete" button is rendered
  });

  //  Check if title and description are inside the right elements
  it("renders post title and description inside the correct elements", () => {
    render(
      <PostItem
        number={mockNumber}
        post={mockPost}
        remove={mockRemove}
        edit={mockEdit}
      />,
    );

    const titleElement = screen.getByText("1. Test Post Title");
    const descriptionElement = screen.getByText("Test post description");

    // Check if title is inside a <strong> element
    expect(titleElement.tagName).toBe("STRONG");

    // Check if description is inside a <div> element
    expect(descriptionElement.tagName).toBe("DIV");
  });
});
