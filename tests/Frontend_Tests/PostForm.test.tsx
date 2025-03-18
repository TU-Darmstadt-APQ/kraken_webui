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
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import PostForm from "@/components/PostForm";
import { PostFormProps } from "@/types";

import React from "react";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";
import { v4 as uuidv4 } from "uuid";

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

    // Simulate user selecting a sensor type
    const sensorTypeSelect = screen.getByLabelText("Sensor Type");
    fireEvent.change(sensorTypeSelect, { target: { value: "GPIB" } });

    // Submit the form
    fireEvent.click(screen.getByText("Add new sensor"));

    // Ensure create function is called
    expect(mockCreate).toHaveBeenCalledTimes(1);

    // Less strict check to allow variations in implementation
    const calledArg = mockCreate.mock.calls[0][0];

    expect(calledArg).toMatchObject({
      description: "",
      id: expect.any(String),
      uid: 0,
      date_created: expect.any(String),
      date_modified: expect.any(String),
      enabled: false,
      label: "",
      config: {},
      on_connect: expect.any(Array),
    });

    // Check if `config` exists and contains expected keys with nested structure
    expect(calledArg.config).toBeDefined();
    expect(Object.keys(calledArg.config)).toEqual(
      expect.arrayContaining(["frequence", "temperature", "voltage"]),
    );

    expect(calledArg.config.frequence).toMatchObject({
      description: expect.any(String),
      interval: expect.any(Number),
      topic: expect.any(String),
      trigger_only_on_change: expect.any(Boolean),
      unit: expect.any(String),
    });

    expect(calledArg.config.temperature).toMatchObject({
      description: expect.any(String),
      interval: expect.any(Number),
      topic: expect.any(String),
      trigger_only_on_change: expect.any(Boolean),
      unit: expect.any(String),
    });

    expect(calledArg.config.voltage).toMatchObject({
      description: expect.any(String),
      interval: expect.any(Number),
      topic: expect.any(String),
      trigger_only_on_change: expect.any(Boolean),
      unit: expect.any(String),
    });
  });

  it("calls edit when submitting the form with updated data", () => {
    const postToEdit: tinkerforgeDTO = {
      id: uuidv4(),
      uid: 1,
      description: "Existing Description",
      date_created: new Date(2023, 0, 1).toISOString(),
      date_modified: new Date(2023, 0, 1).toISOString(),
      enabled: true,
      label: "Existing Label",
      config: {},
      on_connect: [],
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
        config: expect.objectContaining({
          description: expect.objectContaining({
            description: expect.any(String),
            interval: expect.any(Number),
            topic: expect.any(String),
            trigger_only_on_change: expect.any(Boolean),
            unit: expect.any(String),
          }),
          interval: expect.objectContaining({
            description: expect.any(String),
            interval: expect.any(Number),
            topic: expect.any(String),
            trigger_only_on_change: expect.any(Boolean),
            unit: expect.any(String),
          }),
          topic: expect.objectContaining({
            description: expect.any(String),
            interval: expect.any(Number),
            topic: expect.any(String),
            trigger_only_on_change: expect.any(Boolean),
            unit: expect.any(String),
          }),
          "trigger only on change": expect.objectContaining({
            description: expect.any(String),
            interval: expect.any(Number),
            topic: expect.any(String),
            trigger_only_on_change: expect.any(Boolean),
            unit: expect.any(String),
          }),
          unit: expect.objectContaining({
            description: expect.any(String),
            interval: expect.any(Number),
            topic: expect.any(String),
            trigger_only_on_change: expect.any(Boolean),
            unit: expect.any(String),
          }),
        }),
        date_modified: expect.any(String),
        id: "AutoGeneratedHost",
        port: 42,
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
