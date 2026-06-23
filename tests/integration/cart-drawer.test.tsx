import { describe, it, expect, beforeEach } from "vitest";
import {
  render,
  screen,
  within,
  renderHook,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartDrawer from "@/components/widgets/CartDrawer";
import { useCart } from "@/store/cart";
import { resetCart } from "../utils/cart";
import { makeProduct } from "../utils/fixtures";

describe("cart drawer (integration)", () => {
  beforeEach(() => resetCart());

  it("opens and shows items, total, and checkout CTAs", async () => {
    const user = userEvent.setup();
    const { result } = renderHook(() => useCart());
    act(() =>
      result.current.add(makeProduct({ id: 1, title: "Widget", price: 5 })),
    );

    render(<CartDrawer />);
    await user.click(screen.getByRole("button", { name: /open cart/i }));

    const dialog = within(await screen.findByRole("dialog"));
    expect(dialog.getByText("Widget")).toBeInTheDocument();
    expect(
      dialog.getByRole("link", { name: /proceed to checkout/i }),
    ).toHaveAttribute("href", "/checkout");
    expect(
      dialog.getByRole("link", { name: /view full cart/i }),
    ).toHaveAttribute("href", "/cart");
  });

  it("shows an empty state when there are no items", async () => {
    const user = userEvent.setup();
    render(<CartDrawer />);
    await user.click(screen.getByRole("button", { name: /open cart/i }));
    const dialog = within(await screen.findByRole("dialog"));
    expect(dialog.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
