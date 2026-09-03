import { describe, it, expect } from "vitest";
import * as ui from "./index";

describe("keshi-ui entrypoint", () => {
  it("espone la versione", () => {
    expect(typeof ui.KESHI_UI_VERSION).toBe("string");
  });
});
