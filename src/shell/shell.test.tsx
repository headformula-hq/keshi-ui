import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Sidebar, ThemeToggle, THEME_INIT_SCRIPT, isActivePath, AppShell, Topbar } from "./index";
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
});
