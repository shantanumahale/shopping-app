import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/molecules/ProductCard";
import { resetCart } from "../utils/cart";
import { makeProduct } from "../utils/fixtures";

describe("ProductCard", () => {
  beforeEach(() => resetCart());

  it("renders product info, image, and a link to the detail page", () => {
    render(
      <ProductCard
        product={makeProduct({
          id: 42,
          title: "Nice Thing",
          price: 12,
          rating: 4,
        })}
      />,
    );
    expect(screen.getByText("Nice Thing")).toBeInTheDocument();
    expect(screen.getByText("$12.00")).toBeInTheDocument();
    expect(screen.getByText("4.0")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/products/42");
    expect(screen.getByRole("img", { name: "Nice Thing" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });
});
