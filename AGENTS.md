# Agent instructions — Rocketride website

## UI and design system (required)

Before changing or adding **any user-facing UI** (layout, styling, new components, copy placement, imagery), align with this project’s design system. Do not improvise a separate visual language.

### Source of truth

| What | Where |
|------|--------|
| **Color, typography, spacing scale, layout width** | `app/globals.css` — `@theme` block (`--color-*`, `--font-sans`, `--container-7xl`, etc.) |
| **Shared effects & utilities** | Same file: `.border-steel*`, `.starfield`, `.hero-radial`, `.glow-accent*`, `.label-mono`, `.vignette`, … |
| **shadcn / Radix tokens** | `app/globals.css` — `:root` / `.dark` and the `@theme inline` bridge (keep in sync; comments there explain conflicts) |
| **Project UI primitives** | `components/ui/` (`Button`, `Card`, `Badge`, `IconTile`, dialogs, navigation menu, …) |
| **Icon library** | `@boxicons/react` (NPM, version pinned). Named imports per icon; tree-shaken at build time. **Never** import the legacy CDN font. |
| **shadcn config** | `components.json` (aliases point at `@/components/ui`) |

### Practical rules

1. **Prefer existing primitives** — Extend or compose `components/ui/*` before adding parallel button/card/dialog patterns.
2. **Use theme tokens in Tailwind** — Favor classes mapped to the theme (e.g. `bg-bg`, `text-text`, `text-text-muted`, `border-border`, `bg-accent`, `bg-surface`) instead of one-off hex values unless matching an existing documented exception (e.g. steel gradient borders).
3. **Dark-first** — The site is dark-first; preserve contrast and the cyan accent (`accent`) as the primary interactive highlight unless a spec says otherwise.
4. **New third-party UI** — If adding shadcn components, run the CLI per `components.json` so styles land in `app/globals.css` and `components/ui/` consistently; then wire them to existing tokens.
5. **Layout** — Respect max width patterns already used (e.g. `max-w-[var(--container-7xl)]` or equivalent) for marketing sections.

When unsure, **read `app/globals.css` and the nearest existing section component** (e.g. `Hero`, `FeaturesGrid`) and mirror structure, spacing, and token usage.

### Icons (required)

All icons come from `@boxicons/react` as named React components. **Never** use icon-font classes (`<i class="bx ...">`), inline SVGs, emoji, or alternative icon libraries.

**Standard call site:**

```tsx
import { Rocket } from "@boxicons/react";

<Rocket className="text-lg" width="1em" height="1em" />
```

The `width="1em" height="1em"` pair lets the icon inherit `font-size` from the parent — that is how Tailwind's `text-lg`, `text-xl`, etc. drive icon size in this project. Do **not** rely on the package's default 24px or its `size` prop.

**Variants** — pass the `pack` prop only when needed:

| Original glyph family | How to render |
|---|---|
| `bx-*` (basic / outline) | Default — no `pack` prop |
| `bxs-*` (filled) | `<Star pack="filled" />` |
| `bxl-*` (brands) | Brand icon names default to the brands pack — `<Github />` is enough; pass `pack="brands"` only for clarity if you want |

**Arrays of icons (Nav dropdowns, tools lists, social links, etc.)** — store the **component reference**, not a string:

```tsx
import type { ComponentType } from "react";
import { GitBranch, type BoxIconProps, type IconPack } from "@boxicons/react";

type Item = { label: string; icon: ComponentType<BoxIconProps>; iconPack?: IconPack };

const items: Item[] = [
  { label: "Pipelines", icon: GitBranch },
];

// At render: capitalize so JSX treats it as a component
const ItemIcon = item.icon;
<ItemIcon pack={item.iconPack} className="text-base" width="1em" height="1em" />
```

**Icon-in-tile patterns** — use the `IconTile` primitive, which accepts the component via the `icon` prop:

```tsx
<IconTile icon={Rocket} size={48} />
```

**Before adding a new icon** — verify the PascalCase name exists in `@boxicons/react`. The package renames many original Boxicons (e.g. `bx-bot` → `Robot`, `bx-bulb` → `LightBulb`, `bx-data` → `Database`, `bx-right-arrow-alt` → `ArrowRight`). Check `node_modules/@boxicons/react/dist/types/icons/index.d.ts` or the live `/design-system` page for the canonical name.

## Playwright artifacts (required)

Anything Playwright produces — screenshots, accessibility snapshots, console logs, network traces, videos — **must** be written under `.playwright-mcp/` at the repo root. **Never** drop these files in the repo root or in `public/`, `app/`, etc.

| Artifact | Destination |
|---|---|
| Screenshots (`browser_take_screenshot`) | `.playwright-mcp/screenshots/<name>.png` |
| Accessibility snapshots (`browser_snapshot`) | `.playwright-mcp/<name>.md` (the MCP default) |
| Console logs, page snapshots, network logs | `.playwright-mcp/` (the MCP default) |
| Any other ad-hoc capture | `.playwright-mcp/` |

When calling a Playwright MCP tool that takes a `filename` argument, **always** prefix the path with `.playwright-mcp/screenshots/` (or another subfolder under `.playwright-mcp/`) — passing a bare filename like `"hero.png"` lands the file in the repo root, which is wrong.

The `.playwright-mcp/` folder is already in `.gitignore`, so anything under it stays out of version control by default. If you need to keep an artifact long-term, move it into the project deliberately and add a targeted gitignore exception.
