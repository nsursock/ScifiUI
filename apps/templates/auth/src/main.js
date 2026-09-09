import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/jetbrains-mono/800.css";
import "./styles.css";

document.querySelector("#app").innerHTML = `
  <div class="relative min-h-screen flex items-center justify-center px-4 py-12">
    <div class="grid-floor opacity-70"></div>
    <div class="vignette"></div>

    <div class="relative z-10 w-full max-w-md">
      <div class="text-center mb-8">
        <p class="label-kicker neon-flicker text-scifi-primary mb-2">Secure channel</p>
        <h1 class="hero-title text-3xl font-extrabold tracking-tight">Sign in</h1>
        <p class="text-scifi-muted text-sm mt-2">Authenticate to access the orbital console.</p>
      </div>

      <form class="console-panel p-6 md:p-8" id="auth-form">
        <div class="scan-line"></div>
        <label class="block mb-4">
          <span class="label-kicker block mb-1.5">Callsign / email</span>
          <input class="input" type="email" name="email" placeholder="pilot@nexus.space" required autocomplete="username" />
        </label>
        <label class="block mb-4">
          <span class="label-kicker block mb-1.5">Access key</span>
          <input class="input" type="password" name="password" placeholder="••••••••" required autocomplete="current-password" />
        </label>
        <div class="flex items-center justify-between mb-6 text-sm">
          <label class="flex items-center gap-2 text-scifi-muted">
            <input type="checkbox" class="checkbox" /> Remember
          </label>
          <a href="#" class="text-scifi-primary hover:underline text-xs">Reset key</a>
        </div>
        <button type="submit" class="btn-cta w-full mb-3">Authenticate</button>
        <button type="button" class="btn w-full btn-ghost">Create clearance</button>
      </form>

      <p class="text-center text-xs text-scifi-muted mt-6">
        Powered by <span class="brand-mark text-sm">ScifiUI</span>
      </p>
    </div>
  </div>
`;

document.querySelector("#auth-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('[type="submit"]');
  btn.textContent = "Linked ✓";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = "Authenticate";
    btn.disabled = false;
  }, 1600);
});
