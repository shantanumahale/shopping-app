import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Discount from "@/components/atoms/Discount";

describe("Discount", () => {
  it("renders a rounded percentage off", () => {
    render(<Discount value={10} />);
    expect(screen.getByText("10% off")).toBeInTheDocument();
  });

  it("rounds the discount to a whole number", () => {
    render(<Discount value={12.4} />);
    expect(screen.getByText("12% off")).toBeInTheDocument();
  });
});
