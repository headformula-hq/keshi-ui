import { render, screen } from "@testing-library/react";
import { ProgressBar } from "../index.js";

describe("ProgressBar", () => {
  it("role=progressbar con aria-label, valori 0-100 e larghezza in percentuale (§2.14)", () => {
    render(<ProgressBar value={42} label="Avanzamento import" />);
    const bar = screen.getByRole("progressbar", { name: "Avanzamento import" });
    expect(bar).toHaveAttribute("aria-valuenow", "42");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveClass("h-1.5", "w-full", "overflow-hidden", "rounded-full", "bg-surface2");
    const fill = bar.firstElementChild as HTMLElement;
    expect(fill).toHaveClass("h-full", "rounded-full", "transition-[width]", "duration-500", "bg-brand");
    expect(fill).toHaveStyle({ width: "42%" });
  });

  it("clamp: 150 → 100, -3 → 0; arrotonda 33.6 → 34; NaN → 0", () => {
    const { rerender } = render(<ProgressBar value={150} label="x" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
    expect(screen.getByRole("progressbar").firstElementChild).toHaveStyle({ width: "100%" });
    rerender(<ProgressBar value={-3} label="x" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
    expect(screen.getByRole("progressbar").firstElementChild).toHaveStyle({ width: "0%" });
    rerender(<ProgressBar value={33.6} label="x" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "34");
    rerender(<ProgressBar value={Number.NaN} label="x" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("tone colora il riempimento; className si appende alla traccia", () => {
    const { rerender } = render(<ProgressBar value={10} label="x" tone="up" className="mt-2" />);
    expect(screen.getByRole("progressbar")).toHaveClass("mt-2");
    expect(screen.getByRole("progressbar").firstElementChild).toHaveClass("bg-up");
    rerender(<ProgressBar value={10} label="x" tone="gold" />);
    expect(screen.getByRole("progressbar").firstElementChild).toHaveClass("bg-gold");
    rerender(<ProgressBar value={10} label="x" tone="down" />);
    expect(screen.getByRole("progressbar").firstElementChild).toHaveClass("bg-down");
    expect(screen.getByRole("progressbar").firstElementChild).not.toHaveClass("bg-brand");
  });
});
