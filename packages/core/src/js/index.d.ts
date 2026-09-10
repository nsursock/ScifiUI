declare module "@scifiui/core/js" {
  export function initDropdowns(root?: ParentNode | Document): void;
  export function initTreeView(root?: ParentNode | Document): void;
  export function createToaster(container: Element): {
    info: (msg: string, opts?: object) => HTMLElement;
    success: (msg: string, opts?: object) => HTMLElement;
    warning: (msg: string, opts?: object) => HTMLElement;
    error: (msg: string, opts?: object) => HTMLElement;
    push: (msg: string, opts?: object) => HTMLElement;
  };

  /** GSAP stagger for `[data-enter]` under root. No-ops when perf-lite / reduced-motion. */
  export function enterShell(root: HTMLElement): unknown;
  /** Landing / launcher intro for hero + console surfaces. */
  export function playLandingIntro(root: HTMLElement): unknown;
  export function typewriter(
    text: string,
    onTick: (slice: string) => void,
    onDone: () => void,
    charMs?: number,
  ): unknown;
  export function countUp<T extends Record<string, number>>(
    targets: T,
    onTick: (values: T) => void,
  ): unknown;
  export function pulseConsole(el: HTMLElement | null): Promise<void>;
  /** Re-export of the GSAP package for advanced consumers. */
  export const gsap: typeof import("gsap").default;
}
