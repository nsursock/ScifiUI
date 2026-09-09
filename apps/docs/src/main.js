import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/jetbrains-mono/800.css";
import "@tabler/icons-webfont/dist/tabler-icons.min.css";
import { initDropdowns, initTreeView, createToaster } from "@scifiui/core/js";
import "./styles.css";

const THEMES = [
  ["retrowave", "Retrowave"],
  ["ghibli", "Ghibli"],
  ["fiesta", "Fiesta"],
  ["dawn", "Dawn"],
  ["synthwave84", "Synthwave '84"],
  ["solarizedDark", "Solarized Dark"],
  ["cottonCandy", "Cotton Candy"],
  ["goldenTwilight", "Golden Twilight"],
  ["brightContrasts", "Bright Contrasts"],
];

const TOKENS = [
  "--scifi-bg",
  "--scifi-primary",
  "--scifi-secondary",
  "--scifi-cyan",
  "--scifi-text",
  "--scifi-muted",
  "--scifi-success",
  "--scifi-warning",
  "--scifi-error",
  "--scifi-border",
  "--scifi-radius",
  "--scifi-glow",
];

function section(title, body) {
  return `
    <section class="mb-12">
      <h2 class="pane-title mb-4"><span class="pane-title-bar"></span>${title}</h2>
      ${body}
    </section>`;
}

const app = document.querySelector("#app");

