<script>
  import { onMount } from "svelte";
  import IconRocket from "@tabler/icons-svelte/icons/rocket";
  import IconSettings from "@tabler/icons-svelte/icons/settings";
  import IconSend from "@tabler/icons-svelte/icons/send";
  import IconCheck from "@tabler/icons-svelte/icons/check";
  import IconHome from "@tabler/icons-svelte/icons/home";
  import IconChartBar from "@tabler/icons-svelte/icons/chart-bar";
  import IconFolder from "@tabler/icons-svelte/icons/folder";
  import IconFile from "@tabler/icons-svelte/icons/file";
  import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";
  import IconBolt from "@tabler/icons-svelte/icons/bolt";
  import { createToaster, initDropdowns, initTreeView, enterShell } from "@scifiui/core/js";

  const THEMES = [
    "retrowave",
    "ghibli",
    "fiesta",
    "dawn",
    "synthwave84",
    "solarizedDark",
    "cottonCandy",
    "goldenTwilight",
    "brightContrasts",
  ];

  let theme = $state("retrowave");
  let message = $state("");
  let tab = $state("overview");
  let modalOpen = $state(false);
  let perfLite = $state(false);
  let chat = $state([
    {
      role: "ai",
      text: "Svelte demo online. ScifiUI is class-based — same look from markup as HTML.",
    },
  ]);
  let toaster;
  let shellEl;

  $effect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  });

  $effect(() => {
    document.documentElement.classList.toggle("perf-lite", perfLite);
  });

  onMount(() => {
    const el = document.getElementById("toasts");
    if (el) toaster = createToaster(el);
    initDropdowns();
    initTreeView();
    if (shellEl) enterShell(shellEl);
  });

  function send(e) {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    chat = [...chat, { role: "you", text }];
    message = "";
    setTimeout(() => {
      chat = [
        ...chat,
        {
          role: "ai",
          text: `Ack from Svelte: “${text}”. Stack Tailwind utilities freely.`,
        },
      ];
      toaster?.success("Message sent");
    }, 400);
  }
</script>

<div
  bind:this={shellEl}
  class="min-h-screen flex flex-col bg-[var(--scifi-bg)] text-[var(--scifi-text)]"
