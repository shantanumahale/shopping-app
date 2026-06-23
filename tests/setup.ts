/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import React from "react";

afterEach(() => cleanup());

// next/image -> plain <img> (jsdom doesn't understand Next's image props).
vi.mock("next/image", () => ({
  default: (props: any) =>
    React.createElement("img", {
      src: typeof props.src === "string" ? props.src : (props.src?.src ?? ""),
      alt: props.alt ?? "",
    }),
}));

// matchMedia — required by next-themes.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverMock as any;

// Controllable IntersectionObserver — tests trigger `.instances` to simulate scroll.
class IntersectionObserverMock {
  static instances: IntersectionObserverMock[] = [];
  cb: IntersectionObserverCallback;
  elements = new Set<Element>();
  constructor(cb: IntersectionObserverCallback) {
    this.cb = cb;
    IntersectionObserverMock.instances.push(this);
  }
  observe(el: Element) {
    this.elements.add(el);
  }
  unobserve(el: Element) {
    this.elements.delete(el);
  }
  disconnect() {
    this.elements.clear();
  }
  takeRecords() {
    return [];
  }
  trigger(isIntersecting = true) {
    this.cb(
      [...this.elements].map(
        (target) => ({ isIntersecting, target }) as IntersectionObserverEntry,
      ),
      this as any,
    );
  }
}
globalThis.IntersectionObserver = IntersectionObserverMock as any;
(globalThis as any).IntersectionObserverMock = IntersectionObserverMock;

// jsdom lacks these — Radix Dialog/Sheet relies on them.
const proto = Element.prototype as any;
proto.hasPointerCapture ??= () => false;
proto.setPointerCapture ??= () => {};
proto.releasePointerCapture ??= () => {};
proto.scrollIntoView ??= () => {};
