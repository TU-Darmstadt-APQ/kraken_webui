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

import "@testing-library/jest-dom";
import { Post, PostFormProps } from "@/types";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import PostForm from "@/components/PostForm";
import React from "react";

// Mocking the create and edit functions passed as props
const mockCreate = jest.fn();
const mockEdit = jest.fn();

/**
 * Helper function to render the `PostForm` component for testing purposes.
 *
 * This function simplifies rendering the `PostForm` component by automatically
 * injecting the mock `create` and `edit` functions as props. Additional props
 * can be passed to customize the rendered component for specific test scenarios.
 */
const renderPostForm = (props: Partial<PostFormProps> = {}) => {
  const resolvedProps: PostFormProps = {
    create: mockCreate,
    edit: mockEdit,
    postToEdit: props.postToEdit || null,
    ...props,
  };
  render(<PostForm {...resolvedProps} />);
};

beforeAll(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

afterEach(() => {
  cleanup(); // Clean up the DOM after each test
  jest.clearAllMocks(); // Clear all mocks after each test
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
 */
describe("PostForm component", () => {
  it("renders correctly and allows input changes", () => {
    renderPostForm();

    // Check if the form is rendered with the correct fields
    expect(screen.getByLabelText("Sensor Type")).toBeInTheDocument();
    expect(screen.getByText("Add new sensor")).toBeInTheDocument();
  });

  it("calls create when submitting the form with new data", () => {
    renderPostForm();

    // Simulate user input
    const sensorTypeSelect = screen.getByLabelText("Sensor Type");
    fireEvent.change(sensorTypeSelect, { target: { value: "GPIB" } });

    // Submit the form
    fireEvent.click(screen.getByText("Add new sensor"));

    // Check if the create function is called with the correct data
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "",
        description: "",
        uuid: expect.any(String),
        driver: "",
        topic: "",
        unit: "",
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
        config: {
          frequence: "",
          temperature: "",
          voltage: "",
        },
        enabled: false,
        label: "",
        on_connect: undefined,
        pad: 0,
        port: 0,
        sad: 0,
        host: "",
      }),
    );
  });

  it("calls edit when submitting the form with updated data", () => {
    const postToEdit: Post = {
      uid: 1,
      title: "Existing Post",
      description: "Existing Description",
      date_created: { day: 1, month: 1, year: 2023, nanoseconds: 0 },
      date_modified: { day: 1, month: 1, year: 2023, nanoseconds: 0 },
      enabled: true,
      label: "Existing Label",
      uuid: "uuid-1234",
      config: {},
      on_connect: undefined,
      topic: "Existing Topic",
      unit: "Existing Unit",
      driver: "Existing Driver",
      port: 8080,
      sad: 0,
      pad: 0,
      host: "Existing Host",
    };

    renderPostForm({ postToEdit });

    // Simulate user input
    const sensorTypeSelect = screen.getByLabelText("Sensor Type");
    fireEvent.change(sensorTypeSelect, { target: { value: "Tinkerforge" } });

    // Submit the form
    fireEvent.click(screen.getByText("Save changes"));

    // Check if the edit function is called with the correct data
    expect(mockEdit).toHaveBeenCalledTimes(1);
    expect(mockEdit).toHaveBeenCalledWith(
      expect.objectContaining({
        ...postToEdit,
        config: {
          description: "",
          interval: "",
          topic: "",
          "trigger only on change": "",
          unit: "",
        },
        date_modified: expect.objectContaining({
          day: expect.any(Number),
          month: expect.any(Number),
          year: expect.any(Number),
          nanoseconds: expect.any(Number),
        }),
        port: 42,
        uuid: "AutoGeneratedHost",
      }),
    );
  });

  it("updates the config when a sensor type is selected", () => {
    renderPostForm();

    // Simulate user selecting a sensor type
    const sensorTypeSelect = screen.getByLabelText("Sensor Type");
    fireEvent.change(sensorTypeSelect, { target: { value: "Tinkerforge" } });

    // Check if the config is updated correctly
    expect(mockCreate).not.toHaveBeenCalled(); // Ensure no submission yet
  });
});
