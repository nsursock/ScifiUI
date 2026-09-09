<script setup>
import { ref, watch, onMounted } from "vue";
import { IconRocket, IconSettings, IconSend, IconCheck } from "@tabler/icons-vue";
import { createToaster, initDropdowns } from "@scifiui/core/js";

const THEMES = [
  "retrowave",
  "synthwave84",
  "ghibli",
  "fiesta",
  "goldenTwilight",
  "solarizedDark",
];

const theme = ref("retrowave");
const message = ref("");
const chat = ref([
  { role: "ai", text: "Vue demo online. Same ScifiUI classes — your markup, our look." },
]);

let toaster;

watch(
  theme,
  (t) => document.documentElement.setAttribute("data-theme", t),
  { immediate: true }
);

onMounted(() => {
  const el = document.getElementById("toasts");
  if (el) toaster = createToaster(el);
  initDropdowns();
});

function toastInfo() {
  toaster?.info("Channel idle");
}
function toastOk() {
  toaster?.success("Synced");
}
function launch() {
  toaster?.success("Launch");
}

function send(e) {
  e.preventDefault();
  const text = message.value.trim();
  if (!text) return;
  chat.value.push({ role: "you", text });
  message.value = "";
  setTimeout(() => {
    chat.value.push({
      role: "ai",
      text: `Ack from Vue: “${text}”. Classes stack with Tailwind utilities.`,
    });
    toaster?.success("Message sent");
  }, 400);
}
</script>

<template>
  <div>
    <div id="toasts" class="toast toast-top toast-end" aria-live="polite"></div>

    <header class="app-bar sticky top-0">
      <div class="flex items-center gap-3">
        <span class="brand-mark text-base">ScifiUI</span>
        <span class="badge badge-primary">Vue</span>
        <span class="status-chip"><span class="dot"></span> live</span>
      </div>
      <div class="flex items-center gap-2">
        <select class="select w-auto py-1.5 text-xs" v-model="theme">
          <option v-for="t in THEMES" :key="t" :value="t">{{ t }}</option>
        </select>
        <div class="dropdown dropdown-end">
          <button type="button" class="icon-btn" data-dropdown-trigger aria-label="Actions">
            <IconSettings :size="16" />
          </button>
          <div class="dropdown-menu">
            <ul class="menu">
              <li><button type="button" class="menu-item" @click="toastInfo">Toast info</button></li>
              <li><button type="button" class="menu-item" @click="toastOk">Toast success</button></li>
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
          <h1 class="hero-title text-4xl font-extrabold tracking-tight mb-3">Vue</h1>
          <p class="text-scifi-muted text-sm max-w-lg mb-5">
            <code class="text-scifi-cyan">@scifiui/core</code> is CSS-class based — use it from Vue
            templates the same way you would HTML.
          </p>
          <div class="flex flex-wrap gap-2">
            <button type="button" class="btn btn-primary" @click="launch">
              <IconRocket :size="16" /> Launch
            </button>
            <button type="button" class="btn-cta">CTA</button>
            <button type="button" class="btn btn-ghost">Ghost</button>
            <span class="feature-pill"><IconCheck :size="14" /> class="btn btn-primary"</span>
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
                {{ m.text }}
              </div>
            </div>
          </div>
          <form class="p-3 border-t border-[var(--scifi-border)] flex gap-2" @submit="send">
            <input class="input" v-model="message" placeholder="Message…" />
            <button type="submit" class="btn btn-primary shrink-0" aria-label="Send">
              <IconSend :size="16" />
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
  </div>
</template>
