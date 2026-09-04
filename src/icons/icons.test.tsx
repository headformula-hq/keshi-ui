import { render } from "@testing-library/react";
import * as icons from "./index.js";

const NAMES = ["Logo", "KeshiLogo", "Sun", "Moon", "Overview", "Materials", "Tag", "Swap", "Bell", "Close", "Check", "Search", "ChevronDown", "ArrowUpRight", "TrendArrow", "Gear", "Upload", "Cards", "Send", "Trash", "Shield", "Logout", "Image", "Plus", "Pencil", "ChevronLeft", "ChevronRight", "ExternalLink", "Sparkle", "Grip", "Refresh", "Warning", "Info"] as const;

describe("icons", () => {
  it.each(NAMES)("%s renderizza un <svg> con stroke currentColor e dimensione di default", (name) => {
    const Icon = icons[name] as (p: icons.IconProps) => React.JSX.Element;
    const { container } = render(<Icon />);
    const svg = container.querySelector("svg")!;
    expect(svg).toBeInTheDocument();
    if (name !== "KeshiLogo") {
      expect(svg.getAttribute("width")).toBe(name === "TrendArrow" ? "12" : "18");
      expect(svg.getAttribute("stroke")).toBe("currentColor");
    }
  });
  it("le props sovrascrivono i default", () => {
    const { container } = render(<icons.Sun width={32} height={32} />);
    expect(container.querySelector("svg")!.getAttribute("width")).toBe("32");
  });
});
