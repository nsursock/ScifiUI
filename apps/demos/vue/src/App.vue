<script setup>
import { ref, watch, onMounted } from "vue";
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
} from "@tabler/icons-vue";
import { createToaster, initDropdowns, initTreeView, enterShell } from "@scifiui/core/js";

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

const theme = ref("retrowave");
const message = ref("");
const tab = ref("overview");
const modalOpen = ref(false);
const perfLite = ref(false);
const chat = ref([
  { role: "ai", text: "Vue demo online. ScifiUI is class-based — same look from templates as HTML." },
]);
const shellRef = ref(null);

let toaster;

watch(
  theme,
  (t) => document.documentElement.setAttribute("data-theme", t),
  { immediate: true }
);

watch(perfLite, (v) => {
  document.documentElement.classList.toggle("perf-lite", v);
});

onMounted(() => {
  const el = document.getElementById("toasts");
  if (el) toaster = createToaster(el);
  initDropdowns();
  initTreeView();
  if (shellRef.value) enterShell(shellRef.value);
});

function send(e) {
  e.preventDefault();
  const text = message.value.trim();
  if (!text) return;
  chat.value.push({ role: "you", text });
  message.value = "";
  setTimeout(() => {
    chat.value.push({
      role: "ai",
      text: `Ack from Vue: “${text}”. Stack Tailwind utilities freely.`,
    });
    toaster?.success("Message sent");
  }, 400);
}
</script>

