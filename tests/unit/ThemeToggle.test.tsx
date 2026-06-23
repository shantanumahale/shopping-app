import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/widgets/ThemeToggle";

function renderToggle() {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.className = "";
    localStorage.clear();
  });

  it("renders an accessible toggle button", () => {
    renderToggle();
    expect(
      screen.getByRole("button", { name: /toggle theme/i }),
    ).toBeInTheDocument();
  });

  it("toggles the dark class on the document", async () => {
    const user = userEvent.setup();
    renderToggle();
    const button = screen.getByRole("button", { name: /toggle theme/i });

    await user.click(button);
    await waitFor(() => expect(document.documentElement).toHaveClass("dark"));

    await user.click(button);
    await waitFor(() =>
      expect(document.documentElement).not.toHaveClass("dark"),
    );
  });
});
