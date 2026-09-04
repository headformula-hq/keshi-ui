import { render, screen } from "@testing-library/react";
import { Stat } from "../index.js";

describe("Stat", () => {
  it("tile §2.5: Card p-4, label eyebrow !text-[9px], valore tnum serif 22 con data-testid, caption 11px", () => {
    const { container } = render(<Stat label="Schede pronte" value="12" caption="su 40 importate" testId="stat-pronte" />);
    expect(container.firstChild).toHaveClass("card", "card-static", "p-4");
    expect(screen.getByText("Schede pronte")).toHaveClass("eyebrow", "!text-[9px]");
    const value = screen.getByTestId("stat-pronte");
    expect(value).toHaveTextContent("12");
    expect(value).toHaveClass("tnum", "mt-2", "font-serif", "text-[22px]", "font-semibold", "text-ink");
    expect(screen.getByText("su 40 importate")).toHaveClass("mt-1", "text-[11px]", "text-muted2");
  });

  it("senza caption rende due righe; senza testId nessun data-testid", () => {
    const { container } = render(<Stat label="A" value={3} />);
    expect(container.querySelectorAll(":scope > div > div")).toHaveLength(2);
    expect(container.querySelector("[data-testid]")).toBeNull();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("tone up/down colora il valore; neutral (default) resta text-ink", () => {
    const { rerender } = render(<Stat label="Δ" value="+3%" tone="up" testId="v" />);
    expect(screen.getByTestId("v")).toHaveClass("text-up");
    expect(screen.getByTestId("v")).not.toHaveClass("text-ink");
    rerender(<Stat label="Δ" value="-3%" tone="down" testId="v" />);
    expect(screen.getByTestId("v")).toHaveClass("text-down");
    rerender(<Stat label="Δ" value="0" testId="v" />);
    expect(screen.getByTestId("v")).toHaveClass("text-ink");
  });

  it("className e style (animationDelay per .rise) passano alla Card", () => {
    const { container } = render(<Stat label="A" value="1" className="rise" style={{ animationDelay: "120ms" }} />);
    expect(container.firstChild).toHaveClass("rise", "p-4", "card");
    expect(container.firstChild).toHaveStyle({ animationDelay: "120ms" });
  });

  it("value e caption accettano ReactNode", () => {
    render(<Stat label="Prezzo" value={<><span>€</span> 1.240</>} caption={<em>medio</em>} />);
    expect(screen.getByText("€")).toBeInTheDocument();
    expect(screen.getByText("medio").tagName).toBe("EM");
  });
});
