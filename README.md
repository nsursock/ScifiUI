# ScifiUI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-f69220?logo=pnpm&logoColor=white)](https://pnpm.io)

**Adaan-styled sci-fi CSS class kit** for Tailwind CSS v4 — same model as daisyUI / FlyonUI: class-based, CSS-variable themed, framework-agnostic (React, Vue, Svelte, Alpine, Angular, or plain HTML).

Glass panes · neon glows · corner brackets · JetBrains Mono · nine themes.

## Features

- **`--scifi-*` design tokens** — retheme globally or per `[data-theme]` without touching markup
- **Semantic classes** — `btn`, `pane`, `card`, `modal`, `navbar`, … compose with Tailwind utilities
- **Optional tiny JS** — dropdowns, tree view, toasts (`@scifiui/core/js`)
- **Docs + templates + demos** — gallery, landing, dashboard, auth, IDE shell, and framework demos

## Quick start

```bash
pnpm install
pnpm dev          # docs gallery → http://localhost:5173
```

### Use in your app

```bash
pnpm add @scifiui/core tailwindcss
```

```css
@import "tailwindcss";
@plugin "@scifiui/core";
@import "@scifiui/core/index.css";
```

```html
<html data-theme="retrowave">
  <button class="btn btn-primary">Launch</button>
  <div class="pane pane-bracketed p-4">HUD</div>
</html>
```

Load **JetBrains Mono** (or set `--scifi-font`) for the intended look.

## Monorepo

| Path | Package | Role |
|------|---------|------|
| [`packages/core`](packages/core) | `@scifiui/core` | Tokens, base, components, Tailwind plugin, JS helpers |
| [`apps/docs`](apps/docs) | — | Live component gallery + theme switcher |
| [`apps/templates/landing`](apps/templates/landing) | — | Marketing / launcher (`:5180`) |
| [`apps/templates/dashboard`](apps/templates/dashboard) | — | Ops dashboard shell (`:5181`) |
| [`apps/templates/auth`](apps/templates/auth) | — | Auth console (`:5182`) |
| [`apps/templates/ide`](apps/templates/ide) | — | Interactive IDE demo (`:5183`) |
| [`apps/demos/react`](apps/demos/react) | — | React demo (`:5190`) |
| [`apps/demos/vue`](apps/demos/vue) | — | Vue demo (`:5191`) |
| [`apps/demos/svelte`](apps/demos/svelte) | — | Svelte demo (`:5192`) |
| [`apps/demos/angular`](apps/demos/angular) | — | Angular demo (`:5193`) |

```bash
pnpm dev:landing
pnpm dev:dashboard
pnpm dev:auth
pnpm dev:ide
pnpm dev:react
pnpm dev:vue
pnpm dev:svelte
pnpm dev:angular
```

## Customize

Every color, glow, radius, and surface maps to a `--scifi-*` variable.

```css
:root {
  --scifi-primary: #ffb700;
  --scifi-glow: 0 0 18px rgba(255, 183, 0, 0.35);
  --scifi-radius: 0px;
}
```

**Themes** (set `data-theme` on `<html>`):

`retrowave` · `ghibli` · `fiesta` · `dawn` · `synthwave84` · `solarizedDark` · `cottonCandy` · `goldenTwilight` · `brightContrasts`

**Stack utilities:** `class="btn btn-primary mt-4 opacity-80"`

**Perf:** add `perf-lite` on `<html>` to drop blur/animations.

## Component classes

- **Actions:** `btn`, `btn-sm|xs`, `btn-primary|ghost|danger`, `btn-cta`, `icon-btn`, `fab`, `join`, `swap`
- **Surfaces:** `pane`, `pane-bracketed`, `glass`, `metric-card`, `console-panel`, `card`, `stack`
- **Forms:** `input`, `textarea`, `select`, `checkbox`, `toggle`, `radio`, `range`, `file-input`, `pin-input`, `fieldset`, `label`
- **Feedback:** `badge`, `alert`, `toast`, `loading`, `skeleton`, `progress`, `radial-progress`, `kbd`, `rating`, `indicator`
- **Nav:** `app-bar`, `navbar`, `tab-bar`, `breadcrumbs`, `footer`, `pagination`, `steps`, `timeline`, `status-bar`
- **Structure:** `tree-view`, `split`, `dropdown`, `menu`, `drawer`, `collapse`, `list`, `avatar`, `divider`, `command-palette`
- **Chat / overlay / media:** `chat`, `modal`, `tooltip`, `popover`, `mask`, `carousel`, `diff`
- **Effects:** `scan-line`, `grid-floor`, `vignette`, `hero-title`, `neon-flicker`, `link`, …

```js
import { initDropdowns, initTreeView, createToaster, createCommandPalette } from "@scifiui/core/js";
```

## Icons

Use **Tabler Icons** only (`ti ti-*` / `@tabler/icons-*`). Do not use emoji as UI glyphs in demos or docs.

## Architecture

```
--scifi-* tokens (themes.css)
        ↓
Tailwind plugin (color utilities) + @layer components
        ↓
Any framework’s HTML
```

## Contributing

See [`AGENTS.md`](AGENTS.md) for the operating manual (tokens-first CSS, verification builds, promotion rules).

## License

[MIT](LICENSE)
