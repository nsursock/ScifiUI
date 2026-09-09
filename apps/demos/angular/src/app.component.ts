import {
  Component,
  AfterViewInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { createToaster, initDropdowns } from "@scifiui/core/js";

type ChatMsg = { role: "ai" | "you"; text: string };

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen" style="background: var(--scifi-bg); color: var(--scifi-text)">
      <div id="toasts" class="toast toast-top toast-end" aria-live="polite"></div>

      <header class="app-bar sticky top-0">
        <div class="flex items-center gap-3">
          <span class="brand-mark text-base">ScifiUI</span>
          <span class="badge badge-primary">Angular</span>
          <span class="status-chip"><span class="dot"></span> live</span>
        </div>
        <div class="flex items-center gap-2">
          <select class="select w-auto py-1.5 text-xs" [(ngModel)]="theme" (ngModelChange)="onTheme($event)">
            <option *ngFor="let t of themes" [value]="t">{{ t }}</option>
          </select>
          <div class="dropdown dropdown-end">
            <button type="button" class="icon-btn" data-dropdown-trigger aria-label="Actions">
              <i class="ti ti-settings"></i>
            </button>
            <div class="dropdown-menu">
              <ul class="menu">
                <li>
                  <button type="button" class="menu-item" (click)="toastInfo()">Toast info</button>
                </li>
                <li>
                  <button type="button" class="menu-item" (click)="toastOk()">Toast success</button>
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
            <h1 class="hero-title text-4xl font-extrabold tracking-tight mb-3">Angular</h1>
            <p class="text-scifi-muted text-sm max-w-lg mb-5">
              <code class="text-scifi-cyan">&#64;scifiui/core</code> is CSS-class based — use it from
              Angular templates the same way you would HTML.
            </p>
            <div class="flex flex-wrap gap-2">
              <button type="button" class="btn btn-primary" (click)="toastOk()">
                <i class="ti ti-rocket"></i> Launch
              </button>
              <button type="button" class="btn-cta">CTA</button>
              <button type="button" class="btn btn-ghost">Ghost</button>
              <span class="feature-pill"><i class="ti ti-check"></i> class="btn btn-primary"</span>
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
                *ngFor="let m of chat; let i = index"
                class="chat-row"
                [class.chat-end]="m.role === 'you'"
                [class.chat-start]="m.role !== 'you'"
              >
                <div class="chat-avatar">{{ m.role === "you" ? "YOU" : "AI" }}</div>
                <div
                  class="chat-bubble"
                  [class.chat-bubble-primary]="m.role === 'you'"
                  [class.chat-bubble-accent]="m.role !== 'you'"
                >
                  {{ m.text }}
                </div>
              </div>
            </div>
            <form class="p-3 border-t border-[var(--scifi-border)] flex gap-2" (submit)="send($event)">
              <input class="input" [(ngModel)]="message" name="message" placeholder="Message…" />
              <button type="submit" class="btn btn-primary shrink-0" aria-label="Send">
                <i class="ti ti-send"></i>
              </button>
            </form>
          </div>
        </div>

        <div class="grid sm:grid-cols-3 gap-3">
          <div class="metric-card" *ngFor="let card of cards">
            <div class="card-head">
              <div class="card-label"><span class="label-bar"></span> {{ card.label }}</div>
            </div>
            <div class="card-value text-xl">{{ card.value }}</div>
          </div>
        </div>
      </main>
    </div>
  `,
})
export class AppComponent implements AfterViewInit {
  themes = [
    "retrowave",
    "synthwave84",
    "ghibli",
    "fiesta",
    "goldenTwilight",
    "solarizedDark",
  ];
  theme = "retrowave";
  message = "";
  chat: ChatMsg[] = [
    { role: "ai", text: "Angular demo online. Same ScifiUI classes — your markup, our look." },
  ];
  cards = [
    { label: "Components", value: "CSS classes" },
    { label: "Themes", value: "9 palettes" },
    { label: "JS helpers", value: "optional" },
  ];
  private toaster: ReturnType<typeof createToaster> | null = null;

  constructor() {
    this.onTheme(this.theme);
  }

  ngAfterViewInit() {
    const el = document.getElementById("toasts");
    if (el) this.toaster = createToaster(el);
    initDropdowns();
  }

  onTheme(id: string) {
    this.theme = id;
    document.documentElement.setAttribute("data-theme", id);
  }

  toastInfo() {
    this.toaster?.info("Channel idle");
  }

  toastOk() {
    this.toaster?.success("Synced");
  }

  send(e: Event) {
    e.preventDefault();
    const text = this.message.trim();
    if (!text) return;
    this.chat = [...this.chat, { role: "you", text }];
    this.message = "";
    setTimeout(() => {
      this.chat = [
        ...this.chat,
        {
          role: "ai",
          text: `Ack from Angular: “${text}”. Classes stack with Tailwind utilities.`,
        },
      ];
      this.toaster?.success("Message sent");
    }, 400);
  }
}
