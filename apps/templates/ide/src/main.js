import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/jetbrains-mono/800.css";
import "@tabler/icons-webfont/dist/tabler-icons.min.css";
import { initDropdowns, initTreeView, createToaster, enterShell } from "@scifiui/core/js";
import "./styles.css";

const FILES = {
  "app.ts": `import { boot } from "./agent";

export function main() {
  boot({ theme: "retrowave" });
  console.log("ScifiUI demo online");
}
`,
  "agent.ts": `export function boot(opts: { theme: string }) {
  document.documentElement.dataset.theme = opts.theme;
}
`,
  "README.md": `# ScifiUI IDE demo

Interactive shell using tree, split, chat, toast, dropdown, drawer, tooltip, and status-bar.
`,
};

const app = document.querySelector("#app");

app.innerHTML = `
  <div id="toasts" class="toast toast-top toast-end" aria-live="polite"></div>

  <div class="drawer h-full" id="settings-drawer">
    <div class="drawer-side">
      <div class="drawer-panel p-4 flex flex-col gap-4">
        <div class="pane-title"><span class="pane-title-bar"></span> Settings</div>
        <label class="block text-sm">
          <span class="label-kicker block mb-1.5">Theme</span>
          <select class="select" id="drawer-theme">
            <option value="retrowave">Retrowave</option>
            <option value="synthwave84">Synthwave '84</option>
            <option value="ghibli">Ghibli</option>
            <option value="vibrantFiesta">Vibrant Fiesta</option>
            <option value="goldenTwilight">Golden Twilight</option>
            <option value="solarizedDark">Solarized Dark</option>
          </select>
        </label>
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" class="toggle" id="perf-toggle" />
          Perf-lite mode
        </label>
        <div class="alert alert-info text-xs">Drawer · tooltip · toggle · select</div>
        <button type="button" class="btn btn-ghost btn-sm" id="close-drawer">Close</button>
      </div>
    </div>

    <div class="drawer-content flex flex-col h-full min-h-0">
      <header class="app-bar shrink-0" data-enter>
        <div class="flex items-center gap-3 min-w-0">
          <span class="brand-mark text-base">ScifiUI</span>
          <span class="badge badge-primary">demo</span>
          <span class="status-chip"><span class="dot"></span> live</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="dropdown dropdown-end" id="actions-dd">
            <button type="button" class="btn btn-sm btn-ghost" data-dropdown-trigger>Actions ▾</button>
            <div class="dropdown-menu">
              <ul class="menu">
                <li><button type="button" class="menu-item" data-action="toast-ok">Toast success</button></li>
                <li><button type="button" class="menu-item" data-action="toast-warn">Toast warning</button></li>
                <li><button type="button" class="menu-item" data-action="toast-err">Toast error</button></li>
                <li><hr class="menu-divider" /></li>
                <li><button type="button" class="menu-item" data-action="agent">Simulate agent</button></li>
              </ul>
            </div>
          </div>
          <span class="tooltip tooltip-bottom" data-tip="Settings drawer">
            <button type="button" class="icon-btn" id="open-drawer" aria-label="Settings">⚙</button>
          </span>
        </div>
      </header>

      <div class="flex flex-1 min-h-0">
        <aside class="mode-rail shrink-0 hidden sm:flex" data-enter>
          <span class="tooltip tooltip-right" data-tip="Editor"><button type="button" class="icon-btn active" data-mode="editor">⌘</button></span>
          <span class="tooltip tooltip-right" data-tip="Agent"><button type="button" class="icon-btn" data-mode="agent">◈</button></span>
          <span class="tooltip tooltip-right" data-tip="Stats"><button type="button" class="icon-btn" data-mode="stats">▣</button></span>
        </aside>

        <div class="split split-row flex-1 min-h-0 p-2" id="main-split">
          <div class="split-pane pane pane-bracketed" id="files-pane" style="flex: 0 0 220px" data-enter>
            <div class="pane-header">
              <span class="pane-title"><span class="pane-title-bar"></span> Files</span>
              <span class="badge badge-success">tree</span>
            </div>
            <div class="pane-scan"></div>
            <div class="tree-view flex-1 overflow-auto p-1" role="tree" id="file-tree">
              <div class="tree-item open">
                <button type="button" class="tree-row" role="treeitem" aria-selected="false">
                  <span class="tree-toggle" aria-expanded="true"><i class="ti ti-chevron-right"></i></span>
                  <span class="tree-icon"><i class="ti ti-folder"></i></span>
                  <span class="tree-label">src</span>
                </button>
                <div class="tree-children" role="group">
                  <div class="tree-item">
                    <button type="button" class="tree-row selected" role="treeitem" aria-selected="true" data-file="app.ts">
                      <span class="tree-toggle is-leaf"><i class="ti ti-chevron-right"></i></span>
                      <span class="tree-icon"><i class="ti ti-file"></i></span>
                      <span class="tree-label">app.ts</span>
                    </button>
                  </div>
                  <div class="tree-item">
                    <button type="button" class="tree-row" role="treeitem" aria-selected="false" data-file="agent.ts">
                      <span class="tree-toggle is-leaf"><i class="ti ti-chevron-right"></i></span>
                      <span class="tree-icon"><i class="ti ti-file"></i></span>
                      <span class="tree-label">agent.ts</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="tree-item">
                <button type="button" class="tree-row" role="treeitem" aria-selected="false" data-file="README.md">
                  <span class="tree-toggle is-leaf"><i class="ti ti-chevron-right"></i></span>
                  <span class="tree-icon"><i class="ti ti-file"></i></span>
                  <span class="tree-label">README.md</span>
                </button>
              </div>
            </div>
          </div>

          <button type="button" class="split-resizer" data-resize="files" aria-label="Resize files"></button>

          <div class="split-pane pane pane-bracketed flex-1 min-w-0" id="editor-pane" data-enter>
            <div class="tab-bar" id="tabs">
              <button type="button" class="tab active" data-file="app.ts">app.ts</button>
              <button type="button" class="tab" data-file="agent.ts">agent.ts</button>
              <button type="button" class="tab" data-file="README.md">README.md</button>
            </div>
            <pre class="flex-1 overflow-auto m-0 p-4 text-xs leading-relaxed text-scifi-muted whitespace-pre-wrap" id="editor">${FILES["app.ts"]}</pre>
            <div class="status-bar shrink-0 rounded-none border-x-0 border-b-0">
              <div class="status-bar-section">
                <span class="status-bar-item" id="cursor">Ln 1, Col 1</span>
                <span class="loading-dots hidden" id="editor-loading" aria-label="Loading"><span></span><span></span><span></span></span>
              </div>
              <div class="status-bar-section">
                <span class="status-bar-item" id="active-file">app.ts</span>
              </div>
            </div>
          </div>

          <button type="button" class="split-resizer" data-resize="chat" aria-label="Resize chat"></button>

          <div class="split-pane pane pane-bracketed" id="chat-pane" style="flex: 0 0 300px" data-enter>
            <div class="pane-header">
              <span class="pane-title"><span class="pane-title-bar"></span> Agent</span>
              <span class="status-chip"><span class="dot"></span> ready</span>
            </div>
            <div class="chat flex-1 overflow-auto p-3" id="chat-log">
              <div class="chat-row chat-start">
                <div class="chat-avatar"><i class="ti ti-robot"></i></div>
                <div class="chat-bubble chat-bubble-accent">
                  <div class="chat-header"><span class="chat-name">Agent</span><span>now</span></div>
                  Demo shell with the new kit: tree, split, chat, toast, dropdown, drawer, tooltip, loading, status-bar.
                </div>
              </div>
            </div>
            <form class="p-3 border-t border-[var(--scifi-border)] flex gap-2" id="chat-form">
              <input class="input" id="chat-input" placeholder="Ask the agent…" autocomplete="off" />
              <button type="submit" class="btn btn-primary shrink-0">Send</button>
            </form>
          </div>
        </div>
      </div>

      <footer class="status-bar shrink-0">
        <div class="status-bar-section">
          <span class="status-bar-item"><strong>workspace</strong></span>
          <span class="status-chip"><span class="dot"></span> synced</span>
          <span class="feature-pill text-[0.65rem] py-0.5 px-2">split · tree · chat</span>
        </div>
        <div class="status-bar-section">
          <span class="status-bar-item" id="footer-theme">retrowave</span>
          <span class="loading hidden" id="global-loading" aria-label="Working"></span>
        </div>
      </footer>
    </div>
  </div>
`;

