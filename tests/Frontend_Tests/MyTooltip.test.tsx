import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MyTooltip from "@/components/UI/tooltip/MyTooltip";
import userEvent from "@testing-library/user-event";

describe("MyTooltip Component", () => {
  it("renders children correctly", () => {
    render(
      <MyTooltip infoText="Tooltip message">
        <button>Hover me</button>
      </MyTooltip>,
    );

    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("does not display tooltip initially", () => {
    render(
      <MyTooltip infoText="Tooltip message">
        <button>Hover me</button>
      </MyTooltip>,
    );

    expect(screen.queryByText("Tooltip message")).not.toBeInTheDocument();
  });

  it("displays tooltip on hover", async () => {
    const user = userEvent.setup();
    render(
      <MyTooltip infoText="Tooltip message">
        <button>Hover me</button>
      </MyTooltip>,
    );

    const triggerElement = screen.getByText("Hover me");
    await user.hover(triggerElement);

    expect(screen.getByText("Tooltip message")).toBeInTheDocument();
  });

  it("hides tooltip when mouse leaves", async () => {
    const user = userEvent.setup();
    render(
      <MyTooltip infoText="Tooltip message">
        <button>Hover me</button>
      </MyTooltip>,
    );

    const triggerElement = screen.getByText("Hover me");
    await user.hover(triggerElement);
    expect(screen.getByText("Tooltip message")).toBeInTheDocument();

    await user.unhover(triggerElement);
    expect(screen.queryByText("Tooltip message")).not.toBeInTheDocument();
  });

  it("applies the correct position class", async () => {
    render(
      <MyTooltip infoText="Tooltip message" position="top">
        <button>Hover me</button>
      </MyTooltip>,
    );

    const triggerElement = screen.getByText("Hover me");
    await userEvent.hover(triggerElement);

    const tooltip = screen.getByText("Tooltip message");
    expect(tooltip).toHaveClass("top"); // ensue the correct position class is applied
  });
});