<template>
  <div
    ref="shellRef"
    class="min-h-screen flex flex-col bg-[var(--scifi-bg)] text-[var(--scifi-text)]"
  >
    <div id="toasts" class="toast toast-top toast-end" aria-live="polite" />

    <header class="app-bar sticky top-0 z-20" data-enter>
      <div class="flex items-center gap-3 min-w-0">
        <span class="brand-mark text-base">ScifiUI</span>
        <span class="badge badge-primary">Vue</span>
        <span class="status-chip">
          <span class="dot" /> live
        </span>
      </div>
      <div class="flex items-center gap-2">
        <select class="select w-auto py-1.5 text-xs min-w-[9rem]" v-model="theme">
          <option v-for="t in THEMES" :key="t" :value="t">{{ t }}</option>
        </select>
        <button
          type="button"
          class="btn btn-ghost btn-xs"
          :class="{ 'btn-primary': perfLite }"
          @click="perfLite = !perfLite"
        >
          Perf
        </button>
        <div class="dropdown dropdown-end">
          <button type="button" class="icon-btn" data-dropdown-trigger aria-label="Actions">
            <IconSettings :size="16" :stroke="1.75" />
          </button>
          <div class="dropdown-menu">
            <ul class="menu">
              <li class="menu-label">Channel</li>
              <li>
                <button type="button" class="menu-item" @click="toaster?.info('Channel idle')">
                  Toast info
                </button>
              </li>
              <li>
                <button type="button" class="menu-item" @click="toaster?.success('Synced')">
                  Toast success
                </button>
              </li>
              <li>
                <hr class="menu-divider" />
              </li>
              <li>
                <button type="button" class="menu-item" @click="modalOpen = true">
                  Open modal
                </button>
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
        <div class="grid-floor opacity-50" />
        <div class="vignette" />
        <div class="relative z-10">
          <p class="label-kicker neon-flicker text-scifi-primary mb-2">Framework demo</p>
          <h1
            class="hero-title hero-title-glitch text-4xl font-extrabold tracking-tight mb-3"
            data-text="Vue"
          >
            Vue
          </h1>
          <p class="text-scifi-muted text-sm max-w-lg mb-5">
            <code class="text-scifi-cyan">@scifiui/core</code> is CSS-class based — use it from Vue
            templates the same way you would HTML.
          </p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="feature-pill">Glass panes</span>
            <span class="feature-pill">9 themes</span>
            <span class="feature-pill">GSAP enter</span>
          </div>
          <div class="flex flex-wrap gap-2">
            <button type="button" class="btn btn-primary" @click="toaster?.success('Launch')">
              <IconRocket :size="16" :stroke="1.75" /> Launch
            </button>
            <button type="button" class="btn-cta" @click="modalOpen = true">Open channel</button>
            <button type="button" class="btn btn-ghost">Ghost</button>
            <button type="button" class="btn btn-danger btn-sm">Abort</button>
            <span class="feature-pill">
              <IconCheck :size="14" :stroke="1.75" /> class="btn btn-primary"
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
          <IconHome :size="16" :stroke="1.75" />
        </button>
        <button type="button" class="icon-btn active" aria-label="Stats">
          <IconChartBar :size="16" :stroke="1.75" />
        </button>
        <span class="badge">Default</span>
        <span class="badge badge-primary">Primary</span>
        <span class="badge badge-success">Ok</span>
        <span class="badge badge-warning">Warn</span>
        <span class="badge badge-error">Err</span>
        <span class="loading" aria-label="Loading" />
        <span class="loading-dots" aria-label="Loading">
          <span /><span /><span />
        </span>
        <span>
          <kbd class="kbd">⌘</kbd> <kbd class="kbd">K</kbd>
        </span>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <div class="pane pane-bracketed" data-enter>
          <div class="pane-header">
            <span class="pane-title">
              <span class="pane-title-bar" /> Forms
            </span>
            <span class="badge badge-success">input</span>
          </div>
          <div class="pane-scan" />
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
              <textarea class="textarea" rows="2" placeholder="Mission notes…" />
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
              <span class="pane-title-bar" /> Chat
            </span>
            <span class="status-chip">
              <span class="dot" /> agent
            </span>
          </div>
          <div class="chat flex-1 overflow-auto p-3">
            <div
              v-for="(m, i) in chat"
              :key="i"
              :class="['chat-row', m.role === 'you' ? 'chat-end' : 'chat-start']"
            >
              <div class="chat-avatar">{{ m.role === "you" ? "YOU" : "AI" }}</div>
              <div
                :class="[
                  'chat-bubble',
                  m.role === 'you' ? 'chat-bubble-primary' : 'chat-bubble-accent',
                ]"
              >
                <div class="chat-header">
                  <span class="chat-name">{{ m.role === "you" ? "You" : "Agent" }}</span>
                </div>
                {{ m.text }}
              </div>
            </div>
          </div>
          <form class="p-3 border-t border-[var(--scifi-border)] flex gap-2" @submit="send">
            <input class="input" v-model="message" placeholder="Message…" />
            <button type="submit" class="btn btn-primary shrink-0" aria-label="Send">
              <IconSend :size="16" :stroke="1.75" />
            </button>
          </form>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <div class="pane pane-bracketed" data-enter>
          <div class="pane-header">
            <span class="pane-title">
              <span class="pane-title-bar" /> Files
            </span>
            <span class="badge">tree</span>
          </div>
          <div class="tree-view p-2" role="tree">
            <div class="tree-item open">
              <button type="button" class="tree-row" role="treeitem" aria-selected="false">
                <span class="tree-toggle" aria-expanded="true">
                  <IconChevronRight :size="14" :stroke="1.75" />
                </span>
                <span class="tree-icon">
                  <IconFolder :size="14" :stroke="1.75" />
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
                      <IconChevronRight :size="14" :stroke="1.75" />
                    </span>
                    <span class="tree-icon">
                      <IconFile :size="14" :stroke="1.75" />
                    </span>
                    <span class="tree-label">App.vue</span>
                  </button>
                </div>
                <div class="tree-item">
                  <button type="button" class="tree-row" role="treeitem" aria-selected="false">
                    <span class="tree-toggle is-leaf">
                      <IconChevronRight :size="14" :stroke="1.75" />
                    </span>
                    <span class="tree-icon">
                      <IconFile :size="14" :stroke="1.75" />
                    </span>
                    <span class="tree-label">styles.css</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="tree-item">
              <button type="button" class="tree-row" role="treeitem" aria-selected="false">
                <span class="tree-toggle is-leaf">
                  <IconChevronRight :size="14" :stroke="1.75" />
                </span>
                <span class="tree-icon">
                  <IconFile :size="14" :stroke="1.75" />
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
            <div class="scan-line" />
            <p class="label-kicker mb-2">Console panel</p>
            <p class="text-xs text-scifi-muted mb-3">Landing-shell surface with corner brackets.</p>
            <button type="button" class="btn btn-sm btn-primary" @click="modalOpen = true">
              <IconBolt :size="14" :stroke="1.75" /> Engage
            </button>
          </div>
        </div>
      </div>

      <div class="pane overflow-hidden" data-enter>
        <div class="tab-bar">
          <button
            v-for="id in ['overview', 'telemetry', 'logs']"
            :key="id"
            type="button"
            class="tab"
            :class="{ active: tab === id }"
            @click="tab = id"
          >
            {{ id[0].toUpperCase() + id.slice(1) }}
          </button>
        </div>
        <div class="p-4 text-sm text-scifi-muted flex flex-wrap gap-4 items-center">
          <template v-if="tab === 'overview'">
            <progress class="progress progress-primary w-40" value="70" max="100" />
            <div class="radial-progress" style="--value: 72" role="progressbar">
              <span>72%</span>
            </div>
            <div class="skeleton skeleton-text w-32" />
          </template>
          <span v-else-if="tab === 'telemetry'">Uplink latency 12ms · band Alpha locked.</span>
          <span v-else-if="tab === 'logs'" class="font-mono text-xs"
            >[ok] handshake · [warn] thermal rail 3</span
          >
        </div>
      </div>

      <div class="grid sm:grid-cols-3 gap-3" data-enter>
        <div class="metric-card">
          <div class="card-head">
            <div class="card-label">
              <span class="label-bar" />
              Components
            </div>
          </div>
          <div class="card-value text-xl">CSS classes</div>
        </div>
        <div class="metric-card">
          <div class="card-head">
            <div class="card-label">
              <span class="label-bar" />
              Themes
            </div>
          </div>
          <div class="card-value text-xl">9 palettes</div>
        </div>
        <div class="metric-card">
          <div class="card-head">
            <div class="card-label">
              <span class="label-bar" />
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
          <strong>@scifiui/demo-vue</strong>
        </span>
        <span class="status-chip">
          <span class="dot" /> synced
        </span>
      </div>
      <div class="status-bar-section">
        <span class="status-bar-item">{{ theme }}</span>
        <span class="status-bar-item">Vue 3</span>
      </div>
    </footer>

    <div
      v-if="modalOpen"
      class="modal-backdrop"
      role="dialog"
      aria-modal="true"
      @click.self="modalOpen = false"
    >
      <div class="modal">
        <h3 class="modal-title">Confirm uplink</h3>
        <p class="modal-body">Establish encrypted channel with ScifiUI tokens?</p>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" @click="modalOpen = false">Cancel</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="
              modalOpen = false;
              toaster?.success('Uplink established');
            "
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
