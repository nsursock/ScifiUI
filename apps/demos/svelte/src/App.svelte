<script>
  import { onMount } from "svelte";
  import IconRocket from "@tabler/icons-svelte/icons/rocket";
  import IconSettings from "@tabler/icons-svelte/icons/settings";
  import IconSend from "@tabler/icons-svelte/icons/send";
  import IconCheck from "@tabler/icons-svelte/icons/check";
  import { createToaster, initDropdowns } from "@scifiui/core/js";

  const THEMES = [
    "retrowave",
    "synthwave84",
    "ghibli",
    "fiesta",
    "goldenTwilight",
    "solarizedDark",
  ];

  let theme = $state("retrowave");
  let message = $state("");
  let chat = $state([
    { role: "ai", text: "Svelte demo online. Same ScifiUI classes — your markup, our look." },
  ]);
  let toaster;

  $effect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  });

  onMount(() => {
    toaster = createToaster(document.getElementById("toasts"));
    initDropdowns();
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
        { role: "ai", text: `Ack from Svelte: “${text}”. Classes stack with Tailwind utilities.` },
      ];
      toaster?.success("Message sent");
    }, 400);
  }
</script>

<div id="toasts" class="toast toast-top toast-end" aria-live="polite"></div>

<header class="app-bar sticky top-0">
  <div class="flex items-center gap-3">
    <span class="brand-mark text-base">ScifiUI</span>
    <span class="badge badge-primary">Svelte</span>
    <span class="status-chip"><span class="dot"></span> live</span>
  </div>
  <div class="flex items-center gap-2">
    <select class="select w-auto py-1.5 text-xs" bind:value={theme}>
      {#each THEMES as t}
        <option value={t}>{t}</option>
      {/each}
    </select>
    <div class="dropdown dropdown-end">
      <button type="button" class="icon-btn" data-dropdown-trigger aria-label="Actions">
        <IconSettings size={16} />
      </button>
      <div class="dropdown-menu">
        <ul class="menu">
          <li>
            <button type="button" class="menu-item" onclick={() => toaster?.info("Channel idle")}
              >Toast info</button
            >
          </li>
          <li>
            <button type="button" class="menu-item" onclick={() => toaster?.success("Synced")}
              >Toast success</button
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</header>

<main class="mx-auto max-w-5xl px-4 py-8 space-y-6">
  <section class="relative overflow-hidden rounded-xl border border-[var(--scifi-border)] p-8">
    <div class="grid-floor opacity-50"></div>
    <div class="vignette"></div>
    <div class="relative z-10">
      <p class="label-kicker neon-flicker text-scifi-primary mb-2">Framework demo</p>
      <h1 class="hero-title text-4xl font-extrabold tracking-tight mb-3">Svelte</h1>
      <p class="text-scifi-muted text-sm max-w-lg mb-5">
        <code class="text-scifi-cyan">@scifiui/core</code> is CSS-class based — use it from Svelte
        the same way you would HTML.
      </p>
      <div class="flex flex-wrap gap-2">
        <button type="button" class="btn btn-primary" onclick={() => toaster?.success("Launch")}>
          <IconRocket size={16} /> Launch
        </button>
        <button type="button" class="btn-cta">CTA</button>
        <button type="button" class="btn btn-ghost">Ghost</button>
        <span class="feature-pill"><IconCheck size={14} /> class="btn btn-primary"</span>
      </div>
    </div>
  </section>

  <div class="grid md:grid-cols-2 gap-4">
    <div class="pane pane-bracketed">
      <div class="pane-header">
        <span class="pane-title"><span class="pane-title-bar"></span> Forms</span>
      </div>
      <div class="p-4 space-y-3">
        <label class="block">
          <span class="label-kicker block mb-1">Callsign</span>
          <input class="input" placeholder="pilot@nexus.space" />
        </label>
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" class="toggle" checked /> Autopilot
        </label>
        <div class="alert alert-info text-xs">Same tokens: --scifi-primary, data-theme</div>
      </div>
    </div>

    <div class="pane pane-bracketed flex flex-col min-h-[280px]">
      <div class="pane-header">
        <span class="pane-title"><span class="pane-title-bar"></span> Chat</span>
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
              {m.text}
            </div>
          </div>
        {/each}
      </div>
      <form class="p-3 border-t border-[var(--scifi-border)] flex gap-2" onsubmit={send}>
        <input class="input" bind:value={message} placeholder="Message…" />
        <button type="submit" class="btn btn-primary shrink-0" aria-label="Send">
          <IconSend size={16} />
        </button>
      </form>
    </div>
  </div>

  <div class="grid sm:grid-cols-3 gap-3">
    <div class="metric-card">
      <div class="card-head">
        <div class="card-label"><span class="label-bar"></span> Components</div>
      </div>
      <div class="card-value text-xl">CSS classes</div>
    </div>
    <div class="metric-card">
      <div class="card-head">
        <div class="card-label"><span class="label-bar"></span> Themes</div>
      </div>
      <div class="card-value text-xl">9 palettes</div>
    </div>
    <div class="metric-card">
      <div class="card-head">
        <div class="card-label"><span class="label-bar"></span> JS helpers</div>
      </div>
      <div class="card-value text-xl">optional</div>
    </div>
  </div>
</main>