app.innerHTML = `
  <div id="toasts" class="toast toast-top toast-end" aria-live="polite"></div>

  <header class="app-bar sticky top-0">
    <div class="flex items-center gap-3">
      <span class="brand-mark text-lg">ScifiUI</span>
      <span class="badge badge-primary">v0.1</span>
      <span class="status-chip"><span class="dot"></span> online</span>
    </div>
    <div class="flex items-center gap-2">
      <label class="label-kicker mr-1" for="theme">Theme</label>
      <select id="theme" class="select w-auto min-w-[11rem] py-1.5">
        ${THEMES.map(([id, label]) => `<option value="${id}">${label}</option>`).join("")}
      </select>
      <button type="button" id="perf" class="btn btn-ghost btn-sm" title="Toggle perf-lite">Perf</button>
    </div>
  </header>

  <main class="relative mx-auto max-w-5xl px-4 py-10">
    <div class="relative mb-14 overflow-hidden rounded-xl border border-[var(--scifi-border)] p-8">
      <div class="grid-floor opacity-60"></div>
      <div class="vignette"></div>
      <div class="relative z-10">
        <p class="label-kicker neon-flicker text-scifi-primary mb-3">Adaan-styled class kit</p>
        <h1 class="hero-title hero-title-glitch text-4xl md:text-5xl font-extrabold tracking-tight mb-3" data-text="ScifiUI">ScifiUI</h1>
        <p class="text-scifi-muted max-w-xl text-sm mb-6">
          daisyUI-style components driven by <code class="text-scifi-cyan">--scifi-*</code> CSS variables.
          Works with React, Vue, Svelte, Alpine, or plain HTML.
        </p>
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="feature-pill">Glass panes</span>
          <span class="feature-pill">Corner brackets</span>
          <span class="feature-pill">9 themes</span>
          <span class="feature-pill">Tailwind v4</span>
        </div>
        <pre class="glass rounded-lg p-3 text-xs overflow-x-auto text-scifi-muted"><code>@import "tailwindcss";
@plugin "@scifiui/core";
@import "@scifiui/core/index.css";</code></pre>
      </div>
    </div>

    ${section(
      "Buttons",
      `<div class="flex flex-wrap gap-3 items-center">
        <button class="btn">Default</button>
        <button class="btn btn-primary">Primary</button>
        <button class="btn btn-ghost">Ghost</button>
        <button class="btn btn-danger">Danger</button>
        <button class="btn btn-sm">Small</button>
        <button class="btn btn-xs">XS</button>
        <button class="btn-cta">CTA Launch</button>
        <button class="icon-btn" aria-label="icon"><i class="ti ti-diamond"></i></button>
        <button class="icon-btn active" aria-label="active"><i class="ti ti-circle-filled"></i></button>
      </div>`
    )}

    ${section(
      "Surfaces",
      `<div class="grid md:grid-cols-2 gap-4">
        <div class="pane pane-bracketed">
          <div class="pane-header"><span class="pane-title"><span class="pane-title-bar"></span> Pane</span></div>
          <div class="pane-scan"></div>
          <div class="p-4 text-sm text-scifi-muted">Bracketed glass pane with scan hairline.</div>
        </div>
        <div class="console-panel p-6">
          <div class="scan-line"></div>
          <p class="label-kicker mb-2">Console panel</p>
          <p class="text-sm">Landing-shell surface with corner brackets.</p>
        </div>
        <div class="metric-card">
          <div class="card-head">
            <div class="card-label"><span class="label-bar"></span> Throughput</div>
          </div>
          <div class="card-value">12.4k</div>
        </div>
        <div class="glass rounded-xl p-4">
          <p class="label-kicker mb-2">.glass</p>
          <p class="text-sm text-scifi-muted">Backdrop-blur surface utility.</p>
        </div>
      </div>`
    )}

    ${section(
      "Forms",
      `<div class="grid md:grid-cols-2 gap-4 max-w-2xl">
        <label class="block"><span class="label-kicker block mb-1">Input</span><input class="input" placeholder="callsign…" /></label>
        <label class="block"><span class="label-kicker block mb-1">Select</span>
          <select class="select"><option>Alpha</option><option>Bravo</option></select>
        </label>
        <label class="block md:col-span-2"><span class="label-kicker block mb-1">Textarea</span><textarea class="textarea" rows="3" placeholder="mission brief…"></textarea></label>
        <label class="flex items-center gap-2 text-sm"><input type="checkbox" class="checkbox" checked /> Enable glow</label>
        <label class="flex items-center gap-2 text-sm"><input type="checkbox" class="toggle" checked /> Autopilot</label>
        <label class="flex items-center gap-2 text-sm"><input type="radio" class="radio" name="band" checked /> Band A</label>
        <label class="flex items-center gap-2 text-sm"><input type="radio" class="radio" name="band" /> Band B</label>
        <label class="block md:col-span-2"><span class="label-kicker block mb-1">Range</span><input type="range" class="range" min="0" max="100" value="62" /></label>
        <label class="block md:col-span-2"><span class="label-kicker block mb-1">File</span><input type="file" class="file-input" /></label>
        <fieldset class="fieldset md:col-span-2">
          <legend class="fieldset-legend">Auth pin</legend>
          <div class="pin-input">
            <input class="input" maxlength="1" value="7" aria-label="Digit 1" />
            <input class="input" maxlength="1" value="3" aria-label="Digit 2" />
            <input class="input" maxlength="1" value="9" aria-label="Digit 3" />
            <input class="input" maxlength="1" value="1" aria-label="Digit 4" />
          </div>
          <div class="label"><span class="label-text">Access code</span><span class="label-text-alt">4 digits</span></div>
        </fieldset>
      </div>`
    )}

    ${section(
      "Feedback",
      `<div class="flex flex-wrap gap-2 mb-4">
        <span class="badge">Default</span>
        <span class="badge badge-primary">Primary</span>
        <span class="badge badge-success">Ok</span>
        <span class="badge badge-warning">Warn</span>
        <span class="badge badge-error">Err</span>
        <span class="status-chip"><span class="dot"></span> Linked</span>
      </div>
      <div class="space-y-3">
        <div class="alert alert-info">Info channel open — neon cyan border.</div>
        <div class="alert alert-success">Payload accepted.</div>
        <div class="alert alert-warning">Thermal warning on rail 3.</div>
        <div class="alert alert-error">Handshake failed.</div>
      </div>`
    )}

    ${section(
      "Nav / chrome",
      `<div class="pane overflow-hidden mb-4">
        <div class="tab-bar">
          <button class="tab active">Overview</button>
          <button class="tab">Telemetry</button>
          <button class="tab">Logs</button>
        </div>
        <div class="p-4 text-sm text-scifi-muted">Tab bar content region.</div>
      </div>
      <div class="flex gap-0 border border-[var(--scifi-border)] rounded-lg overflow-hidden w-fit">
        <div class="mode-rail py-2">
          <span class="tooltip tooltip-right" data-tip="Home"><button class="icon-btn active" title="Home"><i class="ti ti-home"></i></button></span>
          <span class="tooltip tooltip-right" data-tip="Stats"><button class="icon-btn" title="Stats"><i class="ti ti-chart-bar"></i></button></span>
          <span class="tooltip tooltip-right" data-tip="Settings"><button class="icon-btn" title="Settings"><i class="ti ti-settings"></i></button></span>
        </div>
        <div class="p-4 text-sm w-48">Mode rail + tooltips</div>
      </div>`
    )}

    ${section(
      "Tree view",
      `<div class="pane max-w-sm">
        <div class="pane-header"><span class="pane-title"><span class="pane-title-bar"></span> Files</span></div>
        <div class="tree-view p-2" role="tree">
          <div class="tree-item open">
            <button type="button" class="tree-row" role="treeitem" aria-selected="false">
              <span class="tree-toggle" aria-expanded="true"><i class="ti ti-chevron-right"></i></span>
              <span class="tree-icon"><i class="ti ti-folder"></i></span>
              <span class="tree-label">src</span>
            </button>
            <div class="tree-children" role="group">
              <div class="tree-item">
                <button type="button" class="tree-row selected" role="treeitem" aria-selected="true">
                  <span class="tree-toggle is-leaf"><i class="ti ti-chevron-right"></i></span>
                  <span class="tree-icon"><i class="ti ti-file"></i></span>
                  <span class="tree-label">main.js</span>
                </button>
              </div>
              <div class="tree-item">
                <button type="button" class="tree-row" role="treeitem" aria-selected="false">
                  <span class="tree-toggle is-leaf"><i class="ti ti-chevron-right"></i></span>
                  <span class="tree-icon"><i class="ti ti-file"></i></span>
                  <span class="tree-label">styles.css</span>
                </button>
              </div>
            </div>
          </div>
          <div class="tree-item">
            <button type="button" class="tree-row" role="treeitem" aria-selected="false">
              <span class="tree-toggle is-leaf"><i class="ti ti-chevron-right"></i></span>
              <span class="tree-icon"><i class="ti ti-file"></i></span>
              <span class="tree-label">README.md</span>
            </button>
          </div>
        </div>
      </div>`
    )}

    ${section(
      "Split / resizer",
      `<div class="split split-row h-40 border border-[var(--scifi-border)] rounded-lg overflow-hidden">
        <div class="split-pane pane flex-[0_0_35%]"><div class="p-3 text-xs text-scifi-muted">Left pane</div></div>
        <button type="button" class="split-resizer" aria-label="Resize"></button>
        <div class="split-pane pane flex-1"><div class="p-3 text-xs text-scifi-muted">Right pane — drag the resizer in your app</div></div>
      </div>`
    )}

    ${section(
      "Dropdown / menu",
      `<div class="dropdown" id="demo-dropdown">
        <button type="button" class="btn btn-primary" data-dropdown-trigger>Actions ▾</button>
        <div class="dropdown-menu">
          <ul class="menu">
            <li class="menu-label">Workspace</li>
            <li><button type="button" class="menu-item">Open folder</button></li>
            <li><button type="button" class="menu-item active">Switch theme</button></li>
            <li><hr class="menu-divider" /></li>
            <li><button type="button" class="menu-item">Settings</button></li>
          </ul>
        </div>
      </div>`
    )}

    ${section(
      "Toast / loading",
      `<div class="flex flex-wrap gap-3 items-center mb-4">
        <button type="button" class="btn btn-sm" id="toast-info">Toast info</button>
        <button type="button" class="btn btn-sm btn-primary" id="toast-ok">Toast success</button>
        <span class="loading" aria-label="Loading"></span>
        <span class="loading-dots" aria-label="Loading"><span></span><span></span><span></span></span>
      </div>
      <div class="space-y-2 max-w-md">
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text" style="width:80%"></div>
      </div>`
    )}

    ${section(
      "Chat bubbles",
      `<div class="chat max-w-lg">
        <div class="chat-row chat-start">
          <div class="chat-avatar">AI</div>
          <div class="chat-bubble chat-bubble-accent">
            <div class="chat-header"><span class="chat-name">Agent</span><span>now</span></div>
            Uplink established. Ready for instructions.
          </div>
        </div>
        <div class="chat-row chat-end">
          <div class="chat-avatar">YOU</div>
          <div class="chat-bubble chat-bubble-primary">
            <div class="chat-header"><span class="chat-name">You</span></div>
            List files in src/ and open main.js.
          </div>
        </div>
      </div>`
    )}

    ${section(
      "Status bar",
      `<div class="status-bar rounded-lg border border-[var(--scifi-border)]">
        <div class="status-bar-section">
          <span class="status-bar-item"><strong>~/project</strong></span>
          <span class="status-chip"><span class="dot"></span> synced</span>
        </div>
        <div class="status-bar-section">
          <span class="status-bar-item">retrowave</span>
          <span class="status-bar-item">Ln 12, Col 4</span>
        </div>
      </div>`
    )}

    ${section(
      "Drawer",
      `<div class="drawer border border-[var(--scifi-border)] rounded-lg overflow-hidden h-48" id="demo-drawer">
        <div class="drawer-side"><div class="drawer-panel p-3 text-xs">Side panel content</div></div>
        <div class="drawer-content p-4">
          <button type="button" class="btn btn-sm btn-primary" id="toggle-drawer">Toggle drawer</button>
          <p class="text-xs text-scifi-muted mt-3">Useful for pickers and mobile nav.</p>
        </div>
      </div>`
    )}

    ${section(
      "Modal",
      `<button class="btn btn-primary" id="open-modal">Open modal</button>
      <div id="modal" class="modal-backdrop hidden" role="dialog" aria-modal="true">
        <div class="modal">
          <h3 class="modal-title">Confirm uplink</h3>
          <p class="modal-body">Establish encrypted channel to the outer rim?</p>
          <div class="modal-actions">
            <button class="btn btn-ghost" id="close-modal">Cancel</button>
            <button class="btn btn-primary" id="close-modal-2">Confirm</button>
          </div>
        </div>
      </div>`
    )}

    ${section(
      "Data display",
      `<div class="space-y-4 max-w-xl mb-6">
        <progress class="progress progress-primary" value="70" max="100"></progress>
        <progress class="progress progress-success" value="40" max="100"></progress>
        <div class="flex flex-wrap gap-4 items-center">
          <div class="radial-progress" style="--value:72" role="progressbar" aria-valuenow="72"><span>72%</span></div>
          <span>Press <kbd class="kbd">⌘</kbd> <kbd class="kbd">K</kbd></span>
          <div class="rating" aria-label="Rating">
            <input type="radio" name="docs-rating" />
            <input type="radio" name="docs-rating" />
            <input type="radio" name="docs-rating" checked />
            <input type="radio" name="docs-rating" />
            <input type="radio" name="docs-rating" />
          </div>
          <label class="swap">
            <input type="checkbox" />
            <span class="swap-on text-scifi-primary"><i class="ti ti-moon-filled"></i></span>
            <span class="swap-off text-scifi-cyan"><i class="ti ti-sun-filled"></i></span>
          </label>
        </div>
        <div class="divider">sector break</div>
        <a class="link" href="#">Uplink docs</a>
        <span class="indicator ml-4">
          <span class="indicator-item badge badge-error">3</span>
          <button class="btn btn-sm">Inbox</button>
        </span>
        <div class="join mt-2">
          <input class="input join-item" placeholder="query…" />
          <button class="btn btn-primary join-item">Scan</button>
        </div>
        <div class="list mt-2">
          <div class="list-row"><span class="avatar avatar-placeholder avatar-circle"><div class="avatar-img">AI</div></span><div><div class="font-semibold text-sm">Agent</div><div class="text-xs text-scifi-muted">online</div></div></div>
          <div class="list-row"><span class="avatar avatar-placeholder avatar-circle avatar-online"><div class="avatar-img">OP</div></span><div><div class="font-semibold text-sm">Operator</div><div class="text-xs text-scifi-muted">synced</div></div></div>
        </div>
      </div>`
    )}

    ${section(
      "Layout / nav",
      `<div class="breadcrumbs mb-4 text-sm">
        <ul>
          <li><a href="#">Core</a></li>
          <li><a href="#">Components</a></li>
          <li>Gallery</li>
        </ul>
      </div>
      <div class="navbar mb-4">
        <div class="navbar-start"><span class="brand-mark text-base">ScifiUI</span></div>
        <div class="navbar-center gap-2 hidden sm:flex">
          <a class="nav-link" href="#">Docs</a>
          <a class="nav-link" href="#">Themes</a>
        </div>
        <div class="navbar-end"><button class="btn btn-sm btn-primary">Launch</button></div>
      </div>
      <div class="grid md:grid-cols-2 gap-4 mb-4">
        <div class="card card-bordered">
          <div class="card-body">
            <h3 class="card-title">Relay node</h3>
            <p class="text-sm text-scifi-muted">Generic card surface — stack utilities for layout.</p>
            <div class="card-actions"><button class="btn btn-sm btn-primary">Open</button><button class="btn btn-sm btn-ghost">Dismiss</button></div>
          </div>
        </div>
        <div>
          <ul class="steps w-full mb-4">
            <li class="step step-primary">Boot</li>
            <li class="step step-primary">Link</li>
            <li class="step">Sync</li>
            <li class="step">Live</li>
          </ul>
          <ul class="timeline">
            <li class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <div class="timeline-meta">T-00</div>
                <div class="timeline-title">Handshake</div>
                <p class="text-xs text-scifi-muted">Channel negotiated.</p>
              </div>
            </li>
            <li class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <div class="timeline-meta">T-01</div>
                <div class="timeline-title">Payload</div>
                <p class="text-xs text-scifi-muted">Manifest verified.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <details class="collapse mb-4" open>
        <summary class="collapse-title">Collapse / accordion</summary>
        <div class="collapse-content">Native <code>&lt;details&gt;</code> with ScifiUI chrome — no JS required.</div>
      </details>
      <details class="collapse mb-4">
        <summary class="collapse-title">Nested sector</summary>
        <div class="collapse-content">Second panel in the stack.</div>
      </details>
      <div class="pagination mb-4">
        <button class="btn btn-sm" type="button">«</button>
        <button class="btn btn-sm active" type="button" aria-current="page">1</button>
        <button class="btn btn-sm" type="button">2</button>
        <button class="btn btn-sm" type="button">3</button>
        <button class="btn btn-sm" type="button">»</button>
      </div>
      <footer class="footer sm:grid-cols-3 rounded-xl border border-[var(--scifi-border)]">
        <div><div class="footer-title">Product</div><a href="#">Docs</a><br /><a href="#">Themes</a></div>
        <div><div class="footer-title">Project</div><a href="#">Git</a><br /><a href="#">License</a></div>
        <div><div class="footer-title">Status</div><span class="status-chip"><span class="dot"></span> v0.1</span></div>
      </footer>`
    )}

    ${section(
      "Media",
      `<div class="flex flex-wrap gap-4 items-center mb-4">
        <div class="mask mask-circle w-16 h-16 bg-gradient-to-br from-[var(--scifi-primary)] to-[var(--scifi-cyan)]"></div>
        <div class="mask mask-hexagon w-16 h-16 bg-[var(--scifi-secondary)]"></div>
        <div class="popover">
          <button type="button" class="btn btn-sm">Hover popover</button>
          <div class="popover-content">Token-driven floating panel.</div>
        </div>
      </div>
      <div class="carousel max-w-lg mb-4">
        <div class="carousel-item"><div class="pane p-6 w-48 text-sm">Slide A</div></div>
        <div class="carousel-item"><div class="pane p-6 w-48 text-sm">Slide B</div></div>
        <div class="carousel-item"><div class="pane p-6 w-48 text-sm">Slide C</div></div>
      </div>
      <div class="diff max-w-md h-28">
        <div class="diff-item-1"><div class="h-28 bg-[rgba(var(--scifi-primary-rgb),0.35)] p-3 text-xs">Before</div></div>
        <div class="diff-item-2"><div class="h-28 bg-[rgba(var(--scifi-cyan-rgb),0.25)] p-3 text-xs text-right">After</div></div>
      </div>`
    )}

    ${section(
      "Effects",
      `<div class="flex flex-wrap gap-3 items-center">
        <span class="hero-title text-2xl font-extrabold">Spectrum</span>
        <span class="label-kicker neon-flicker text-scifi-primary">Neon flicker</span>
        <div class="btn border-pulse">Border pulse</div>
        <div class="float-y feature-pill">Float</div>
        <span class="caret-blink label-kicker">Type</span>
      </div>`
    )}

    ${section(
      "Design tokens",
      `<div class="overflow-x-auto">
        <table class="table-scifi">
          <thead><tr><th>Token</th><th>Preview</th><th>Value</th></tr></thead>
          <tbody id="token-rows"></tbody>
        </table>
      </div>
      <p class="text-xs text-scifi-muted mt-3">Override any token on <code>:root</code> or <code>[data-theme]</code> — all components update instantly.</p>`
    )}
  </main>
`;

