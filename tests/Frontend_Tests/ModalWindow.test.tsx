import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ModalWindow from "@/components/UI/ModalWindow/ModalWindow";

describe("ModalWindow Component", () => {
  let mockSetVisible: jest.Mock;

  beforeEach(() => {
    mockSetVisible = jest.fn();
  });

  it("renders children inside the modal", () => {
    render(
      <ModalWindow visible={true} setVisible={mockSetVisible}>
        <p>Modal Content</p>
      </ModalWindow>,
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("adds the active class when visible is true", () => {
    render(
      <ModalWindow visible={true} setVisible={mockSetVisible}>
        <p>Modal Content</p> {/* Added simple child here */}
      </ModalWindow>,
    );
    const modal = screen.getByRole("dialog");

    expect(modal).toHaveClass("myModal");
    expect(modal).toHaveClass("active");
  });

  it("does not have the active class when visible is false", () => {
    render(
      <ModalWindow visible={false} setVisible={mockSetVisible}>
        <p>Modal Content</p>
      </ModalWindow>,
    );
    const modal = screen.getByRole("dialog");

    expect(modal).toHaveClass("myModal");
    expect(modal).not.toHaveClass("active");
  });

  it("calls setVisible(false) when clicking on the modal background", () => {
    render(
      <ModalWindow visible={true} setVisible={mockSetVisible}>
        <p>Modal Content</p>
      </ModalWindow>,
    );
    const modal = screen.getByRole("dialog");

    fireEvent.click(modal);

    expect(mockSetVisible).toHaveBeenCalledTimes(1);
    expect(mockSetVisible).toHaveBeenCalledWith(false);
  });

  it("does not close the modal when clicking inside the modal content", () => {
    render(
      <ModalWindow visible={true} setVisible={mockSetVisible}>
        <p>Modal Content</p>
      </ModalWindow>,
    );

    const modalContent = screen.getByText("Modal Content");

    fireEvent.click(modalContent);

    expect(mockSetVisible).not.toHaveBeenCalled();
  });
});
