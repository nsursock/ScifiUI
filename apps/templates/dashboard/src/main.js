import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/jetbrains-mono/800.css";
import "@tabler/icons-webfont/dist/tabler-icons.min.css";
import { enterShell } from "@scifiui/core/js";
import "./styles.css";

document.querySelector("#app").innerHTML = `
  <div class="flex flex-col h-full" id="dash-root">
    <header class="app-bar shrink-0" data-enter>
      <div class="flex items-center gap-3">
        <span class="brand-mark">ORBIT</span>
        <span class="badge badge-primary">ops</span>
        <span class="status-chip"><span class="dot"></span> linked</span>
      </div>
      <div class="flex items-center gap-2">
        <select class="select w-auto py-1 text-xs" id="theme">
          <option value="retrowave">Retrowave</option>
          <option value="synthwave84">Synthwave</option>
          <option value="goldenTwilight">Twilight</option>
          <option value="solarizedDark">Solarized</option>
        </select>
        <button class="icon-btn" title="Alerts"><i class="ti ti-bell"></i></button>
        <button class="icon-btn active" title="Settings"><i class="ti ti-settings"></i></button>
      </div>
    </header>

    <div class="flex flex-1 min-h-0">
      <aside class="mode-rail shrink-0 hidden sm:flex" data-enter>
        <button class="icon-btn active" title="Overview"><i class="ti ti-home"></i></button>
        <button class="icon-btn" title="Fleet"><i class="ti ti-rocket"></i></button>
        <button class="icon-btn" title="Logs"><i class="ti ti-list"></i></button>
        <button class="icon-btn" title="Stats"><i class="ti ti-chart-bar"></i></button>
      </aside>

      <div class="flex-1 grid lg:grid-cols-[1fr_320px] gap-3 p-3 min-h-0 overflow-auto">
        <div class="flex flex-col gap-3 min-h-0">
          <div class="grid sm:grid-cols-3 gap-3">
            <div class="metric-card" data-enter>
              <div class="card-head"><div class="card-label"><span class="label-bar"></span> Active ships</div></div>
              <div class="card-value">24</div>
            </div>
            <div class="metric-card" data-enter>
              <div class="card-head"><div class="card-label"><span class="label-bar"></span> Fuel index</div></div>
              <div class="card-value">86%</div>
            </div>
            <div class="metric-card" data-enter>
              <div class="card-head"><div class="card-label"><span class="label-bar"></span> Anomalies</div></div>
              <div class="card-value text-scifi-warning">3</div>
            </div>
          </div>

          <div class="pane pane-bracketed flex-1 min-h-[280px]">
            <div class="pane-header">
              <span class="pane-title"><span class="pane-title-bar"></span> Fleet roster</span>
              <button class="btn btn-xs btn-ghost">Export</button>
            </div>
            <div class="pane-scan"></div>
            <div class="overflow-auto p-2">
              <table class="table-scifi">
                <thead>
                  <tr><th>Callsign</th><th>Sector</th><th>Status</th><th>ETA</th></tr>
                </thead>
                <tbody>
                  <tr><td>Raven-7</td><td>Orion</td><td><span class="badge badge-success">Nominal</span></td><td>00:14</td></tr>
                  <tr><td>Kestrel</td><td>Lyra</td><td><span class="badge badge-warning">Drift</span></td><td>01:02</td></tr>
                  <tr><td>Vesper</td><td>Cygnus</td><td><span class="badge badge-primary">Docked</span></td><td>—</td></tr>
                  <tr><td>Nova-3</td><td>Perseus</td><td><span class="badge badge-error">Alert</span></td><td>00:41</td></tr>
                  <tr><td>Helix</td><td>Orion</td><td><span class="badge badge-success">Nominal</span></td><td>02:18</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="pane pane-bracketed flex flex-col min-h-[240px]">
          <div class="pane-header">
            <span class="pane-title"><span class="pane-title-bar"></span> Comms</span>
          </div>
          <div class="flex-1 p-3 space-y-3 overflow-auto">
            <div class="alert alert-info text-xs">Uplink established on band 4.</div>
            <div class="alert alert-warning text-xs">Thermal spike on Raven-7 thruster B.</div>
            <div class="glass rounded-lg p-3 text-xs">
              <p class="label-kicker mb-1">Dispatch</p>
              <p class="text-scifi-muted">Hold periapsis burn until anomaly clears.</p>
            </div>
          </div>
          <div class="p-3 border-t border-[var(--scifi-border)] flex gap-2">
            <input class="input" placeholder="Transmit…" />
            <button class="btn btn-primary shrink-0">Send</button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

document.querySelector("#theme").addEventListener("change", (e) => {
  document.documentElement.setAttribute("data-theme", e.target.value);
});

enterShell(document.querySelector("#dash-root"));
