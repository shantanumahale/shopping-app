import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Price from "@/components/atoms/Price";

describe("Price", () => {
  it("formats the value as USD with two decimals", () => {
    render(<Price value={9.5} />);
    expect(screen.getByText("$9.50")).toBeInTheDocument();
  });

  it("rounds to two decimals", () => {
    render(<Price value={12.345} />);
    expect(screen.getByText("$12.35")).toBeInTheDocument();
  });
});
