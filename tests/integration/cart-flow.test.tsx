import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartControl from "@/components/widgets/CartControl";
import CartView from "@/components/widgets/CartView";
import { resetCart } from "../utils/cart";
import { makeProduct } from "../utils/fixtures";

describe("cart flow (integration)", () => {
  beforeEach(() => resetCart());

  it("adds, increments, and removes a product across components", async () => {
    const user = userEvent.setup();
    const product = makeProduct({ id: 1, title: "Lipstick", price: 12.5 });

    render(
      <>
        <section aria-label="controls">
          <CartControl product={product} />
        </section>
        <section aria-label="cart">
          <CartView />
        </section>
      </>,
    );

    const cart = within(screen.getByRole("region", { name: "cart" }));
    const controls = within(screen.getByRole("region", { name: "controls" }));

    expect(cart.getByText(/your cart is empty/i)).toBeInTheDocument();

    // Add via the product control -> appears in the cart with a total.
    await user.click(controls.getByRole("button", { name: /add/i }));
    expect(cart.getByText("Lipstick")).toBeInTheDocument();
    expect(cart.getByText(/total \(1 items\)/i)).toBeInTheDocument();

    // Increment from inside the cart -> total recomputes.
    await user.click(cart.getByRole("button", { name: "Increase quantity" }));
    expect(cart.getByText(/total \(2 items\)/i)).toBeInTheDocument();
    expect(cart.getAllByText("$25.00").length).toBeGreaterThanOrEqual(1);

    // Remove -> back to empty.
    await user.click(
      cart.getByRole("button", { name: /remove lipstick from cart/i }),
    );
    expect(cart.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