function refreshTokens() {
  const rows = document.querySelector("#token-rows");
  const styles = getComputedStyle(document.documentElement);
  rows.innerHTML = TOKENS.map((name) => {
    const value = styles.getPropertyValue(name).trim();
    const isColor = value.startsWith("#") || value.startsWith("rgb");
    const swatch = isColor
      ? `<span class="inline-block w-6 h-6 rounded border border-[var(--scifi-border)]" style="background:${value}"></span>`
      : `<span class="text-scifi-muted">—</span>`;
    return `<tr><td><code>${name}</code></td><td>${swatch}</td><td class="text-scifi-muted text-xs max-w-xs truncate">${value}</td></tr>`;
  }).join("");
}

const themeSelect = document.querySelector("#theme");
themeSelect.addEventListener("change", () => {
  document.documentElement.setAttribute("data-theme", themeSelect.value);
  refreshTokens();
});

document.querySelector("#perf").addEventListener("click", () => {
  document.documentElement.classList.toggle("perf-lite");
});

const modal = document.querySelector("#modal");
document.querySelector("#open-modal").addEventListener("click", () => modal.classList.remove("hidden"));
document.querySelector("#close-modal").addEventListener("click", () => modal.classList.add("hidden"));
document.querySelector("#close-modal-2").addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

document.querySelector("#toggle-drawer").addEventListener("click", () => {
  document.querySelector("#demo-drawer").classList.toggle("open");
});

initDropdowns();
initTreeView();
const toaster = createToaster(document.querySelector("#toasts"));
document.querySelector("#toast-info").addEventListener("click", () => toaster.info("Channel idle."));
document.querySelector("#toast-ok").addEventListener("click", () => toaster.success("Payload saved."));

refreshTokens();
