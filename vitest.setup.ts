import "@testing-library/jest-dom/vitest";

// Node 22+ espone un globalThis.localStorage sperimentale che vince su quello
// di jsdom (vitest non lo sovrascrive perché non è nella sua whitelist di
// chiavi "window"), risultando undefined senza --localstorage-file. Rimappiamo
// esplicitamente su window.localStorage/sessionStorage di jsdom.
const jsdomWindow = (globalThis as { jsdom?: { window: Window } }).jsdom?.window;
if (jsdomWindow) {
  Object.defineProperty(globalThis, "localStorage", { get: () => jsdomWindow.localStorage, configurable: true });
  Object.defineProperty(globalThis, "sessionStorage", { get: () => jsdomWindow.sessionStorage, configurable: true });
}
