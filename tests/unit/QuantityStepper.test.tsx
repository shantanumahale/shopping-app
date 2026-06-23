import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuantityStepper from "@/components/molecules/QuantityStepper";

describe("QuantityStepper", () => {
  it("renders the current quantity", () => {
    render(
      <QuantityStepper
        quantity={3}
        onIncrement={vi.fn()}
        onDecrement={vi.fn()}
      />,
    );
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("fires increment and decrement handlers", async () => {
    const user = userEvent.setup();
    const onIncrement = vi.fn();
    const onDecrement = vi.fn();
    render(
      <QuantityStepper
        quantity={1}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    await user.click(screen.getByRole("button", { name: "Decrease quantity" }));
    expect(onIncrement).toHaveBeenCalledOnce();
    expect(onDecrement).toHaveBeenCalledOnce();
  });
});
