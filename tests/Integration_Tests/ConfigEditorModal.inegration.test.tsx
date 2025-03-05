import "@testing-library/jest-dom";
import React, { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ConfigEditorModal from "@/components/UI/ConfigEditorModal";

// This is the wrapper component for integration testing. Its provides a controlled `config` state for the `ConfigEditorModal`
const TestWrapper = ({
  initialConfig,
  selectedSensorType = "",
}: {
  initialConfig: Record<string, unknown>;
  selectedSensorType?: string;
}) => {
  const [config, setConfig] = useState(initialConfig ?? {});

  return (
    <ConfigEditorModal
      config={config}
      setConfig={setConfig}
      selectedSensorType={selectedSensorType}
    />
  );
};

describe("ConfigEditorModal Integration Test", () => {
  it("renders correctly", () => {
    render(<TestWrapper initialConfig={{}} />);
    expect(screen.getByText("Edit configuration")).toBeInTheDocument();
  });

  it("displays 'No configuration added yet' when config is empty", () => {
    render(<TestWrapper initialConfig={{}} />);
    expect(screen.getByText("No configuration added yet.")).toBeInTheDocument();
  });

  it("adds a new config entry when user inputs a key and value", async () => {
    render(<TestWrapper initialConfig={{}} />);

    // Find the key and value input fields
    const keyInput = screen.getByPlaceholderText("Key");
    const valueInput = screen.getByPlaceholderText("Value");

    // Enter key and value
    fireEvent.change(keyInput, { target: { value: "sensor_threshold" } });
    fireEvent.change(valueInput, { target: { value: "50" } });

    // Click the "Add" button
    const addButton = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/sensor_threshold/i)).toBeInTheDocument();
      expect(screen.getByText(/50/i)).toBeInTheDocument();
    });
  });

  it("removes a config entry when delete button is clicked", async () => {
    render(<TestWrapper initialConfig={{ sensor_mode: "auto" }} />);

    // Verify the entry exists before deletion
    expect(screen.getByText(/sensor_mode/i)).toBeInTheDocument();
    expect(screen.getByText(/auto/i)).toBeInTheDocument();

    // Click the "Delete" button
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    // Verify that the entry is removed
    await waitFor(() => {
      expect(screen.queryByText(/sensor_mode/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/auto/i)).not.toBeInTheDocument();
    });
  });

  it("does not add an entry when key or value is empty", async () => {
    render(<TestWrapper initialConfig={{}} />);

    const addButton = screen.getByRole("button", { name: /add/i });

    // Attempt to click "Add" without entering any data
    fireEvent.click(addButton);

    // Ensure that no entry is added
    await waitFor(() => {
      expect(
        screen.getByText("No configuration added yet."),
      ).toBeInTheDocument();
    });

    // Enter only a key but leave the value empty
    const keyInput = screen.getByPlaceholderText("Key");
    fireEvent.change(keyInput, { target: { value: "sensor_mode" } });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(
        screen.getByText("No configuration added yet."),
      ).toBeInTheDocument();
    });

    // Enter only a value but leave the key empty
    fireEvent.change(keyInput, { target: { value: "" } });
    const valueInput = screen.getByPlaceholderText("Value");
    fireEvent.change(valueInput, { target: { value: "auto" } });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(
        screen.getByText("No configuration added yet."),
      ).toBeInTheDocument();
    });
  });

  it("calls setConfig when value is changed", async () => {
    render(
      <TestWrapper
        initialConfig={{ sensor_threshold: "50" }}
        selectedSensorType="Tinkerforge"
      />,
    );

    // Verify that the entry is displayed
    expect(screen.getByText(/sensor_threshold/i)).toBeInTheDocument();

    // Find the input field containing the value "50"
    const valueInput = screen.getByDisplayValue("50");

    // Change the value from "50" to "100"
    fireEvent.change(valueInput, { target: { value: "100" } });

    // Verify that the new value appears
    await waitFor(() => {
      expect(screen.getByText(/sensor_threshold/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue("100")).toBeInTheDocument();
    });
  });
});
