import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "../index.js";

describe("Tabs", () => {
  it("con href: link in un nav con aria-label; aria-current=page solo sull'attiva; count reso come « · 3 »", () => {
    render(
      <Tabs
        ariaLabel="Stato"
        className="mb-6"
        items={[
          { label: "In coda", href: "/dashboard/pubblica?stato=in-coda", count: 3, active: true },
          { label: "Tutti", href: "/dashboard/pubblica" },
          { label: "Pubblicati", href: "/dashboard/pubblica?stato=pubblicati", count: 0 },
        ]}
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Stato" });
    expect(nav).toHaveClass("flex", "items-center", "gap-1", "mb-6");
    const inCoda = screen.getByRole("link", { name: "In coda · 3" });
    expect(inCoda).toHaveAttribute("href", "/dashboard/pubblica?stato=in-coda");
    expect(inCoda).toHaveAttribute("aria-current", "page");
    expect(inCoda).toHaveClass("font-semibold", "text-ink");
    const tutti = screen.getByRole("link", { name: "Tutti" });
    expect(tutti).not.toHaveAttribute("aria-current");
    expect(tutti).toHaveClass("font-medium", "text-muted2");
    expect(tutti).not.toHaveTextContent("·");
    // count 0 è un numero valido: si rende
    expect(screen.getByRole("link", { name: "Pubblicati · 0" })).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("senza href: bottoni type=button con aria-pressed coerente e onClick", async () => {
    const onClick = vi.fn();
    render(
      <Tabs items={[{ label: "1M", active: true }, { label: "1A", onClick }]} />,
    );
    const on = screen.getByRole("button", { name: "1M" });
    expect(on).toHaveAttribute("type", "button");
    expect(on).toHaveAttribute("aria-pressed", "true");
    const off = screen.getByRole("button", { name: "1A" });
    expect(off).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(off);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("senza ariaLabel il nav non ha aria-label", () => {
    render(<Tabs items={[{ label: "A", href: "/a" }]} />);
    expect(screen.getByRole("navigation")).not.toHaveAttribute("aria-label");
  });
});
