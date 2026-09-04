import { render, act } from "@testing-library/react";
import { ShaderBackground } from "./index.js";

// jsdom non ha WebGL: un contesto finto in cui ogni costante è un numero, ogni
// metodo una no-op, e contiamo i drawArrays (= fotogrammi disegnati).
type Calls = { drawArrays: number };
function fakeGl(): { gl: WebGLRenderingContext; calls: Calls } {
  const calls: Calls = { drawArrays: 0 };
  const gl = new Proxy({} as Record<PropertyKey, unknown>, {
    get(_target, key) {
      if (key === "drawArrays") return () => { calls.drawArrays += 1; };
      if (key === "getShaderParameter" || key === "getProgramParameter") return () => true;
      if (key === "getAttribLocation") return () => 0;
      if (key === "getUniformLocation") return () => ({});
      if (typeof key === "string" && /^[A-Z][A-Z0-9_]*$/.test(key)) return 1; // TRIANGLE_STRIP, FLOAT, …
      return () => ({});
    },
  }) as unknown as WebGLRenderingContext;
  return { gl, calls };
}

const originalGetContext = HTMLCanvasElement.prototype.getContext;
let rafCallbacks: FrameRequestCallback[] = [];
let rafId = 0;
const raf = vi.fn((cb: FrameRequestCallback) => { rafCallbacks.push(cb); return ++rafId; });
const caf = vi.fn((_id: number) => {});

function installMatchMedia(reduce: boolean) {
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    matches: reduce, media: "(prefers-reduced-motion: reduce)", onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  })));
}
function setHidden(hidden: boolean) {
  Object.defineProperty(document, "hidden", { configurable: true, get: () => hidden });
}
function mountWithGl() {
  const { gl, calls } = fakeGl();
  HTMLCanvasElement.prototype.getContext = (() => gl) as unknown as typeof HTMLCanvasElement.prototype.getContext;
  const utils = render(<ShaderBackground />);
  return { calls, ...utils };
}

beforeEach(() => {
  rafCallbacks = [];
  rafId = 0;
  raf.mockClear();
  caf.mockClear();
  vi.stubGlobal("requestAnimationFrame", raf);
  vi.stubGlobal("cancelAnimationFrame", caf);
});
afterEach(() => {
  vi.unstubAllGlobals();
  HTMLCanvasElement.prototype.getContext = originalGetContext;
  delete (document as { hidden?: boolean }).hidden;
  document.documentElement.classList.remove("dark");
});

describe("ShaderBackground", () => {
  it("con prefers-reduced-motion disegna un solo fotogramma e non avvia il loop; ridisegna una volta al cambio tema", async () => {
    installMatchMedia(true);
    const { calls } = mountWithGl();
    expect(calls.drawArrays).toBe(1);
    expect(raf).not.toHaveBeenCalled();
    await act(async () => {
      document.documentElement.classList.add("dark");
      await new Promise((r) => setTimeout(r, 0)); // il MutationObserver notifica in un microtask
    });
    expect(calls.drawArrays).toBe(2);
    expect(raf).not.toHaveBeenCalled();
  });

  it("senza reduced-motion avvia il loop rAF, si ferma a documento nascosto e riparte quando torna visibile", () => {
    installMatchMedia(false);
    const { calls } = mountWithGl();
    expect(calls.drawArrays).toBe(1);
    expect(raf).toHaveBeenCalledTimes(1);
    act(() => { rafCallbacks.shift()!(16); }); // un tick del loop
    expect(calls.drawArrays).toBe(2);
    expect(raf).toHaveBeenCalledTimes(2);
    setHidden(true);
    act(() => { document.dispatchEvent(new Event("visibilitychange")); });
    expect(caf).toHaveBeenCalledWith(2);
    setHidden(false);
    act(() => { document.dispatchEvent(new Event("visibilitychange")); });
    expect(calls.drawArrays).toBe(3);
    expect(raf).toHaveBeenCalledTimes(3);
  });

  it("senza matchMedia (jsdom nudo) il loop parte comunque; lo smontaggio lo cancella", () => {
    const { calls, unmount } = mountWithGl();
    expect(calls.drawArrays).toBe(1);
    unmount();
    expect(caf).toHaveBeenCalledWith(1);
  });
});
