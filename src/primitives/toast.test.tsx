import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider, useToast, Button } from "../index.js";

function Demo() {
  const { push } = useToast();
  return (
    <>
      <Button onClick={() => push({ title: "Salvato", tone: "up" })}>semplice</Button>
      <Button
        onClick={() =>
          push({
            title: "Pubblicato",
            description: "Anello Aurora",
            tone: "up",
            action: { label: "Vedi su Shopify", href: "https://shop.example/admin/products/1" },
          })
        }
      >
        con-link
      </Button>
    </>
  );
}

describe("Toast con action", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("rende un link esterno con target _blank, rel noopener noreferrer e icona decorativa", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<ToastProvider><Demo /></ToastProvider>);
    await user.click(screen.getByRole("button", { name: "con-link" }));
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Pubblicato");
    expect(status).toHaveTextContent("Anello Aurora");
    const link = screen.getByRole("link", { name: "Vedi su Shopify" });
    expect(link).toHaveAttribute("href", "https://shop.example/admin/products/1");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveClass("mt-1", "inline-flex", "items-center", "gap-1", "text-[12px]", "font-medium", "text-brand", "hover:underline");
    const icon = link.querySelector("svg");
    expect(icon).not.toBeNull();
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).toHaveAttribute("width", "11");
  });

  it("senza action nessun link", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<ToastProvider><Demo /></ToastProvider>);
    await user.click(screen.getByRole("button", { name: "semplice" }));
    expect(screen.getByRole("status")).toHaveTextContent("Salvato");
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("TTL: senza action sparisce dopo 4 s, con action dopo 6 s", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<ToastProvider><Demo /></ToastProvider>);
    await user.click(screen.getByRole("button", { name: "semplice" }));
    await user.click(screen.getByRole("button", { name: "con-link" }));
    expect(screen.getAllByRole("status")).toHaveLength(2);
    act(() => { vi.advanceTimersByTime(4100); });
    expect(screen.queryByText("Salvato")).toBeNull();
    expect(screen.getByText("Pubblicato")).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.queryByText("Pubblicato")).toBeNull();
  });
});
