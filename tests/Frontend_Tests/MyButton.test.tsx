import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import MyButton from "@/components/UI/button/MyButton";
import userEvent from "@testing-library/user-event";

// Mock function for onClick
const mockOnClick = jest.fn();

describe("MyButton Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders button with correct text", () => {
    render(<MyButton>Click Me</MyButton>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", async () => {
    render(<MyButton onClick={mockOnClick}>Click Me</MyButton>);

    await userEvent.click(screen.getByRole("button", { name: /click me/i }));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when button is disabled", async () => {
    render(
      <MyButton onClick={mockOnClick} disabled>
        Click Me
      </MyButton>,
    );

    await userEvent.click(screen.getByRole("button", { name: /click me/i }));

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("applies additional className from props", () => {
    render(<MyButton className="extra-class">Click Me</MyButton>);
    const button = screen.getByRole("button");

    expect(button.className).toContain("myBtn");
    expect(button.className).toContain("extra-class");
  });

  it("is accessible via keyboard (Enter and Space)", async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    render(<MyButton onClick={mockOnClick}>Click Me</MyButton>);
    const button = screen.getByRole("button", { name: /click me/i });

    // Make sure the button is available
    expect(button).toBeInTheDocument();
    expect(button).toBeVisible();
    expect(button).not.toBeDisabled();

    // Focus the button (it is important for Enter/Space. Otherwise it will not be registered)
    button.focus();
    await waitFor(() => {
      expect(button).toHaveFocus();
    });

    // Simulate keys
    await user.keyboard("{Enter}");
    await waitFor(() => expect(mockOnClick).toHaveBeenCalledTimes(1));
    await user.keyboard(" ");

    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalledTimes(2);
    });
  });

  it("renders as a disabled button when the disabled prop is passed", () => {
    render(<MyButton disabled>Disabled</MyButton>);
    const button = screen.getByRole("button", { name: /disabled/i });

    expect(button).toBeDisabled();
  });
});
