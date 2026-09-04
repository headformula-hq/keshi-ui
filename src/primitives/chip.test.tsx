import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip } from "../index.js";

describe("Chip", () => {
  it("bottone type=button con aria-pressed=true e chip-active quando active; onClick chiamato", async () => {
    const onClick = vi.fn();
    render(<Chip active onClick={onClick}>Tutti</Chip>);
    const b = screen.getByRole("button", { name: "Tutti" });
    expect(b).toHaveAttribute("type", "button");
    expect(b).toHaveAttribute("aria-pressed", "true");
    expect(b).toHaveClass("chip", "chip-active");
    await userEvent.click(b);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("non attiva: aria-pressed=false, solo .chip; className appesa", () => {
    render(<Chip className="ml-2">Pandora</Chip>);
    const b = screen.getByRole("button", { name: "Pandora" });
    expect(b).toHaveAttribute("aria-pressed", "false");
    expect(b).toHaveClass("chip", "ml-2");
    expect(b).not.toHaveClass("chip-active");
  });

  it("disabled: disabilitato e onClick non chiamato", async () => {
    const onClick = vi.fn();
    render(<Chip disabled onClick={onClick}>Bloccata</Chip>);
    const b = screen.getByRole("button", { name: "Bloccata" });
    expect(b).toBeDisabled();
    await userEvent.click(b);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("as=span: nessun aria-pressed, ospita un bottone Rimuovi interno (§3.5)", async () => {
    const onRemove = vi.fn();
    const { container } = render(
      <Chip as="span" active className="gap-1.5">
        Oro bianco
        <button type="button" aria-label="Rimuovi" onClick={onRemove}>x</button>
      </Chip>,
    );
    const span = container.querySelector("span.chip") as HTMLElement;
    expect(span).not.toBeNull();
    expect(span).toHaveClass("chip-active", "gap-1.5");
    expect(span).not.toHaveAttribute("aria-pressed");
    expect(span).toHaveTextContent("Oro bianco");
    expect(screen.getAllByRole("button")).toHaveLength(1); // solo "Rimuovi"
    await userEvent.click(screen.getByRole("button", { name: "Rimuovi" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
