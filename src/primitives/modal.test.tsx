import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal, Button } from "../index.js";

function harness(open: boolean, withFooter = true) {
  return (
    <>
      <button type="button">apri</button>
      <Modal
        open={open}
        onClose={() => {}}
        title="Conferma scarto"
        footer={withFooter ? <><Button variant="secondary">Annulla</Button><Button variant="danger">Scarta</Button></> : undefined}
      >
        Vuoi scartare la scheda?
      </Modal>
    </>
  );
}

describe("Modal: focus e scroll-lock", () => {
  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("all'apertura porta il focus sul primo focalizzabile del footer e blocca lo scroll del body", () => {
    const { rerender } = render(harness(false));
    const trigger = screen.getByRole("button", { name: "apri" });
    trigger.focus();
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe("");
    rerender(harness(true));
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Annulla" }));
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("alla chiusura ripristina il focus sull'elemento precedente e l'overflow del body", () => {
    const { rerender } = render(harness(false));
    const trigger = screen.getByRole("button", { name: "apri" });
    trigger.focus();
    rerender(harness(true));
    expect(document.activeElement).not.toBe(trigger);
    rerender(harness(false));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe("");
  });

  it("senza footer il focus va sulla card del dialog (tabIndex=-1)", () => {
    render(harness(true, false));
    const dialog = screen.getByRole("dialog", { name: "Conferma scarto" });
    expect(dialog).toHaveAttribute("tabindex", "-1");
    expect(document.activeElement).toBe(dialog);
  });

  it("ignora i bottoni disabilitati del footer", () => {
    render(
      <Modal open onClose={() => {}} title="T" footer={<><Button disabled>No</Button><Button>Sì</Button></>}>
        x
      </Modal>,
    );
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Sì" }));
  });

  it("smontaggio con open=true ripristina comunque overflow e focus", () => {
    const trigger = document.createElement("button");
    document.body.appendChild(trigger);
    trigger.focus();
    const { unmount } = render(harness(true));
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("");
    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });

  it("il resto del markup è quello di v0.1: aria-modal, aria-labelledby, Esc e velo chiudono", async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="T">x</Modal>);
    const dialog = screen.getByRole("dialog", { name: "T" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveClass("card", "pop-in", "relative", "w-full", "max-w-[520px]", "p-6");
    await userEvent.keyboard("{Escape}");
    await userEvent.click(screen.getByTestId("modal-veil"));
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
