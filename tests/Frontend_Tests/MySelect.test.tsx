import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MySelect from "@/components/UI/select/MySelect";
import React from "react";
import userEvent from "@testing-library/user-event";

describe("MySelect Component", () => {
  const mockOnChange = jest.fn();
  const options = [
    { value: "option1", name: "Option 1" },
    { value: "option2", name: "Option 2" },
    { value: "option3", name: "Option 3" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders select element correctly", () => {
    render(
      <MySelect
        options={options}
        defaultValue="Select an option"
        value=""
        onChange={mockOnChange}
      />,
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveClass("my-select");
  });

  it("displays default value as the first disabled option", () => {
    render(
      <MySelect
        options={options}
        defaultValue="Select an option"
        value=""
        onChange={mockOnChange}
      />,
    );

    const defaultOption = screen.getByText("Select an option");
    expect(defaultOption).toBeInTheDocument();
    expect(defaultOption).toBeDisabled();
  });

  it("renders the correct number of options", () => {
    render(
      <MySelect
        options={options}
        defaultValue="Select an option"
        value=""
        onChange={mockOnChange}
      />,
    );

    const renderedOptions = screen.getAllByRole("option");
    expect(renderedOptions).toHaveLength(options.length + 1); // +1 for default option
  });

  it("calls onChange when a different option is selected", async () => {
    const user = userEvent.setup();
    render(
      <MySelect
        options={options}
        defaultValue="Select an option"
        value=""
        onChange={mockOnChange}
      />,
    );

    const select = screen.getByRole("combobox");

    await user.selectOptions(select, "option2");

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("option2");
  });

  it("updates value when an option is selected", async () => {
    const user = userEvent.setup();

    // Wrapper to simulate controlled behavior in this test
    function TestWrapper() {
      const [selected, setSelected] = React.useState("");

      return (
        <MySelect
          options={options}
          defaultValue="Select an option"
          value={selected}
          onChange={setSelected}
        />
      );
    }

    render(<TestWrapper />);

    const select = screen.getByRole("combobox");

    await user.selectOptions(select, "option3");

    expect(select).toHaveValue("option3"); // Controlled components does not work in tests !
  });

  it("does not call onChange when the default option is selected", async () => {
    const user = userEvent.setup();
    render(
      <MySelect
        options={options}
        defaultValue="Select an option"
        value=""
        onChange={mockOnChange}
      />,
    );

    const select = screen.getByRole("combobox");

    await user.selectOptions(select, "");

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
