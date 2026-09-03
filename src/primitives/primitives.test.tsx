import { render, screen } from "@testing-library/react";
import { Card, PageHeader, Badge, LiveBadge, Button, Table, Th, Tr, Td, EmptyState, Skeleton, cx } from "../index";

describe("cx", () => {
  it("unisce solo le classi vere", () => {
    expect(cx("a", false, null, undefined, "b")).toBe("a b");
  });
});

describe("Card", () => {
  it("flat di default: classe card + radius token", () => {
    const { container } = render(<Card>x</Card>);
    expect(container.firstChild).toHaveClass("card");
    expect(container.firstChild).not.toHaveClass("glass");
  });
  it("variant glass e hover", () => {
    const { container } = render(<Card variant="glass" hover>x</Card>);
    expect(container.firstChild).toHaveClass("glass", "card-hover");
  });
  it("as=section rende un <section>", () => {
    const { container } = render(<Card as="section">x</Card>);
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});

describe("PageHeader", () => {
  it("titolo serif h1 con parte in corsivo ed eyebrow", () => {
    render(<PageHeader eyebrow="Panoramica" title="Il mercato," italic="in tempo reale." right={<span>dx</span>} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveClass("font-serif");
    expect(h1.querySelector("em")).toHaveTextContent("in tempo reale.");
    expect(screen.getByText("Panoramica")).toHaveClass("eyebrow");
    expect(screen.getByText("dx")).toBeInTheDocument();
  });
});

describe("Badge", () => {
  it.each([["neutral", "bg-surface2"], ["up", "bg-up-soft"], ["down", "bg-down-soft"], ["brand", "bg-brand-soft"], ["gold", "bg-gold-soft"]] as const)(
    "tone %s → %s", (tone, cls) => {
      render(<Badge tone={tone}>b</Badge>);
      expect(screen.getByText("b")).toHaveClass(cls);
    });
});

describe("LiveBadge", () => {
  it("live: testo e pallino animato", () => {
    const { container } = render(<LiveBadge live />);
    expect(screen.getByText("Dati live")).toBeInTheDocument();
    expect(container.querySelector(".animate-ping")).toBeInTheDocument();
  });
  it("demo: etichetta personalizzabile", () => {
    render(<LiveBadge live={false} demoLabel="Bozza" />);
    expect(screen.getByText("Bozza")).toBeInTheDocument();
  });
});

describe("Button", () => {
  it("primary di default, danger su richiesta, inoltra le props", () => {
    render(<Button onClick={() => {}}>Salva</Button>);
    expect(screen.getByRole("button", { name: "Salva" })).toHaveClass("bg-ink");
    render(<Button variant="danger" disabled>Elimina</Button>);
    const del = screen.getByRole("button", { name: "Elimina" });
    expect(del).toHaveClass("text-down");
    expect(del).toBeDisabled();
  });
});

describe("Table", () => {
  it("wrapper scrollabile, header eyebrow, riga hover", () => {
    const { container } = render(
      <Table minWidth={500}>
        <thead><tr><Th>Prodotto</Th></tr></thead>
        <tbody><Tr hover><Td>Anello</Td></Tr></tbody>
      </Table>,
    );
    expect(container.firstChild).toHaveClass("overflow-x-auto");
    expect(container.querySelector("table")).toHaveStyle({ minWidth: "500px" });
    expect(screen.getByText("Prodotto")).toHaveClass("eyebrow");
    expect(screen.getByText("Anello").closest("tr")).toHaveClass("hover:bg-surface2");
  });
});

describe("EmptyState", () => {
  it("titolo, descrizione e azione", () => {
    render(<EmptyState eyebrow="Schede" title="Nessuna scheda" description="Importa un file." action={<button>Importa</button>} />);
    expect(screen.getByRole("heading", { name: "Nessuna scheda" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Importa" })).toBeInTheDocument();
  });
});

describe("Skeleton", () => {
  it("rende N linee con aria-hidden", () => {
    const { container } = render(<Skeleton lines={3} />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll(".animate-pulse").length).toBe(3);
  });
});