>
  <div id="toasts" class="toast toast-top toast-end" aria-live="polite"></div>

  <header class="app-bar sticky top-0 z-20" data-enter>
    <div class="flex items-center gap-3 min-w-0">
      <span class="brand-mark text-base">ScifiUI</span>
      <span class="badge badge-primary">Svelte</span>
      <span class="status-chip">
        <span class="dot"></span> live
      </span>
    </div>
    <div class="flex items-center gap-2">
      <select class="select w-auto py-1.5 text-xs min-w-[9rem]" bind:value={theme}>
        {#each THEMES as t}
          <option value={t}>{t}</option>
        {/each}
      </select>
      <button
        type="button"
        class="btn btn-ghost btn-xs {perfLite ? 'btn-primary' : ''}"
        onclick={() => (perfLite = !perfLite)}
      >
        Perf
      </button>
      <div class="dropdown dropdown-end">
        <button type="button" class="icon-btn" data-dropdown-trigger aria-label="Actions">
          <IconSettings size={16} stroke={1.75} />
        </button>
        <div class="dropdown-menu">
          <ul class="menu">
            <li class="menu-label">Channel</li>
            <li>
              <button
                type="button"
                class="menu-item"
                onclick={() => toaster?.info("Channel idle")}>Toast info</button
              >
            </li>
            <li>
              <button
                type="button"
                class="menu-item"
                onclick={() => toaster?.success("Synced")}>Toast success</button
              >
            </li>
            <li>
              <hr class="menu-divider" />
            </li>
            <li>
              <button type="button" class="menu-item" onclick={() => (modalOpen = true)}
                >Open modal</button
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>

  <main class="mx-auto w-full max-w-5xl px-4 py-8 space-y-6 flex-1">
    <section
      class="relative overflow-hidden rounded-xl border border-[var(--scifi-border)] p-8"
      data-enter
    >
      <div class="grid-floor opacity-50"></div>
      <div class="vignette"></div>
      <div class="relative z-10">
        <p class="label-kicker neon-flicker text-scifi-primary mb-2">Framework demo</p>
        <h1
          class="hero-title hero-title-glitch text-4xl font-extrabold tracking-tight mb-3"
          data-text="Svelte"
        >
          Svelte
        </h1>
        <p class="text-scifi-muted text-sm max-w-lg mb-5">
          <code class="text-scifi-cyan">@scifiui/core</code> is CSS-class based — use it from Svelte
          the same way you would HTML.
        </p>
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="feature-pill">Glass panes</span>
          <span class="feature-pill">9 themes</span>
          <span class="feature-pill">GSAP enter</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <button type="button" class="btn btn-primary" onclick={() => toaster?.success("Launch")}>
            <IconRocket size={16} stroke={1.75} /> Launch
          </button>
          <button type="button" class="btn-cta" onclick={() => (modalOpen = true)}>
            Open channel
          </button>
          <button type="button" class="btn btn-ghost">Ghost</button>
          <button type="button" class="btn btn-danger btn-sm">Abort</button>
          <span class="feature-pill">
            <IconCheck size={14} stroke={1.75} /> class="btn btn-primary"
          </span>
        </div>
      </div>
    </section>

    <div class="flex flex-wrap gap-2 items-center" data-enter>
      <button type="button" class="btn btn-sm">Default</button>
      <button type="button" class="btn btn-sm btn-primary">Primary</button>
      <button type="button" class="btn btn-sm btn-ghost">Ghost</button>
      <button type="button" class="btn btn-xs">XS</button>
      <button type="button" class="icon-btn" aria-label="Home">
        <IconHome size={16} stroke={1.75} />
      </button>
      <button type="button" class="icon-btn active" aria-label="Stats">
        <IconChartBar size={16} stroke={1.75} />
      </button>
      <span class="badge">Default</span>
      <span class="badge badge-primary">Primary</span>
      <span class="badge badge-success">Ok</span>
      <span class="badge badge-warning">Warn</span>
      <span class="badge badge-error">Err</span>
      <span class="loading" aria-label="Loading"></span>
      <span class="loading-dots" aria-label="Loading">
        <span></span><span></span><span></span>
      </span>
      <span>
        <kbd class="kbd">⌘</kbd> <kbd class="kbd">K</kbd>
      </span>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <div class="pane pane-bracketed" data-enter>
        <div class="pane-header">
          <span class="pane-title">
            <span class="pane-title-bar"></span> Forms
          </span>
          <span class="badge badge-success">input</span>
        </div>
        <div class="pane-scan"></div>
        <div class="p-4 space-y-3">
          <label class="block">
            <span class="label-kicker block mb-1">Callsign</span>
            <input class="input" placeholder="pilot@nexus.space" />
          </label>
          <label class="block">
            <span class="label-kicker block mb-1">Band</span>
            <select class="select">
              <option>Alpha</option>
              <option>Bravo</option>
              <option>Charlie</option>
            </select>
          </label>
          <label class="block">
            <span class="label-kicker block mb-1">Brief</span>
            <textarea class="textarea" rows="2" placeholder="Mission notes…"></textarea>
          </label>
          <div class="flex flex-wrap gap-4 text-sm">
            <label class="flex items-center gap-2">
              <input type="checkbox" class="checkbox" checked /> Glow
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" class="toggle" checked /> Autopilot
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" class="radio" name="band" checked /> A
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" class="radio" name="band" /> B
            </label>
          </div>
          <label class="block">
            <span class="label-kicker block mb-1">Thrust</span>
            <input type="range" class="range" min="0" max="100" value="62" />
          </label>
        </div>
      </div>

      <div class="pane pane-bracketed flex flex-col min-h-[320px]" data-enter>
        <div class="pane-header">
          <span class="pane-title">
            <span class="pane-title-bar"></span> Chat
          </span>
          <span class="status-chip">
            <span class="dot"></span> agent
          </span>
        </div>
        <div class="chat flex-1 overflow-auto p-3">
          {#each chat as m}
            <div class={["chat-row", m.role === "you" ? "chat-end" : "chat-start"]}>
              <div class="chat-avatar">{m.role === "you" ? "YOU" : "AI"}</div>
              <div
                class={[
                  "chat-bubble",
                  m.role === "you" ? "chat-bubble-primary" : "chat-bubble-accent",
                ]}
              >
                <div class="chat-header">
                  <span class="chat-name">{m.role === "you" ? "You" : "Agent"}</span>
                </div>
                {m.text}
              </div>
            </div>
          {/each}
        </div>
        <form class="p-3 border-t border-[var(--scifi-border)] flex gap-2" onsubmit={send}>
          <input class="input" bind:value={message} placeholder="Message…" />
          <button type="submit" class="btn btn-primary shrink-0" aria-label="Send">
            <IconSend size={16} stroke={1.75} />
          </button>
        </form>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <div class="pane pane-bracketed" data-enter>
        <div class="pane-header">
          <span class="pane-title">
            <span class="pane-title-bar"></span> Files
          </span>
          <span class="badge">tree</span>
        </div>
        <div class="tree-view p-2" role="tree">
          <div class="tree-item open">
            <button type="button" class="tree-row" role="treeitem" aria-selected="false">
              <span class="tree-toggle" aria-expanded="true">
                <IconChevronRight size={14} stroke={1.75} />
              </span>
              <span class="tree-icon">
                <IconFolder size={14} stroke={1.75} />
              </span>
              <span class="tree-label">src</span>
            </button>
            <div class="tree-children" role="group">
              <div class="tree-item">
                <button
                  type="button"
                  class="tree-row selected"
                  role="treeitem"
                  aria-selected="true"
                >
                  <span class="tree-toggle is-leaf">
                    <IconChevronRight size={14} stroke={1.75} />
                  </span>
                  <span class="tree-icon">
                    <IconFile size={14} stroke={1.75} />
                  </span>
                  <span class="tree-label">App.svelte</span>
                </button>
              </div>
              <div class="tree-item">
                <button type="button" class="tree-row" role="treeitem" aria-selected="false">
                  <span class="tree-toggle is-leaf">
                    <IconChevronRight size={14} stroke={1.75} />
                  </span>
                  <span class="tree-icon">
                    <IconFile size={14} stroke={1.75} />
                  </span>
                  <span class="tree-label">styles.css</span>
                </button>
              </div>
            </div>
          </div>
          <div class="tree-item">
            <button type="button" class="tree-row" role="treeitem" aria-selected="false">
              <span class="tree-toggle is-leaf">
                <IconChevronRight size={14} stroke={1.75} />
              </span>
              <span class="tree-icon">
                <IconFile size={14} stroke={1.75} />
              </span>
              <span class="tree-label">README.md</span>
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-3" data-enter>
        <div class="alert alert-info text-xs">Info channel open — neon cyan border.</div>
        <div class="alert alert-success text-xs">Payload accepted.</div>
        <div class="alert alert-warning text-xs">Thermal warning on rail 3.</div>
        <div class="alert alert-error text-xs">Handshake failed.</div>
        <div class="console-panel p-4">
          <div class="scan-line"></div>
          <p class="label-kicker mb-2">Console panel</p>
          <p class="text-xs text-scifi-muted mb-3">Landing-shell surface with corner brackets.</p>
          <button type="button" class="btn btn-sm btn-primary" onclick={() => (modalOpen = true)}>
            <IconBolt size={14} stroke={1.75} /> Engage
          </button>
        </div>
      </div>
    </div>

    <div class="pane overflow-hidden" data-enter>
      <div class="tab-bar">
        {#each ["overview", "telemetry", "logs"] as id}
          <button
            type="button"
            class="tab {tab === id ? 'active' : ''}"
            onclick={() => (tab = id)}
          >
            {id[0].toUpperCase() + id.slice(1)}
          </button>
        {/each}
      </div>
      <div class="p-4 text-sm text-scifi-muted flex flex-wrap gap-4 items-center">
        {#if tab === "overview"}
          <progress class="progress progress-primary w-40" value="70" max="100"></progress>
          <div class="radial-progress" style="--value: 72" role="progressbar">
            <span>72%</span>
          </div>
          <div class="skeleton skeleton-text w-32"></div>
        {:else if tab === "telemetry"}
          <span>Uplink latency 12ms · band Alpha locked.</span>
        {:else if tab === "logs"}
          <span class="font-mono text-xs">[ok] handshake · [warn] thermal rail 3</span>
        {/if}
      </div>
    </div>

    <div class="grid sm:grid-cols-3 gap-3" data-enter>
      <div class="metric-card">
        <div class="card-head">
          <div class="card-label">
            <span class="label-bar"></span>
            Components
          </div>
        </div>
        <div class="card-value text-xl">CSS classes</div>
      </div>
      <div class="metric-card">
        <div class="card-head">
          <div class="card-label">
            <span class="label-bar"></span>
            Themes
          </div>
        </div>
        <div class="card-value text-xl">9 palettes</div>
      </div>
      <div class="metric-card">
        <div class="card-head">
          <div class="card-label">
            <span class="label-bar"></span>
            Motion
          </div>
        </div>
        <div class="card-value text-xl">GSAP helpers</div>
      </div>
    </div>
  </main>

  <footer class="status-bar shrink-0 border-t border-[var(--scifi-border)]" data-enter>
    <div class="status-bar-section">
      <span class="status-bar-item">
        <strong>@scifiui/demo-svelte</strong>
      </span>
      <span class="status-chip">
        <span class="dot"></span> synced
      </span>
    </div>
    <div class="status-bar-section">
      <span class="status-bar-item">{theme}</span>
      <span class="status-bar-item">Svelte 5</span>
    </div>
  </footer>

  {#if modalOpen}
    <div
      class="modal-backdrop"
      role="dialog"
      aria-modal="true"
      onclick={(e) => {
        if (e.target === e.currentTarget) modalOpen = false;
      }}
    >
      <div class="modal">
        <h3 class="modal-title">Confirm uplink</h3>
        <p class="modal-body">Establish encrypted channel with ScifiUI tokens?</p>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" onclick={() => (modalOpen = false)}
            >Cancel</button
          >
          <button
            type="button"
            class="btn btn-primary"
            onclick={() => {
              modalOpen = false;
              toaster?.success("Uplink established");
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