const toaster = createToaster(document.querySelector("#toasts"));
const drawer = document.querySelector("#settings-drawer");
const editor = document.querySelector("#editor");
const chatLog = document.querySelector("#chat-log");
const activeFileEl = document.querySelector("#active-file");
const footerTheme = document.querySelector("#footer-theme");
const editorLoading = document.querySelector("#editor-loading");
const globalLoading = document.querySelector("#global-loading");

function setTheme(id) {
  document.documentElement.setAttribute("data-theme", id);
  footerTheme.textContent = id;
  const drawerTheme = document.querySelector("#drawer-theme");
  if (drawerTheme) drawerTheme.value = id;
}

function openFile(name) {
  if (!FILES[name]) return;
  editorLoading.classList.remove("hidden");
  setTimeout(() => {
    editor.textContent = FILES[name];
    activeFileEl.textContent = name;
    editorLoading.classList.add("hidden");
    document.querySelectorAll("#tabs .tab").forEach((t) => {
      t.classList.toggle("active", t.dataset.file === name);
    });
    document.querySelectorAll("#file-tree .tree-row[data-file]").forEach((row) => {
      const on = row.dataset.file === name;
      row.classList.toggle("selected", on);
      row.setAttribute("aria-selected", on ? "true" : "false");
    });
  }, 220);
}

