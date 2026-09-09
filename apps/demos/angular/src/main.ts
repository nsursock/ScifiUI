import "@angular/compiler";
import "zone.js";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideZoneChangeDetection } from "@angular/core";
import { AppComponent } from "./app.component";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/jetbrains-mono/800.css";
import "@tabler/icons-webfont/dist/tabler-icons.min.css";
import "./styles.css";

bootstrapApplication(AppComponent, {
  providers: [provideZoneChangeDetection()],
}).catch((err) => {
  console.error(err);
  const el = document.createElement("pre");
  el.style.cssText =
    "padding:1rem;color:#ff5555;background:#050010;white-space:pre-wrap;font:14px monospace";
  el.textContent = String(err?.stack || err);
  document.body.replaceChildren(el);
});
