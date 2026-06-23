import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Rating from "@/components/atoms/Rating";

describe("Rating", () => {
  it("shows the rating to one decimal", () => {
    render(<Rating value={4.27} />);
    expect(screen.getByText("4.3")).toBeInTheDocument();
  });

  it("exposes an accessible label with the raw value", () => {
    render(<Rating value={4.27} />);
    expect(screen.getByText("4.3").closest("[aria-label]")).toHaveAttribute(
      "aria-label",
      "Rated 4.27 out of 5",
    );
  });
});
