import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/jetbrains-mono/800.css";
import { playLandingIntro, pulseConsole } from "@scifiui/core/js";
import "./styles.css";

document.querySelector("#app").innerHTML = `
  <div class="relative min-h-screen flex flex-col" id="landing-root">
    <div class="grid-floor"></div>
    <div class="vignette"></div>

    <header class="relative z-10 app-bar" data-enter>
      <span class="brand-mark text-base">NEXUS</span>
      <nav class="hidden sm:flex items-center gap-1">
        <a class="nav-link active" href="#">Home</a>
        <a class="nav-link" href="#features">Systems</a>
        <a class="nav-link" href="#console">Console</a>
      </nav>
      <button class="btn btn-primary btn-sm">Sign in</button>
    </header>

    <main class="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
      <p class="label-kicker neon-flicker text-scifi-primary mb-4">Orbital interface · v2.4</p>
      <h1 class="hero-title hero-title-glitch text-5xl md:text-7xl font-extrabold tracking-tight mb-4" data-text="NEXUS">NEXUS</h1>
      <p class="text-scifi-muted max-w-md mx-auto mb-8 text-sm md:text-base">
        Command surfaces for deep-space ops. Glass panes, neon telemetry, zero clutter.
      </p>
      <div class="flex flex-wrap justify-center gap-2 mb-10">
        <span class="feature-pill">Realtime HUD</span>
        <span class="feature-pill">Encrypted uplink</span>
        <span class="feature-pill">9 themes</span>
      </div>
      <div class="flex flex-wrap justify-center gap-3 mb-14">
        <a href="#console" class="btn-cta">Initialize</a>
        <a href="#features" class="btn btn-ghost">Explore systems</a>
      </div>

      <div class="grid grid-cols-3 gap-6 max-w-md w-full mb-16">
        <div class="stat-tile"><div class="stat-value">48</div><div class="stat-label">Nodes</div></div>
        <div class="stat-tile"><div class="stat-value">99.9</div><div class="stat-label">Uptime</div></div>
        <div class="stat-tile"><div class="stat-value">12ms</div><div class="stat-label">Latency</div></div>
      </div>

      <section id="features" class="w-full max-w-3xl grid md:grid-cols-3 gap-4 text-left mb-16">
        ${["Telemetry mesh", "Bracketed panes", "Theme engine"]
          .map(
            (t, i) => `
          <div class="metric-card float-y" style="animation-delay:${i * 0.2}s">
            <div class="card-head"><div class="card-label"><span class="label-bar"></span>${t}</div></div>
            <p class="text-sm text-scifi-muted">Adaan-grade glassmorphism with CSS variable rethemes.</p>
          </div>`
          )
          .join("")}
      </section>

      <section id="console" class="w-full max-w-lg">
        <div class="console-panel p-6 md:p-8 text-left" id="console-panel">
          <div class="scan-line"></div>
          <p class="label-kicker mb-3">Workspace console</p>
          <h2 class="text-xl font-extrabold mb-2 tracking-tight">Open a channel</h2>
          <p class="text-sm text-scifi-muted mb-5">Drop a path or connect an existing orbital workspace.</p>
          <input class="input mb-3" placeholder="/missions/outer-rim" />
          <button type="button" class="btn-cta w-full" id="engage">Engage</button>
        </div>
      </section>
    </main>

    <footer class="relative z-10 py-6 text-center text-xs text-scifi-muted">
      Built with <span class="text-scifi-primary">ScifiUI</span>
    </footer>
  </div>
`;

const root = document.querySelector("#landing-root");
if (root instanceof HTMLElement) playLandingIntro(root);

document.querySelector("#engage")?.addEventListener("click", () => {
  void pulseConsole(document.querySelector("#console-panel"));
});
