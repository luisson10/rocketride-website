# Agent instructions — Rocketride website

## UI and design system (required)

Before changing or adding **any user-facing UI** (layout, styling, new components, copy placement, imagery), align with this project’s design system. Do not improvise a separate visual language.

### Source of truth

| What | Where |
|------|--------|
| **Color, typography, spacing scale, layout width** | `app/globals.css` — `@theme` block (`--color-*`, `--font-sans`, `--container-7xl`, etc.) |
| **Shared effects & utilities** | Same file: `.border-steel*`, `.starfield`, `.hero-radial`, `.glow-accent*`, `.label-mono`, `.vignette`, … |
| **shadcn / Radix tokens** | `app/globals.css` — `:root` / `.dark` and the `@theme inline` bridge (keep in sync; comments there explain conflicts) |
| **Project UI primitives** | `components/ui/` (`Button`, `Card`, `Badge`, `Icon`, dialogs, navigation menu, …) |
| **shadcn config** | `components.json` (aliases point at `@/components/ui`) |

### Practical rules

1. **Prefer existing primitives** — Extend or compose `components/ui/*` before adding parallel button/card/dialog patterns.
2. **Use theme tokens in Tailwind** — Favor classes mapped to the theme (e.g. `bg-bg`, `text-text`, `text-text-muted`, `border-border`, `bg-accent`, `bg-surface`) instead of one-off hex values unless matching an existing documented exception (e.g. steel gradient borders).
3. **Dark-first** — The site is dark-first; preserve contrast and the cyan accent (`accent`) as the primary interactive highlight unless a spec says otherwise.
4. **New third-party UI** — If adding shadcn components, run the CLI per `components.json` so styles land in `app/globals.css` and `components/ui/` consistently; then wire them to existing tokens.
5. **Layout** — Respect max width patterns already used (e.g. `max-w-[var(--container-7xl)]` or equivalent) for marketing sections.

When unsure, **read `app/globals.css` and the nearest existing section component** (e.g. `Hero`, `FeaturesGrid`) and mirror structure, spacing, and token usage.
