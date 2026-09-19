# AGENTS.md

Operating manual for coding agents working on ScifiUI. Prefer this file over guessing; link out to `README.md` for user-facing docs.

## Project overview

ScifiUI is a **daisyUI / FlyonUI-style** CSS class kit: Tailwind CSS v4 plugin + `--scifi-*` design tokens + component classes. Visual DNA comes from AdaanIDE (glass, neon, JetBrains Mono, corner brackets, nine Adaan themes + `seed-hub`). It is **framework-agnostic** — markup is the consumer’s; classes are ours. Optional tiny vanilla JS helpers live under `@scifiui/core/js`. First reference consumer: sibling repo **CadanADE**.

## Project structure

```
packages/core/          # @scifiui/core — tokens, base, components, Tailwind plugin, JS helpers
  src/themes.css        # --scifi-* tokens + [data-theme] blocks
  src/base.css          # typography, scrollbars, perf-lite / reduced-motion
  src/components/       # one CSS file per component family (@layer components)
                        # button, pane, input, badge, modal, nav, effects, tree, split,
                        # dropdown, tooltip, toast, loading, status, chat, drawer,
                        # command-palette, data, layout, media
  src/components.css    # aggregates component CSS
  src/index.css         # themes + base + components (consumer import)
  src/index.js          # Tailwind v4 @plugin entry (color utilities + thin addComponents)
  src/js/               # initDropdowns, initTreeView, createToaster, GSAP motion (enterShell, …)
apps/docs/              # Component gallery + theme switcher (port 5173)
apps/templates/
  landing/              # Marketing / launcher (5180)
  dashboard/            # Ops shell (5181)
  auth/                 # Auth console (5182)
  ide/                  # Interactive IDE demo — tree/split/chat/toast/drawer (5183)
apps/demos/
  react/                # React + Vite (5190)
  vue/                  # Vue + Vite (5191)
  svelte/               # Svelte + Vite (5192)
  angular/              # Angular + Vite (5193)
```

Deeper product docs: `README.md`. Do not invent a second design system; extend `@scifiui/core`.

## Setup & build

```bash
pnpm install
pnpm dev                 # docs gallery → http://localhost:5173
pnpm dev:landing         # → :5180
pnpm dev:dashboard       # → :5181
pnpm dev:auth            # → :5182
pnpm dev:ide             # → :5183
pnpm dev:react           # → :5190
pnpm dev:vue             # → :5191
pnpm dev:svelte          # → :5192
pnpm dev:angular         # → :5193
pnpm build               # build all workspace packages/apps
pnpm --filter @scifiui/docs build
pnpm --filter @scifiui/template-ide build
pnpm --filter @scifiui/demo-react build
```

Consumer install pattern (do not break this public API without an explicit request):

```css
@import "tailwindcss";
@plugin "@scifiui/core";
@import "@scifiui/core/index.css";
```

## Verification

There is no automated unit-test suite yet. Before finishing UI/CSS work:

```bash
pnpm --filter @scifiui/docs build
pnpm --filter @scifiui/template-ide build
```

- Build the app you changed (docs and/or the relevant template). Builds must succeed.
- Spot-check in the browser when behavior matters (theme switch, open/close, resize).
- Never claim a kill/timeout/failed build “passed.”
- Do not delete or weaken verification steps to make a change look green.

## Code style

- **Tokens first:** all colors, borders, glows, radii, and surfaces use `var(--scifi-*)` (and RGB companions). Never hardcode hex/rgb in component CSS except inside theme token definitions in `themes.css`.
- **Tailwind for layout** in demos (`flex`, `gap`, `p-4`); **kit classes for look** (`.btn`, `.pane`, …). Classes must stack with utilities (`btn btn-primary mt-4`).
- **CSS in `@layer components`** under `packages/core/src/components/`. Register new files in `components.css`.
- **JS helpers** stay tiny, optional, and framework-free. Export from `src/js/index.js` and `package.json` `exports`.
- **Icons:** Tabler only (`ti ti-*` / `@tabler/icons-*`). Do not use emoji as UI glyphs in demos or docs.
- Follow patterns in neighboring files. Do not reformat code you are not changing. Do not add comments that restate the code.
- Prefer JetBrains Mono via `@fontsource/jetbrains-mono` or `--scifi-font`; do not switch the default type stack casually.

## Design & promotion rules

- Default theme is **retrowave**. Keep all nine Adaan-derived themes in sync when adding tokens (same variable names, different values). The additive `seed-hub` cultural theme may override fonts/glow independently.
- Preserve signature motifs as optional classes: glass, brackets, scan-line, grid-floor, vignette, hero-title, neon-flicker, `perf-lite`.
- Promote a pattern into `@scifiui/core` only when it is **general chrome / data display / input** any sci-fi app would reuse (tree, split, toast, dropdown, …). Keep product-specific widgets (editor hosts, agent tool cards, approval FSMs) in the consuming app.
- v1 stays **class-based**, not a React/Svelte component npm API. Do not add a shadcn-style CLI/registry unless asked.
- Do not couple this package to AdaanIDE or CadanADE internals; sibling repos consume ScifiUI, not the reverse.

## Git workflow

- Never commit, push, or open a PR unless the user asks.
- Never update git config. Never use interactive git flags (`-i`).
- No AI co-author / “Generated with …” footers in commits or code comments.
- Prefer short, imperative commit messages that explain *why* when commits are requested.

## Boundaries

- Do not modify unrelated files or widen scope beyond the request.
- Do not add dependencies without asking.
- Never commit secrets, API keys, or `.env` files.
- If a command fails, report the failure. Do not guess or present assumptions as confirmed results.
- Do not turn demos into dashboards of clutter; one clear composition per template first viewport where design matters.
- Keep `AGENTS.md` and `README.md` truthful when commands, ports, or package layout change.
