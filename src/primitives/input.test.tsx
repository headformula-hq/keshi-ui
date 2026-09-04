import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input, Select, Textarea, FIELD_CLASS } from "../index.js";

describe("FIELD_CLASS", () => {
  it("è la ricetta §2.10 senza dark: né colori grezzi", () => {
    expect(FIELD_CLASS).toBe(
      "rounded-xl border border-line/60 bg-transparent p-2.5 text-[13.5px] text-ink outline-none focus:border-brand/50 disabled:opacity-50",
    );
    expect(FIELD_CLASS).not.toMatch(/dark:|#[0-9a-fA-F]{3}/);
  });
});

describe("Input", () => {
  it("propaga className, disabled, value/onChange", async () => {
    const onChange = vi.fn();
    render(<Input aria-label="Nome" className="w-32" value="x" onChange={onChange} />);
    const el = screen.getByLabelText("Nome") as HTMLInputElement;
    expect(el).toHaveClass("rounded-xl", "border-line/60", "bg-transparent", "w-32");
    expect(el).toHaveValue("x");
    await userEvent.type(el, "y");
    expect(onChange).toHaveBeenCalled();
    render(<Input aria-label="Bloccato" disabled />);
    expect(screen.getByLabelText("Bloccato")).toBeDisabled();
  });

  it("inoltra gli attributi nativi (type, placeholder, name, inputMode)", () => {
    render(<Input aria-label="URL" type="url" name="url" placeholder="https://" inputMode="url" />);
    const el = screen.getByLabelText("URL");
    expect(el).toHaveAttribute("type", "url");
    expect(el).toHaveAttribute("name", "url");
    expect(el).toHaveAttribute("placeholder", "https://");
    expect(el).toHaveAttribute("inputmode", "url");
  });
});

describe("Select", () => {
  it("propaga className, disabled, value/onChange", async () => {
    const onChange = vi.fn();
    render(
      <Select aria-label="Ruolo" className="min-w-40" value="b" onChange={onChange}>
        <option value="a">A</option>
        <option value="b">B</option>
      </Select>,
    );
    const el = screen.getByLabelText("Ruolo") as HTMLSelectElement;
    expect(el).toHaveClass("rounded-xl", "min-w-40");
    expect(el).toHaveValue("b");
    await userEvent.selectOptions(el, "a");
    expect(onChange).toHaveBeenCalledTimes(1);
    render(<Select aria-label="Fisso" disabled defaultValue="x"><option value="x">X</option></Select>);
    expect(screen.getByLabelText("Fisso")).toBeDisabled();
  });
});

describe("Textarea", () => {
  it("propaga className, disabled, value/onChange e aggiunge min-h/resize", async () => {
    const onChange = vi.fn();
    render(<Textarea aria-label="Nota" className="extra" rows={4} value="ciao" onChange={onChange} />);
    const el = screen.getByLabelText("Nota") as HTMLTextAreaElement;
    expect(el).toHaveClass("rounded-xl", "min-h-[120px]", "leading-relaxed", "resize-y", "extra");
    expect(el).toHaveAttribute("rows", "4");
    expect(el).toHaveValue("ciao");
    await userEvent.type(el, "!");
    expect(onChange).toHaveBeenCalled();
    render(<Textarea aria-label="Bloccata" disabled />);
    expect(screen.getByLabelText("Bloccata")).toBeDisabled();
  });
});
