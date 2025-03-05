import "@testing-library/jest-dom";
import React, { createRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MyInput from "@/components/UI/input/MyInput";
import userEvent from "@testing-library/user-event";

describe("MyInput Component", () => {
  it("renders input field correctly", () => {
    render(<MyInput placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");

    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("myInput"); // Ensure the input has the correct class
  });

  it("accepts and displays user input", async () => {
    const user = userEvent.setup();
    render(<MyInput placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");

    await user.type(input, "Hello, World!");

    expect(input).toHaveValue("Hello, World!");
  });

  it("displays error tooltip when error prop is provided", () => {
    render(<MyInput error="Invalid input" />);
    const tooltip = screen.getByText("Invalid input");

    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveClass("tooltip"); // Ensure the tooltip class is applied
  });

  it("applies correct tooltip position class", () => {
    render(<MyInput error="Invalid input" tooltipPosition="top" />);
    const tooltip = screen.getByText("Invalid input");

    expect(tooltip).toHaveClass("tooltip");
    expect(tooltip.className).toContain("top"); // Ensure the correct position class is applied
  });

  it("focuses input when clicked", async () => {
    const user = userEvent.setup();
    render(<MyInput placeholder="Click me" />);
    const input = screen.getByPlaceholderText("Click me");

    await user.click(input);

    await waitFor(() => expect(input).toHaveFocus());
  });

  it("forwards ref correctly", () => {
    const ref = createRef<HTMLInputElement>();
    render(<MyInput ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
