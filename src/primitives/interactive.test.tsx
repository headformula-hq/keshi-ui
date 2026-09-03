import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal, ToastProvider, useToast, Button } from "../index.js";

describe("Modal", () => {
  it("chiuso: non rende nulla", () => {
    render(<Modal open={false} onClose={() => {}} title="T">x</Modal>);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
  it("aperto: dialog con titolo, Esc e click sul velo chiudono", async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Conferma">corpo</Modal>);
    const dialog = screen.getByRole("dialog", { name: "Conferma" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
    await userEvent.click(screen.getByTestId("modal-veil"));
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});

function Demo() {
  const { push } = useToast();
  return <Button onClick={() => push({ title: "Salvato", tone: "up" })}>go</Button>;
}

describe("Toast", () => {
  it("push mostra il toast in una region aria-live e lo rimuove dopo 4s", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<ToastProvider><Demo /></ToastProvider>);
    await user.click(screen.getByRole("button", { name: "go" }));
    expect(screen.getByRole("status")).toHaveTextContent("Salvato");
    act(() => { vi.advanceTimersByTime(4100); });
    expect(screen.queryByText("Salvato")).toBeNull();
    vi.useRealTimers();
  });
});
