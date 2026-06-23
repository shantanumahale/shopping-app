import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import ProductFeed from "@/components/widgets/ProductFeed";
import { resetCart } from "../utils/cart";
import { makeProducts } from "../utils/fixtures";
import * as api from "@/lib/api";

vi.mock("@/lib/api");

type Triggerable = { instances: { trigger: (b?: boolean) => void }[] };
function observerStore() {
  return (globalThis as unknown as { IntersectionObserverMock: Triggerable })
    .IntersectionObserverMock;
}

describe("ProductFeed infinite scroll (integration)", () => {
  beforeEach(() => {
    resetCart();
    vi.mocked(api.getProducts).mockReset();
    observerStore().instances.length = 0;
  });

  it("renders the initial page with a progress status", () => {
    render(<ProductFeed initialProducts={makeProducts(2, 1)} total={4} />);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText(/showing 2 of 4 products/i)).toBeInTheDocument();
  });

  it("loads the next page when the sentinel intersects", async () => {
    vi.mocked(api.getProducts).mockResolvedValue({
      products: makeProducts(2, 3),
      total: 4,
    });
    render(<ProductFeed initialProducts={makeProducts(2, 1)} total={4} />);

    const instances = observerStore().instances;
    await act(async () => {
      instances[instances.length - 1].trigger(true);
    });

    await waitFor(() =>
      expect(screen.getByText("Product 3")).toBeInTheDocument(),
    );
    expect(screen.getByText("Product 4")).toBeInTheDocument();
    expect(api.getProducts).toHaveBeenCalledWith(30, 2);
    expect(screen.getByText(/all 4 products loaded/i)).toBeInTheDocument();
  });

  it("marks the feed complete when nothing more to load", () => {
    render(<ProductFeed initialProducts={makeProducts(4, 1)} total={4} />);
    expect(screen.getByText(/all 4 products loaded/i)).toBeInTheDocument();
  });
});
