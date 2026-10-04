import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  createToaster,
  initDropdowns,
  initTreeView,
  enterShell,
} from "@scifiui/core/js";

type ChatMsg = { role: "ai" | "you"; text: string };

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      #shell
      class="min-h-screen flex flex-col bg-[var(--scifi-bg)] text-[var(--scifi-text)]"
    >
      <div id="toasts" class="toast toast-top toast-end" aria-live="polite"></div>

      <header class="app-bar sticky top-0 z-20" data-enter>
        <div class="flex items-center gap-3 min-w-0">
          <span class="brand-mark text-base">ScifiUI</span>
          <span class="badge badge-primary">Angular</span>
          <span class="status-chip">
            <span class="dot"></span> live
          </span>
        </div>
        <div class="flex items-center gap-2">
          <select
            class="select w-auto py-1.5 text-xs min-w-[9rem]"
            [(ngModel)]="theme"
            (ngModelChange)="onTheme($event)"
          >
            <option *ngFor="let t of themes" [value]="t">{{ t }}</option>
          </select>
          <button
            type="button"
            class="btn btn-ghost btn-xs"
            [class.btn-primary]="perfLite"
            (click)="togglePerf()"
          >
            Perf
          </button>
          <div class="dropdown dropdown-end">
            <button type="button" class="icon-btn" data-dropdown-trigger aria-label="Actions">
              <i class="ti ti-settings"></i>
            </button>
            <div class="dropdown-menu">
              <ul class="menu">
                <li class="menu-label">Channel</li>
                <li>
                  <button type="button" class="menu-item" (click)="toastInfo()">
                    Toast info
                  </button>
                </li>
                <li>
                  <button type="button" class="menu-item" (click)="toastOk()">
                    Toast success
                  </button>
                </li>
                <li>
                  <hr class="menu-divider" />
                </li>
                <li>
                  <button type="button" class="menu-item" (click)="modalOpen = true">
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
          <div class="grid-floor opacity-50"></div>
          <div class="vignette"></div>
          <div class="relative z-10">
            <p class="label-kicker neon-flicker text-scifi-primary mb-2">Framework demo</p>
            <h1
              class="hero-title hero-title-glitch text-4xl font-extrabold tracking-tight mb-3"
              data-text="Angular"
            >
              Angular
            </h1>
            <p class="text-scifi-muted text-sm max-w-lg mb-5">
              <code class="text-scifi-cyan">&#64;scifiui/core</code> is CSS-class based — use it from
              Angular templates the same way you would HTML.
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="feature-pill">Glass panes</span>
              <span class="feature-pill">9 themes</span>
              <span class="feature-pill">GSAP enter</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <button type="button" class="btn btn-primary" (click)="toastLaunch()">
                <i class="ti ti-rocket"></i> Launch
              </button>
              <button type="button" class="btn-cta" (click)="modalOpen = true">
                Open channel
              </button>
              <button type="button" class="btn btn-ghost">Ghost</button>
              <button type="button" class="btn btn-danger btn-sm">Abort</button>
              <span class="feature-pill">
                <i class="ti ti-check"></i> class="btn btn-primary"
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
            <i class="ti ti-home"></i>
          </button>
          <button type="button" class="icon-btn active" aria-label="Stats">
            <i class="ti ti-chart-bar"></i>
          </button>
          <span class="badge">Default</span>
          <span class="badge badge-primary">Primary</span>
          <span class="badge badge-success">Ok</span>
          <span class="badge badge-warning">Warn</span>
          <span class="badge badge-error">Err</span>
          <span class="loading" aria-label="Loading"></span>
          <span class="loading-dots" aria-label="Loading">
            <span></span>
            <span></span>
            <span></span>
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
                <input class="input" placeholder="pilot&#64;nexus.space" />
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
              <div
                *ngFor="let m of chat"
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
                  <div class="chat-header">
                    <span class="chat-name">{{ m.role === "you" ? "You" : "Agent" }}</span>
                  </div>
                  {{ m.text }}
                </div>
              </div>
            </div>
            <form
              class="p-3 border-t border-[var(--scifi-border)] flex gap-2"
              (submit)="send($event)"
            >
              <input
                class="input"
                [(ngModel)]="message"
                name="message"
                placeholder="Message…"
              />
              <button type="submit" class="btn btn-primary shrink-0" aria-label="Send">
                <i class="ti ti-send"></i>
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
                    <i class="ti ti-chevron-right"></i>
                  </span>
                  <span class="tree-icon">
                    <i class="ti ti-folder"></i>
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
                        <i class="ti ti-chevron-right"></i>
                      </span>
                      <span class="tree-icon">
                        <i class="ti ti-file"></i>
                      </span>
                      <span class="tree-label">app.component.ts</span>
                    </button>
                  </div>
                  <div class="tree-item">
                    <button type="button" class="tree-row" role="treeitem" aria-selected="false">
                      <span class="tree-toggle is-leaf">
                        <i class="ti ti-chevron-right"></i>
                      </span>
                      <span class="tree-icon">
                        <i class="ti ti-file"></i>
                      </span>
                      <span class="tree-label">styles.css</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="tree-item">
                <button type="button" class="tree-row" role="treeitem" aria-selected="false">
                  <span class="tree-toggle is-leaf">
                    <i class="ti ti-chevron-right"></i>
                  </span>
                  <span class="tree-icon">
                    <i class="ti ti-file"></i>
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
              <p class="text-xs text-scifi-muted mb-3">
                Landing-shell surface with corner brackets.
              </p>
              <button type="button" class="btn btn-sm btn-primary" (click)="modalOpen = true">
                <i class="ti ti-bolt"></i> Engage
              </button>
            </div>
          </div>
        </div>

        <div class="pane overflow-hidden" data-enter>
          <div class="tab-bar">
            <button
              *ngFor="let id of tabs"
              type="button"
              class="tab"
              [class.active]="tab === id"
              (click)="tab = id"
            >
              {{ id | titlecase }}
            </button>
          </div>
          <div class="p-4 text-sm text-scifi-muted flex flex-wrap gap-4 items-center">
            <ng-container *ngIf="tab === 'overview'">
              <progress class="progress progress-primary w-40" value="70" max="100"></progress>
              <div class="radial-progress" style="--value: 72" role="progressbar">
                <span>72%</span>
              </div>
              <div class="skeleton skeleton-text w-32"></div>
            </ng-container>
            <span *ngIf="tab === 'telemetry'">Uplink latency 12ms · band Alpha locked.</span>
            <span *ngIf="tab === 'logs'" class="font-mono text-xs"
              >[ok] handshake · [warn] thermal rail 3</span
            >
          </div>
        </div>

        <div class="grid sm:grid-cols-3 gap-3" data-enter>
          <div class="metric-card" *ngFor="let card of cards">
            <div class="card-head">
              <div class="card-label">
                <span class="label-bar"></span>
                {{ card.label }}
              </div>
            </div>
            <div class="card-value text-xl">{{ card.value }}</div>
          </div>
        </div>
      </main>

      <footer
        class="status-bar shrink-0 border-t border-[var(--scifi-border)]"
        data-enter
      >
        <div class="status-bar-section">
          <span class="status-bar-item">
            <strong>&#64;scifiui/demo-angular</strong>
          </span>
          <span class="status-chip">
            <span class="dot"></span> synced
          </span>
        </div>
        <div class="status-bar-section">
          <span class="status-bar-item">{{ theme }}</span>
          <span class="status-bar-item">Angular 19</span>
        </div>
      </footer>

      <div
        *ngIf="modalOpen"
        class="modal-backdrop"
        role="dialog"
        aria-modal="true"
        (click)="onBackdrop($event)"
      >
        <div class="modal">
          <h3 class="modal-title">Confirm uplink</h3>
          <p class="modal-body">Establish encrypted channel with ScifiUI tokens?</p>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" (click)="modalOpen = false">
              Cancel
            </button>
            <button type="button" class="btn btn-primary" (click)="confirmModal()">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent implements AfterViewInit {
  @ViewChild("shell") shell?: ElementRef<HTMLElement>;

  themes = [
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
  theme = "retrowave";
  message = "";
  tab = "overview";
  tabs = ["overview", "telemetry", "logs"];
  modalOpen = false;
  perfLite = false;
  chat: ChatMsg[] = [
    {
      role: "ai",
      text: "Angular demo online. ScifiUI is class-based — same look from templates as HTML.",
    },
  ];
  cards = [
    { label: "Components", value: "CSS classes" },
    { label: "Themes", value: "9 palettes" },
    { label: "Motion", value: "GSAP helpers" },
  ];
  private toaster: ReturnType<typeof createToaster> | null = null;

  constructor() {
    this.onTheme(this.theme);
  }

  ngAfterViewInit() {
    const el = document.getElementById("toasts");
    if (el) this.toaster = createToaster(el);
    initDropdowns();
    initTreeView();
    if (this.shell?.nativeElement) enterShell(this.shell.nativeElement);
  }

  onTheme(id: string) {
    this.theme = id;
    document.documentElement.setAttribute("data-theme", id);
  }

  togglePerf() {
    this.perfLite = !this.perfLite;
    document.documentElement.classList.toggle("perf-lite", this.perfLite);
  }

  toastInfo() {
    this.toaster?.info("Channel idle");
  }

  toastOk() {
    this.toaster?.success("Synced");
  }

  toastLaunch() {
    this.toaster?.success("Launch");
  }

  onBackdrop(e: MouseEvent) {
    if (e.target === e.currentTarget) this.modalOpen = false;
  }

  confirmModal() {
    this.modalOpen = false;
    this.toaster?.success("Uplink established");
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
          text: `Ack from Angular: “${text}”. Stack Tailwind utilities freely.`,
        },
      ];
      this.toaster?.success("Message sent");
    }, 400);
  }
}
