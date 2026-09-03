import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Sidebar, ThemeToggle, THEME_INIT_SCRIPT, isActivePath, AppShell, Topbar } from "./index.js";
vi.mock("next/link", () => ({ default: ({ href, children, ...rest }: any) => <a href={href} {...rest}>{children}</a> }));
vi.mock("next/navigation", () => ({ usePathname: () => "/dashboard/import" }));

describe("isActivePath", () => {
  it("exact richiede uguaglianza; altrimenti prefisso con /", () => {
    expect(isActivePath("/dashboard", "/dashboard", true)).toBe(true);
    expect(isActivePath("/dashboard/import", "/dashboard", true)).toBe(false);
    expect(isActivePath("/dashboard/import/42", "/dashboard/import")).toBe(true);
    expect(isActivePath("/dashboard/importa", "/dashboard/import")).toBe(false);
  });
});

describe("Sidebar", () => {
  const sections = [
    { label: "Flusso", items: [{ label: "Schede", href: "/dashboard", icon: "cards" as const, exact: true }, { label: "Importa", href: "/dashboard/import", icon: "upload" as const, badge: 3 }] },
  ];
  it("voci, sezione, badge e aria-current sulla voce attiva", () => {
    render(<Sidebar logo={<span>LOGO</span>} sections={sections} pathname="/dashboard/import" footer={<span>piede</span>} />);
    expect(screen.getByText("LOGO")).toBeInTheDocument();
    expect(screen.getByText("Flusso")).toHaveClass("eyebrow");
    const importa = screen.getByText("Importa").closest("a")!;
    expect(importa).toHaveAttribute("aria-current", "page");
    expect(importa).toHaveClass("glass");
    expect(screen.getByText("Schede").closest("a")).not.toHaveAttribute("aria-current");
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("piede")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Flusso" })).toBeInTheDocument();
  });

  const soloVoci = [{ items: [{ label: "Panoramica", href: "/app", icon: "overview" as const, exact: true }] }];

  it("con una sola sezione senza titolo il <nav> è la colonna: nessun contenitore intermedio", () => {
    const { container } = render(<Sidebar logo={<span>L</span>} sections={soloVoci} pathname="/app" />);
    const nav = screen.getByRole("navigation");
    expect(nav.className).toBe("relative mt-9 flex flex-1 flex-col gap-1");
    // il <nav> è fratello del logo, non nipote
    expect(nav.previousElementSibling!.tagName).toBe("A");
    expect(container.querySelector(".gap-5")).toBeNull();
  });

  it("con più sezioni il contenitore le distanzia e ogni <nav> resta una lista", () => {
    const { container } = render(
      <Sidebar
        logo={<span>L</span>}
        pathname="/app"
        sections={[soloVoci[0], { label: "Altro", items: [{ label: "Impostazioni", href: "/app/impostazioni", icon: "gear" as const }] }]}
      />,
    );
    const wrapper = container.querySelector("div.gap-5")!;
    expect(wrapper.className).toBe("relative mt-9 flex flex-1 flex-col gap-5");
    const navs = screen.getAllByRole("navigation");
    expect(navs).toHaveLength(2);
    for (const nav of navs) expect(nav.className).toBe("flex flex-col gap-1");
  });
});

describe("ThemeToggle", () => {
  beforeEach(() => { document.documentElement.classList.remove("dark"); localStorage.clear(); });
  it("commuta la classe dark su <html> e persiste in localStorage['theme']", async () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button", { name: /tema scuro/i });
    await userEvent.click(btn);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
    await userEvent.click(screen.getByRole("button", { name: /tema chiaro/i }));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });
  it("lo script di init legge la stessa chiave e classe", () => {
    expect(THEME_INIT_SCRIPT).toContain("localStorage.getItem('theme')==='dark'");
    expect(THEME_INIT_SCRIPT).toContain("classList.add('dark')");
  });
});

describe("AppShell", () => {
  it("compone sidebar, topbar e contenuto; usePathname quando pathname manca", () => {
    render(
      <AppShell
        sidebar={{ logo: <span>L</span>, sections: [{ items: [{ label: "Importa", href: "/dashboard/import", icon: "upload" }] }] }}
        topbar={{ search: <input aria-label="Cerca" />, actions: <button>azione</button> }}
      >
        <p>contenuto</p>
      </AppShell>,
    );
    expect(screen.getByText("Importa").closest("a")).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByLabelText("Cerca")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("contenuto");
  });
  it("Topbar senza slot rende comunque un header", () => {
    render(<Topbar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
  it("Topbar mette search e actions come figli diretti dell'header", () => {
    render(<Topbar search={<input aria-label="Cerca" className="relative flex-1" />} actions={<button>azione</button>} />);
    const header = screen.getByRole("banner");
    expect(screen.getByLabelText("Cerca").parentElement).toBe(header);
    expect(screen.getByRole("button", { name: "azione" }).parentElement).toBe(header);
  });
});
