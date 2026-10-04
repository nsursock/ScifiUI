import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  IconRocket,
  IconSettings,
  IconSend,
  IconCheck,
  IconHome,
  IconChartBar,
  IconFolder,
  IconFile,
  IconChevronRight,
  IconBolt,
} from "@tabler/icons-react";
import { createToaster, initDropdowns, initTreeView, enterShell } from "@scifiui/core/js";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/jetbrains-mono/800.css";
import "./styles.css";

const THEMES = [
  "retrowave",
  "ghibli",
  "vibrantFiesta",
  "dawn",
  "synthwave84",
  "solarizedDark",
  "cottonCandy",
  "goldenTwilight",
  "brightContrasts",
];

function App() {
  const [theme, setTheme] = useState("retrowave");
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const [perfLite, setPerfLite] = useState(false);
  const [chat, setChat] = useState([
    { role: "ai", text: "React demo online. ScifiUI is class-based — same look from JSX as HTML." },
  ]);
  const toasterRef = useRef(null);
  const shellRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle("perf-lite", perfLite);
  }, [perfLite]);

  useEffect(() => {
    const el = document.getElementById("toasts");
    if (el) toasterRef.current = createToaster(el);
    initDropdowns();
    initTreeView();
    if (shellRef.current) enterShell(shellRef.current);
  }, []);

  function send(e) {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    setChat((c) => [...c, { role: "you", text }]);
    setMessage("");
    setTimeout(() => {
      setChat((c) => [
        ...c,
        { role: "ai", text: `Ack from React: “${text}”. Stack Tailwind utilities freely.` },
      ]);
      toasterRef.current?.success("Message sent");
    }, 400);
  }

  return (
    <div ref={shellRef} className="min-h-screen flex flex-col bg-[var(--scifi-bg)] text-[var(--scifi-text)]">
      <div id="toasts" className="toast toast-top toast-end" aria-live="polite" />

      <header className="app-bar sticky top-0 z-20" data-enter>
        <div className="flex items-center gap-3 min-w-0">
          <span className="brand-mark text-base">ScifiUI</span>
          <span className="badge badge-primary">React</span>
          <span className="status-chip">
            <span className="dot" /> live
          </span>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="select w-auto py-1.5 text-xs min-w-[9rem]"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            {THEMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button
            type="button"
            className={`btn btn-ghost btn-xs ${perfLite ? "btn-primary" : ""}`}
            onClick={() => setPerfLite((v) => !v)}
          >
            Perf
          </button>
          <div className="dropdown dropdown-end">
            <button type="button" className="icon-btn" data-dropdown-trigger aria-label="Actions">
              <IconSettings size={16} stroke={1.75} />
            </button>
            <div className="dropdown-menu">
              <ul className="menu">
                <li className="menu-label">Channel</li>
                <li>
                  <button type="button" className="menu-item" onClick={() => toasterRef.current?.info("Channel idle")}>
                    Toast info
                  </button>
                </li>
                <li>
                  <button type="button" className="menu-item" onClick={() => toasterRef.current?.success("Synced")}>
                    Toast success
                  </button>
                </li>
                <li>
                  <hr className="menu-divider" />
                </li>
                <li>
                  <button type="button" className="menu-item" onClick={() => setModalOpen(true)}>
                    Open modal
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-8 space-y-6 flex-1">
        <section
          className="relative overflow-hidden rounded-xl border border-[var(--scifi-border)] p-8"
          data-enter
        >
          <div className="grid-floor opacity-50" />
          <div className="vignette" />
          <div className="relative z-10">
            <p className="label-kicker neon-flicker text-scifi-primary mb-2">Framework demo</p>
            <h1 className="hero-title hero-title-glitch text-4xl font-extrabold tracking-tight mb-3" data-text="React">
              React
            </h1>
            <p className="text-scifi-muted text-sm max-w-lg mb-5">
              <code className="text-scifi-cyan">@scifiui/core</code> is CSS-class based — use it from JSX
              the same way you would HTML.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="feature-pill">Glass panes</span>
              <span className="feature-pill">9 themes</span>
              <span className="feature-pill">GSAP enter</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn btn-primary" onClick={() => toasterRef.current?.success("Launch")}>
                <IconRocket size={16} stroke={1.75} /> Launch
              </button>
              <button type="button" className="btn-cta" onClick={() => setModalOpen(true)}>
                Open channel
              </button>
              <button type="button" className="btn btn-ghost">
                Ghost
              </button>
              <button type="button" className="btn btn-danger btn-sm">
                Abort
              </button>
              <span className="feature-pill">
                <IconCheck size={14} stroke={1.75} /> className=&quot;btn btn-primary&quot;
              </span>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-2 items-center" data-enter>
          <button type="button" className="btn btn-sm">
            Default
          </button>
          <button type="button" className="btn btn-sm btn-primary">
            Primary
          </button>
          <button type="button" className="btn btn-sm btn-ghost">
            Ghost
          </button>
          <button type="button" className="btn btn-xs">
            XS
          </button>
          <button type="button" className="icon-btn" aria-label="Home">
            <IconHome size={16} stroke={1.75} />
          </button>
          <button type="button" className="icon-btn active" aria-label="Stats">
            <IconChartBar size={16} stroke={1.75} />
          </button>
          <span className="badge">Default</span>
          <span className="badge badge-primary">Primary</span>
          <span className="badge badge-success">Ok</span>
          <span className="badge badge-warning">Warn</span>
          <span className="badge badge-error">Err</span>
          <span className="loading" aria-label="Loading" />
          <span className="loading-dots" aria-label="Loading">
            <span />
            <span />
            <span />
          </span>
          <span>
            <kbd className="kbd">⌘</kbd> <kbd className="kbd">K</kbd>
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="pane pane-bracketed" data-enter>
            <div className="pane-header">
              <span className="pane-title">
                <span className="pane-title-bar" /> Forms
              </span>
              <span className="badge badge-success">input</span>
            </div>
            <div className="pane-scan" />
            <div className="p-4 space-y-3">
              <label className="block">
                <span className="label-kicker block mb-1">Callsign</span>
                <input className="input" placeholder="pilot@nexus.space" />
              </label>
              <label className="block">
                <span className="label-kicker block mb-1">Band</span>
                <select className="select">
                  <option>Alpha</option>
                  <option>Bravo</option>
                  <option>Charlie</option>
                </select>
              </label>
              <label className="block">
                <span className="label-kicker block mb-1">Brief</span>
                <textarea className="textarea" rows={2} placeholder="Mission notes…" />
              </label>
              <div className="flex flex-wrap gap-4 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" defaultChecked /> Glow
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="toggle" defaultChecked /> Autopilot
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" className="radio" name="band" defaultChecked /> A
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" className="radio" name="band" /> B
                </label>
              </div>
              <label className="block">
                <span className="label-kicker block mb-1">Thrust</span>
                <input type="range" className="range" min={0} max={100} defaultValue={62} />
              </label>
            </div>
          </div>

          <div className="pane pane-bracketed flex flex-col min-h-[320px]" data-enter>
            <div className="pane-header">
              <span className="pane-title">
                <span className="pane-title-bar" /> Chat
              </span>
              <span className="status-chip">
                <span className="dot" /> agent
              </span>
            </div>
            <div className="chat flex-1 overflow-auto p-3">
              {chat.map((m, i) => (
                <div key={i} className={`chat-row ${m.role === "you" ? "chat-end" : "chat-start"}`}>
                  <div className="chat-avatar">{m.role === "you" ? "YOU" : "AI"}</div>
                  <div
                    className={`chat-bubble ${m.role === "you" ? "chat-bubble-primary" : "chat-bubble-accent"}`}
                  >
                    <div className="chat-header">
                      <span className="chat-name">{m.role === "you" ? "You" : "Agent"}</span>
                    </div>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form className="p-3 border-t border-[var(--scifi-border)] flex gap-2" onSubmit={send}>
              <input
                className="input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message…"
              />
              <button type="submit" className="btn btn-primary shrink-0" aria-label="Send">
                <IconSend size={16} stroke={1.75} />
              </button>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="pane pane-bracketed" data-enter>
            <div className="pane-header">
              <span className="pane-title">
                <span className="pane-title-bar" /> Files
              </span>
              <span className="badge">tree</span>
            </div>
            <div className="tree-view p-2" role="tree">
              <div className="tree-item open">
                <button type="button" className="tree-row" role="treeitem" aria-selected="false">
                  <span className="tree-toggle" aria-expanded="true">
                    <IconChevronRight size={14} stroke={1.75} />
                  </span>
                  <span className="tree-icon">
                    <IconFolder size={14} stroke={1.75} />
                  </span>
                  <span className="tree-label">src</span>
                </button>
                <div className="tree-children" role="group">
                  <div className="tree-item">
                    <button type="button" className="tree-row selected" role="treeitem" aria-selected="true">
                      <span className="tree-toggle is-leaf">
                        <IconChevronRight size={14} stroke={1.75} />
                      </span>
                      <span className="tree-icon">
                        <IconFile size={14} stroke={1.75} />
                      </span>
                      <span className="tree-label">main.jsx</span>
                    </button>
                  </div>
                  <div className="tree-item">
                    <button type="button" className="tree-row" role="treeitem" aria-selected="false">
                      <span className="tree-toggle is-leaf">
                        <IconChevronRight size={14} stroke={1.75} />
                      </span>
                      <span className="tree-icon">
                        <IconFile size={14} stroke={1.75} />
                      </span>
                      <span className="tree-label">styles.css</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="tree-item">
                <button type="button" className="tree-row" role="treeitem" aria-selected="false">
                  <span className="tree-toggle is-leaf">
                    <IconChevronRight size={14} stroke={1.75} />
                  </span>
                  <span className="tree-icon">
                    <IconFile size={14} stroke={1.75} />
                  </span>
                  <span className="tree-label">README.md</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3" data-enter>
            <div className="alert alert-info text-xs">Info channel open — neon cyan border.</div>
            <div className="alert alert-success text-xs">Payload accepted.</div>
            <div className="alert alert-warning text-xs">Thermal warning on rail 3.</div>
            <div className="alert alert-error text-xs">Handshake failed.</div>
            <div className="console-panel p-4">
              <div className="scan-line" />
              <p className="label-kicker mb-2">Console panel</p>
              <p className="text-xs text-scifi-muted mb-3">Landing-shell surface with corner brackets.</p>
              <button type="button" className="btn btn-sm btn-primary" onClick={() => setModalOpen(true)}>
                <IconBolt size={14} stroke={1.75} /> Engage
              </button>
            </div>
          </div>
        </div>

        <div className="pane overflow-hidden" data-enter>
          <div className="tab-bar">
            {["overview", "telemetry", "logs"].map((id) => (
              <button
                key={id}
                type="button"
                className={`tab ${tab === id ? "active" : ""}`}
                onClick={() => setTab(id)}
              >
                {id[0].toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>
          <div className="p-4 text-sm text-scifi-muted flex flex-wrap gap-4 items-center">
            {tab === "overview" && (
              <>
                <progress className="progress progress-primary w-40" value={70} max={100} />
                <div className="radial-progress" style={{ "--value": 72 }} role="progressbar">
                  <span>72%</span>
                </div>
                <div className="skeleton skeleton-text w-32" />
              </>
            )}
            {tab === "telemetry" && <span>Uplink latency 12ms · band Alpha locked.</span>}
            {tab === "logs" && <span className="font-mono text-xs">[ok] handshake · [warn] thermal rail 3</span>}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3" data-enter>
          {[
            ["Components", "CSS classes"],
            ["Themes", "9 palettes"],
            ["Motion", "GSAP helpers"],
          ].map(([label, value]) => (
            <div className="metric-card" key={label}>
              <div className="card-head">
                <div className="card-label">
                  <span className="label-bar" />
                  {label}
                </div>
              </div>
              <div className="card-value text-xl">{value}</div>
            </div>
          ))}
        </div>
      </main>

      <footer className="status-bar shrink-0 border-t border-[var(--scifi-border)]" data-enter>
        <div className="status-bar-section">
          <span className="status-bar-item">
            <strong>@scifiui/demo-react</strong>
          </span>
          <span className="status-chip">
            <span className="dot" /> synced
          </span>
        </div>
        <div className="status-bar-section">
          <span className="status-bar-item">{theme}</span>
          <span className="status-bar-item">React 19</span>
        </div>
      </footer>

      {modalOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="modal">
            <h3 className="modal-title">Confirm uplink</h3>
            <p className="modal-body">Establish encrypted channel with ScifiUI tokens?</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setModalOpen(false);
                  toasterRef.current?.success("Uplink established");
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root — check index.html");
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