function appendChat(role, text) {
  const row = document.createElement("div");
  row.className = `chat-row ${role === "you" ? "chat-end" : "chat-start"}`;
  row.innerHTML = `
    <div class="chat-avatar">${role === "you" ? "YOU" : "AI"}</div>
    <div class="chat-bubble ${role === "you" ? "chat-bubble-primary" : "chat-bubble-accent"}">
      <div class="chat-header"><span class="chat-name">${role === "you" ? "You" : "Agent"}</span><span>now</span></div>
      ${text}
    </div>`;
  chatLog.appendChild(row);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function simulateAgent() {
  globalLoading.classList.remove("hidden");
  toaster.info("Agent spinning up…");
  setTimeout(() => {
    appendChat(
      "ai",
      "Scanned the workspace. <span class=\"badge badge-primary\">3</span> files indexed — try the tree, resizers, or Actions menu."
    );
    globalLoading.classList.add("hidden");
    toaster.success("Agent ready");
  }, 900);
}

/* Split drag */
function initSplitResize(root) {
  root.querySelectorAll(".split-resizer").forEach((resizer) => {
    resizer.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      const split = resizer.parentElement;
      if (!split?.classList.contains("split-row")) return;
      const prev = resizer.previousElementSibling;
      const next = resizer.nextElementSibling;
      if (!prev || !next) return;
      resizer.classList.add("active");
      resizer.setPointerCapture(e.pointerId);
      const startX = e.clientX;
      const prevStart = prev.getBoundingClientRect().width;
      const nextStart = next.getBoundingClientRect().width;

      const onMove = (ev) => {
        const dx = ev.clientX - startX;
        const prevW = Math.max(160, Math.min(prevStart + dx, prevStart + nextStart - 200));
        const nextW = prevStart + nextStart - prevW;
        prev.style.flex = `0 0 ${prevW}px`;
        next.style.flex = `0 0 ${nextW}px`;
      };
      const onUp = () => {
        resizer.classList.remove("active");
        resizer.releasePointerCapture(e.pointerId);
        resizer.removeEventListener("pointermove", onMove);
        resizer.removeEventListener("pointerup", onUp);
      };
      resizer.addEventListener("pointermove", onMove);
      resizer.addEventListener("pointerup", onUp);
    });
  });
}

initDropdowns();
initTreeView();
initSplitResize(document);

document.querySelector("#open-drawer").addEventListener("click", () => drawer.classList.add("open"));
document.querySelector("#close-drawer").addEventListener("click", () => drawer.classList.remove("open"));

document.querySelector("#drawer-theme").addEventListener("change", (e) => {
  setTheme(e.target.value);
  toaster.info(`Theme → ${e.target.value}`);
});

document.querySelector("#perf-toggle").addEventListener("change", (e) => {
  document.documentElement.classList.toggle("perf-lite", e.target.checked);
  toaster.info(e.target.checked ? "Perf-lite on" : "Perf-lite off");
});

document.querySelector("#file-tree").addEventListener("click", (e) => {
  const row = e.target.closest(".tree-row[data-file]");
  if (row) openFile(row.dataset.file);
});

document.querySelector("#tabs").addEventListener("click", (e) => {
  const tab = e.target.closest(".tab[data-file]");
  if (tab) openFile(tab.dataset.file);
});

document.querySelector("#actions-dd").addEventListener("click", (e) => {
  const item = e.target.closest("[data-action]");
  if (!item) return;
  const action = item.dataset.action;
  if (action === "toast-ok") toaster.success("Payload committed.");
  if (action === "toast-warn") toaster.warning("Thermal spike on rail 2.");
  if (action === "toast-err") toaster.error("Handshake failed.");
  if (action === "agent") simulateAgent();
  item.closest(".dropdown")?.classList.remove("open");
});

document.querySelector("#chat-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector("#chat-input");
  const text = input.value.trim();
  if (!text) return;
  appendChat("you", text);
  input.value = "";
  globalLoading.classList.remove("hidden");
  setTimeout(() => {
    appendChat("ai", `Ack: “${text}”. Components are live — open Settings or drag a split resizer.`);
    globalLoading.classList.add("hidden");
  }, 650);
});

document.querySelectorAll("[data-mode]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-mode]").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    toaster.info(`Mode → ${btn.dataset.mode}`);
  });
});

toaster.info("Interactive component demo ready");
enterShell(app);
