/**
 * Unit tests for the `PostForm` component.
 *
 * The `PostForm` component provides a form for creating or editing posts.
 *
 * Tests include:
 * - Rendering the form with the correct input fields and verifying user input changes.
 * - Verifying the `create` function is called with the correct data when the form is submitted.
 * - Ensuring proper cleanup after each test to avoid side effects.
 */

import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import PostForm from "@/app/components/PostForm";
import "@testing-library/jest-dom";

// Mocking the create and edit functions passed as props
/**
 * A mock function that simulates the behavior of the `create` callback.
 * This is used to test whether the `PostForm` component correctly calls
 * the `create` function with the expected data when submitting a new post.
 *
 * @example
 * expect(mockCreate).toHaveBeenCalledTimes(1);
 * expect(mockCreate).toHaveBeenCalledWith({
 *   title: "New Title",
 *   description: "New Description",
 *   uuid: "uuid-1234",
 *   // other fields...
 * });
 */
const mockCreate = jest.fn();

/**
 * A mock function that simulates the behavior of the `edit` callback.
 * This is used to test whether the `PostForm` component correctly calls
 * the `edit` function with the expected data when submitting an updated post.
 *
 * @example
 * expect(mockEdit).toHaveBeenCalledTimes(1);
 * expect(mockEdit).toHaveBeenCalledWith({
 *   title: "Updated Title",
 *   description: "Updated Description",
 *   uuid: "uuid-1234",
 *   // other fields...
 * });
 */
const mockEdit = jest.fn();

/**
 * Helper function to render the `PostForm` component for testing purposes.
 *
 * This function simplifies rendering the `PostForm` component by automatically
 * injecting the mock `create` and `edit` functions as props. Additional props
 * can be passed to customize the rendered component for specific test scenarios.
 */
const renderPostForm = (props: any) => {
  render(<PostForm {...props} create={mockCreate} edit={mockEdit} />);
};

// Mock for window.alert
beforeAll(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

afterEach(() => {
  cleanup(); // Clean up the DOM after each test
});

/**
 * A test suite for the `PostForm` component.
 *
 * This suite includes unit tests for verifying the functionality of the `PostForm` component,
 * which provides a form for creating or editing posts. The tests ensure that the component behaves
 * as expected in various scenarios, such as:
 *
 * - Rendering the form correctly with all input fields.
 * - Allowing user input changes and verifying the updated values.
 * - Calling the `create` function with the correct data when submitting a new post.
 *
 * @example
 * // Example test cases included in this suite:
 * it("renders correctly and allows input changes", () => { ... });
 * it("calls create when submitting the form with new data", () => { ... });
 */
describe("PostForm component", () => {
  it("renders correctly and allows input changes", () => {
    renderPostForm({ create: mockCreate, edit: mockEdit });

    // Check if input fields are rendered with the correct placeholder text
    expect(screen.getByPlaceholderText("Sensor Host UUID")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Sensor Host UUID"), {
      target: { value: "uuid-1234" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Topic 1" },
    });

    // Verify the input values
    expect(screen.getByPlaceholderText("Sensor Host UUID")).toHaveValue(
      "uuid-1234",
    );
    expect(screen.getByPlaceholderText("Description")).toHaveValue("Topic 1");
  });

  it("calls create when submitting the form with new data", () => {
    renderPostForm({ create: mockCreate, edit: mockEdit });

    // Fill the form with values
    fireEvent.change(screen.getByPlaceholderText("Sensor Host UUID"), {
      target: { value: "uuid-1234" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Topic 1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Driver"), {
      target: { value: "Driver 1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Topic"), {
      target: { value: "Topic 1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Unit"), {
      target: { value: "Unit 1" },
    });

    // Submit the form (click the button)
    fireEvent.click(screen.getByText("Add new sensor"));

    const expectedPost = {
      id: expect.any(Number),
      title: "",
      description: "Topic 1",
      uuid: "uuid-1234",
      driver: "Driver 1",
      topic: "Topic 1",
      unit: "Unit 1",
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

    // Check if the create function is called
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining(expectedPost),
    );
  });
});
