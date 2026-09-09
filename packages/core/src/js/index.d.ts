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
}
