import { render, screen } from "@testing-library/react";
import { Field, Input, Select } from "../index.js";

describe("Field", () => {
  it("label che avvolge il controllo: getByLabelText trova l'Input", () => {
    render(<Field label="Nome"><Input /></Field>);
    const input = screen.getByLabelText("Nome");
    expect(input.tagName).toBe("INPUT");
  });

  it("con htmlFor: label separata via for/id, e l'aria-label del controllo resta leggibile", () => {
    render(
      <Field label="Colonna Costo" htmlFor="col-costo">
        <Select id="col-costo" aria-label="Colonna Costo (fissa per FatturaPA)" disabled defaultValue="a">
          <option value="a">A</option>
        </Select>
      </Field>,
    );
    const viaLabel = screen.getByLabelText("Colonna Costo");
    expect(viaLabel.tagName).toBe("SELECT");
    expect(viaLabel).toBeDisabled();
    expect(screen.getByLabelText("Colonna Costo (fissa per FatturaPA)")).toBe(viaLabel);
    // nessuna label annidata
    expect(screen.getByText("Colonna Costo").closest("label")?.querySelector("select")).toBeNull();
  });

  it("help non entra nel testo della label (match esatto ancora possibile) ed è reso", () => {
    render(<Field label="Tetto mensile di token" help="0 o vuoto = nessun tetto"><Input /></Field>);
    expect(screen.getByLabelText("Tetto mensile di token").tagName).toBe("INPUT");
    expect(screen.getByText("0 o vuoto = nessun tetto")).toBeInTheDocument();
  });

  it("error ha role=alert; senza error nessun alert", () => {
    const { rerender } = render(<Field label="Nome" error="Campo obbligatorio"><Input /></Field>);
    expect(screen.getByRole("alert")).toHaveTextContent("Campo obbligatorio");
    expect(screen.getByLabelText("Nome").tagName).toBe("INPUT");
    rerender(<Field label="Nome" error={null}><Input /></Field>);
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("className si appende al wrapper, che porta la ricetta §2.10", () => {
    const { container } = render(<Field label="Nome" className="mt-2"><Input /></Field>);
    expect(container.firstChild).toHaveClass("flex", "flex-col", "gap-1", "text-[12px]", "text-muted", "mt-2");
  });
});
