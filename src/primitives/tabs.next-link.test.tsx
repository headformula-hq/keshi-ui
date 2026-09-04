// Le voci con `href` di Tabs devono passare da `next/link.js` (soft-nav + prefetch
// nell'app ospite), non da un <a> nativo. Qui `next/link.js` è mockato con un
// marcatore: se il marcatore compare sulle voci con href, il rendering passa da Link.
import { render, screen } from "@testing-library/react";
import { Tabs } from "../index.js";

vi.mock("next/link.js", () => ({
  default: ({ href, children, ...rest }: any) => (
    <a href={href} data-next-link="" {...rest}>{children}</a>
  ),
}));

describe("Tabs con href usa next/link", () => {
  it("le voci con href sono rese da Link (con href, aria-current e classi intatti); quelle senza restano bottoni", () => {
    render(
      <Tabs
        ariaLabel="Stato"
        items={[
          { label: "In coda", href: "/dashboard/pubblica?stato=in-coda", count: 3, active: true },
          { label: "Tutti", href: "/dashboard/pubblica" },
          { label: "1M" },
        ]}
      />,
    );
    const inCoda = screen.getByRole("link", { name: "In coda · 3" });
    expect(inCoda).toHaveAttribute("data-next-link");
    expect(inCoda).toHaveAttribute("href", "/dashboard/pubblica?stato=in-coda");
    expect(inCoda).toHaveAttribute("aria-current", "page");
    expect(inCoda).toHaveClass("font-semibold", "text-ink");
    const tutti = screen.getByRole("link", { name: "Tutti" });
    expect(tutti).toHaveAttribute("data-next-link");
    expect(tutti).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("button", { name: "1M" })).not.toHaveAttribute("data-next-link");
  });
});
