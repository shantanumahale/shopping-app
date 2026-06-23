import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartControl from "@/components/widgets/CartControl";
import { resetCart } from "../utils/cart";
import { makeProduct } from "../utils/fixtures";

describe("CartControl", () => {
  beforeEach(() => resetCart());

  it("shows an add button when the product is not in the cart", () => {
    render(<CartControl product={makeProduct({ id: 1 })} />);
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Increase quantity" }),
    ).not.toBeInTheDocument();
  });

  it("switches to a stepper after adding and back to add at zero", async () => {
    const user = userEvent.setup();
    render(<CartControl product={makeProduct({ id: 1 })} />);

    await user.click(screen.getByRole("button", { name: /add/i }));
    expect(screen.getByText("1")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    expect(screen.getByText("2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Decrease quantity" }));
    await user.click(screen.getByRole("button", { name: "Decrease quantity" }));
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });
});
