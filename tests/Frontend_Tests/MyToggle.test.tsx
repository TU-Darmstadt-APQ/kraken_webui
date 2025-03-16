import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MyToggle from "@/components/UI/toggle/MyToggle";
import userEvent from "@testing-library/user-event";

describe("MyToggle Component", () => {
  let mockOnChange: jest.Mock;

  beforeEach(() => {
    mockOnChange = jest.fn();
  });

  it("renders the toggle with the correct label", () => {
    render(
      <MyToggle
        label="Enable Feature"
        checked={false}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByText("Enable Feature")).toBeInTheDocument();
  });

  it("renders as checked when `checked` is true", () => {
    render(
      <MyToggle label="Test Toggle" checked={true} onChange={mockOnChange} />,
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("renders as unchecked when `checked` is false", () => {
    render(
      <MyToggle label="Test Toggle" checked={false} onChange={mockOnChange} />,
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("calls `onChange` with the correct value when toggled", async () => {
    const user = userEvent.setup();
    render(
      <MyToggle label="Toggle me" checked={false} onChange={mockOnChange} />,
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it("calls `onChange` with false when toggled off", async () => {
    const user = userEvent.setup();
    render(
      <MyToggle label="Toggle me" checked={true} onChange={mockOnChange} />,
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(false);
  });
});
