import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  IconRocket,
  IconSettings,
  IconSend,
  IconCheck,
} from "@tabler/icons-react";
import { createToaster, initDropdowns } from "@scifiui/core/js";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/jetbrains-mono/800.css";
import "./styles.css";

const THEMES = [
  "retrowave",
  "synthwave84",
  "ghibli",
  "fiesta",
  "goldenTwilight",
  "solarizedDark",
];

function App() {
  const [theme, setTheme] = useState("retrowave");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { role: "ai", text: "React demo online. Same ScifiUI classes — your markup, our look." },
  ]);
  const toasterRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const el = document.getElementById("toasts");
    if (el) toasterRef.current = createToaster(el);
    initDropdowns();
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
        { role: "ai", text: `Ack from React: “${text}”. Classes stack with Tailwind utilities.` },
      ]);
      toasterRef.current?.success("Message sent");
    }, 400);
  }

  return (
    <div className="min-h-screen bg-[var(--scifi-bg)] text-[var(--scifi-text)]">
      <div id="toasts" className="toast toast-top toast-end" aria-live="polite" />

      <header className="app-bar sticky top-0">
        <div className="flex items-center gap-3">
          <span className="brand-mark text-base">ScifiUI</span>
          <span className="badge badge-primary">React</span>
          <span className="status-chip">
            <span className="dot" /> live
          </span>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="select w-auto py-1.5 text-xs"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            {THEMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <div className="dropdown dropdown-end">
            <button type="button" className="icon-btn" data-dropdown-trigger aria-label="Actions">
              <IconSettings size={16} stroke={1.75} />
            </button>
            <div className="dropdown-menu">
              <ul className="menu">
                <li>
                  <button
                    type="button"
                    className="menu-item"
                    onClick={() => toasterRef.current?.info("Channel idle")}
                  >
                    Toast info
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="menu-item"
                    onClick={() => toasterRef.current?.success("Synced")}
                  >
                    Toast success
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        <section className="relative overflow-hidden rounded-xl border border-[var(--scifi-border)] p-8">
          <div className="grid-floor opacity-50" />
          <div className="vignette" />
          <div className="relative z-10">
            <p className="label-kicker neon-flicker text-scifi-primary mb-2">Framework demo</p>
            <h1 className="hero-title text-4xl font-extrabold tracking-tight mb-3">React</h1>
            <p className="text-scifi-muted text-sm max-w-lg mb-5">
              <code className="text-scifi-cyan">@scifiui/core</code> is CSS-class based — use it from
              JSX the same way you would HTML.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => toasterRef.current?.success("Launch")}
              >
                <IconRocket size={16} stroke={1.75} /> Launch
              </button>
              <button type="button" className="btn-cta">
                CTA
              </button>
              <button type="button" className="btn btn-ghost">
                Ghost
              </button>
              <span className="feature-pill">
                <IconCheck size={14} stroke={1.75} /> className=&quot;btn btn-primary&quot;
              </span>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="pane pane-bracketed">
            <div className="pane-header">
              <span className="pane-title">
                <span className="pane-title-bar" /> Forms
              </span>
            </div>
            <div className="p-4 space-y-3">
              <label className="block">
                <span className="label-kicker block mb-1">Callsign</span>
                <input className="input" placeholder="pilot@nexus.space" />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="toggle" defaultChecked /> Autopilot
              </label>
              <div className="alert alert-info text-xs">Same tokens: --scifi-primary, data-theme</div>
            </div>
          </div>

          <div className="pane pane-bracketed flex flex-col min-h-[280px]">
            <div className="pane-header">
              <span className="pane-title">
                <span className="pane-title-bar" /> Chat
              </span>
            </div>
            <div className="chat flex-1 overflow-auto p-3">
              {chat.map((m, i) => (
                <div key={i} className={`chat-row ${m.role === "you" ? "chat-end" : "chat-start"}`}>
                  <div className="chat-avatar">{m.role === "you" ? "YOU" : "AI"}</div>
                  <div
                    className={`chat-bubble ${m.role === "you" ? "chat-bubble-primary" : "chat-bubble-accent"}`}
                  >
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

        <div className="grid sm:grid-cols-3 gap-3">
          {[
            ["Components", "CSS classes"],
            ["Themes", "9 palettes"],
            ["JS helpers", "optional"],
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
    </div>
  );
}

const root = document.getElementById("root");
if (!root) {
  throw new Error('Missing #root — check index.html');
}
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
