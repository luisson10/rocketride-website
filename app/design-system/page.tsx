import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart,
  BoltCircle,
  Check,
  Cloud,
  Code,
  GitBranch,
  Rocket,
  Save,
  Shield,
  X,
} from "@boxicons/react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { Logo } from "@/components/ui/Logo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SegmentedControlDemo } from "./SegmentedControlDemo";

export const metadata: Metadata = {
  title: "Design System — RocketRide",
  description:
    "Full visual reference of the RocketRide design system: tokens, primitives, components, and effects.",
};

// ---------- Local helpers (page-scoped, not part of the design system) ----------

function Section({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-16 border-b border-border">
      <div className="mx-auto max-w-[1200px] px-4">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-2xl text-text-dim">{description}</p>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Swatch({
  name,
  value,
  cls,
  text = "text-white",
}: {
  name: string;
  value: string;
  cls: string;
  text?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-20 rounded-[10px] border-steel-transparent ${cls} ${text} flex items-end p-3 text-xs font-mono`}
      >
        {value}
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-semibold">{name}</span>
        <span className="text-xs text-text-label font-mono">{value}</span>
      </div>
    </div>
  );
}

function Example({
  title,
  code,
  children,
}: {
  title: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-text">{title}</h3>
        <code className="text-[11px] text-text-label font-mono">{code}</code>
      </div>
      <Card className="flex items-center justify-center min-h-[140px]">
        <div className="flex flex-wrap items-center gap-4">{children}</div>
      </Card>
    </div>
  );
}

// ---------- Page ----------

export default function DesignSystemPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-20 pb-24 overflow-hidden">
          <div className="absolute inset-0 starfield opacity-40 pointer-events-none" />
          <div className="absolute inset-0 hero-radial pointer-events-none" />
          <div className="relative mx-auto max-w-[1200px] px-4">
            <SectionLabel>Design System</SectionLabel>
            <h1 className="mt-3 text-5xl sm:text-6xl font-semibold tracking-tight max-w-3xl">
              The complete visual language of RocketRide
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-text-dim">
              Every token, primitive, and effect that composes the product
              surface. Use this page as the single reference when extending the
              UI — if it is not on this page, it does not belong in the design
              system.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Badge>10px radius everywhere</Badge>
              <Badge>Steel gradient borders</Badge>
              <Badge>Boxicons only</Badge>
              <Badge>Figtree 400 / 500 / 600 / 700</Badge>
            </div>
          </div>
        </section>

        {/* Foundations — Colors */}
        <Section
          label="Foundations"
          title="Color tokens"
          description="Declared in app/globals.css under @theme. Tailwind v4 auto-generates bg-*, text-*, and border-* utilities from each --color-* variable."
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Swatch name="bg" value="#0f0f0f" cls="bg-bg border border-border" />
            <Swatch name="surface" value="#1a1a1a" cls="bg-surface" />
            <Swatch name="surface-2" value="#232323" cls="bg-surface-2" />
            <Swatch name="icon-tile" value="#1f1f1f" cls="bg-icon-tile" />
            <Swatch name="card" value="#373737" cls="bg-card" />
            <Swatch name="border" value="#2a2a2a" cls="bg-border" />
            <Swatch name="border-strong" value="#3a3a3a" cls="bg-border-strong" />
            <Swatch name="accent" value="#00b9ec" cls="bg-accent" text="text-black" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <Swatch name="text" value="#ffffff" cls="bg-text" text="text-black" />
            <Swatch name="text-muted" value="#cbcbcb" cls="bg-text-muted" text="text-black" />
            <Swatch name="text-dim" value="#afafaf" cls="bg-text-dim" text="text-black" />
            <Swatch name="text-label" value="#616161" cls="bg-text-label" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Swatch
              name="accent-soft"
              value="rgba(0,185,236,0.1)"
              cls="bg-accent-soft"
            />
            <Swatch
              name="accent-glow"
              value="rgba(0,185,236,0.35)"
              cls="bg-accent-glow"
            />
          </div>
        </Section>

        {/* Foundations — Typography */}
        <Section
          label="Foundations"
          title="Typography"
          description="Figtree via next/font/google, weights 400/500/600/700. One family for body + headings; a monospace stack only for the label-mono utility."
        >
          <div className="flex flex-col gap-6">
            <Card>
              <div className="text-5xl sm:text-6xl font-semibold tracking-tight">
                Display — text-6xl / 600
              </div>
            </Card>
            <Card>
              <div className="text-4xl font-semibold tracking-tight">
                Heading 1 — text-4xl / 600
              </div>
            </Card>
            <Card>
              <div className="text-2xl font-semibold">
                Heading 2 — text-2xl / 600
              </div>
            </Card>
            <Card>
              <div className="text-lg text-text-dim">
                Body lead — text-lg / text-text-dim
              </div>
            </Card>
            <Card>
              <div className="text-base text-text-muted">
                Body — text-base / text-text-muted
              </div>
            </Card>
            <Card>
              <div className="text-sm text-text-dim">
                Small — text-sm / text-text-dim
              </div>
            </Card>
            <Card>
              <div className="label-mono text-xs uppercase tracking-widest text-text-label">
                // label-mono — monospace, uppercase, tracking-widest
              </div>
            </Card>
          </div>
        </Section>

        {/* Foundations — Radius & Spacing */}
        <Section
          label="Foundations"
          title="Radius & shape"
          description="Every interactive or container surface uses rounded-[10px]. No pills, no full-round buttons, no mixed radii. This is the single most important rule of the system."
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "rounded-[10px]", cls: "rounded-[10px]" },
              { label: "rounded-[10px] + border-steel", cls: "rounded-[10px] border-steel" },
              { label: "IconTile 48 / 10px", cls: "" },
              { label: "Logo (SVG)", cls: "" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div
                  className={`h-24 ${
                    i === 0
                      ? "bg-card rounded-[10px]"
                      : i === 1
                        ? s.cls
                        : "bg-card rounded-[10px] flex items-center justify-center"
                  }`}
                >
                  {i === 2 && <IconTile icon={Rocket} />}
                  {i === 3 && <Logo height={22} />}
                </div>
                <span className="text-xs text-text-label font-mono">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Foundations — Borders */}
        <Section
          label="Foundations"
          title="Steel gradient borders"
          description="1px gradient (#4F4F53 → #B1B1B9 → #4F4F53) using the padding-box trick. Solid fill keeps the card readable, the border shines. Pick the variant whose fill matches the surface behind it."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-[10px] border-steel">
              <div className="text-sm font-semibold">.border-steel</div>
              <div className="mt-1 text-xs text-text-label font-mono">
                fill: var(--color-card)
              </div>
              <p className="mt-3 text-sm text-text-dim">
                Default card surface. Use for every Card, nav bar, and raised
                panel on the #0f0f0f background.
              </p>
            </div>
            <div className="p-6 rounded-[10px] border-steel-dark">
              <div className="text-sm font-semibold">.border-steel-dark</div>
              <div className="mt-1 text-xs text-text-label font-mono">
                fill: var(--color-icon-tile)
              </div>
              <p className="mt-3 text-sm text-text-dim">
                Use on nested surfaces or icon containers where the #1f1f1f
                fill reads better than the card grey.
              </p>
            </div>
            <div className="p-6 rounded-[10px] border-steel-transparent">
              <div className="text-sm font-semibold">
                .border-steel-transparent
              </div>
              <div className="mt-1 text-xs text-text-label font-mono">
                fill: transparent
              </div>
              <p className="mt-3 text-sm text-text-dim">
                Use when the parent already has a gradient or image and you
                only need the steel outline.
              </p>
            </div>
          </div>
        </Section>

        {/* Components — Buttons */}
        <Section
          label="Components"
          title="Button"
          description="Three variants, three sizes. Primary is cyan, secondary uses border-steel, ghost is text-only. All rounded-[10px]."
        >
          <div className="grid gap-6">
            <Example title="Variants" code="<Button variant='...' />">
              <Button variant="primary">
                Primary
                <ArrowRight className="text-lg" width="1em" height="1em" />
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </Example>

            <Example title="Sizes" code="<Button size='sm|md|lg' />">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </Example>

            <Example
              title="With icons"
              code="<Button><Rocket /></Button>"
            >
              <Button variant="primary">
                <Rocket className="text-lg" width="1em" height="1em" />
                Launch
              </Button>
              <Button variant="secondary">
                <Save className="text-lg" width="1em" height="1em" />
                Save
              </Button>
              <Button variant="ghost">
                Learn more
                <ArrowRight className="text-lg" width="1em" height="1em" />
              </Button>
            </Example>
          </div>
        </Section>

        {/* Components — Card */}
        <Section
          label="Components"
          title="Card"
          description="The single container primitive. border-steel + rounded-[10px] + p-6. If you need a container, this is it."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <IconTile icon={BoltCircle} />
              <h3 className="mt-5 text-lg font-semibold">Standard card</h3>
              <p className="mt-2 text-sm text-text-dim">
                Icon tile + heading + copy. This is the pattern used across
                Platform, CoreFeatures, and FeaturesGrid.
              </p>
            </Card>
            <Card>
              <Badge>New</Badge>
              <h3 className="mt-5 text-lg font-semibold">With a badge</h3>
              <p className="mt-2 text-sm text-text-dim">
                Use Badge for status pills, version tags, or section
                qualifiers. Never use rounded-full — always 10px.
              </p>
            </Card>
            <Card className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">Call-to-action card</h3>
                <p className="mt-2 text-sm text-text-dim">
                  Composition example — card with a trailing primary button.
                </p>
              </div>
              <div className="mt-6">
                <Button variant="primary" size="sm">
                  Start now
                  <ArrowRight className="text-lg" width="1em" height="1em" />
                </Button>
              </div>
            </Card>
          </div>
        </Section>

        {/* Components — Badge */}
        <Section
          label="Components"
          title="Badge"
          description="Accent-soft background, accent text, 10px radius. Not a pill — no rounded-full anywhere in the system."
        >
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge>v1.0</Badge>
            <Badge>Beta</Badge>
            <Badge>Coming soon</Badge>
            <Badge>New</Badge>
          </div>
        </Section>

        {/* Components — Icon & IconTile */}
        <Section
          label="Components"
          title="Icons & IconTile"
          description="Icons come from @boxicons/react — import each icon as a named React component. IconTile wraps an icon in a 48×48 bg-icon-tile square with 10px radius — NEVER a circle."
        >
          <div className="grid gap-6">
            <Example
              title="Icon sizes"
              code="import { Rocket } from '@boxicons/react'"
            >
              <Rocket className="text-lg" width="1em" height="1em" />
              <Rocket className="text-2xl" width="1em" height="1em" />
              <Rocket className="text-3xl" width="1em" height="1em" />
              <Rocket
                className="text-4xl text-accent"
                width="1em"
                height="1em"
              />
            </Example>

            <Example title="IconTile" code="<IconTile icon={Rocket} />">
              <IconTile icon={BoltCircle} />
              <IconTile icon={Code} />
              <IconTile icon={Shield} />
              <IconTile icon={BarChart} />
              <IconTile icon={GitBranch} />
              <IconTile icon={Cloud} />
            </Example>
          </div>
        </Section>

        {/* Components — SegmentedControl */}
        <Section
          label="Components"
          title="SegmentedControl"
          description='Controlled, "use client". Outer bg-card, active segment goes bg-black. Used on the WaysToBuild section tab switcher.'
        >
          <Card className="flex items-center justify-center min-h-[140px]">
            <SegmentedControlDemo />
          </Card>
        </Section>

        {/* Components — SectionLabel & Logo */}
        <Section
          label="Components"
          title="SectionLabel & Logo"
          description="Two small atoms used in page composition."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="mb-4 text-xs text-text-label font-mono">
                &lt;SectionLabel /&gt;
              </div>
              <SectionLabel>Section Label</SectionLabel>
              <p className="mt-4 text-sm text-text-dim">
                Monospace, uppercase, tracked wide. Automatically prefixes{" "}
                <code className="text-text-muted">// </code> — never add it
                yourself.
              </p>
            </Card>
            <Card>
              <div className="mb-4 text-xs text-text-label font-mono">
                &lt;Logo /&gt;
              </div>
              <div className="flex items-center gap-8">
                <Logo height={20} />
                <Logo height={28} />
                <Logo height={40} />
              </div>
              <p className="mt-4 text-sm text-text-dim">
                SVG rendered through next/image. Pass height — width is
                derived.
              </p>
            </Card>
          </div>
        </Section>

        {/* Effects */}
        <Section
          label="Effects"
          title="Glow & background utilities"
          description="The set of visual-only utilities available from globals.css. Apply sparingly — they are here to accent, not to decorate."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-56 rounded-[10px] border-steel overflow-hidden">
              <div className="absolute inset-0 starfield opacity-50" />
              <div className="relative p-6 text-sm font-mono text-text-label">
                .starfield
              </div>
            </div>
            <div className="relative h-56 rounded-[10px] border-steel overflow-hidden">
              <div className="absolute inset-0 hero-radial" />
              <div className="relative p-6 text-sm font-mono text-text-label">
                .hero-radial
              </div>
            </div>
            <div className="relative h-56 rounded-[10px] border-steel overflow-hidden">
              <div className="absolute inset-0 cta-radial" />
              <div className="relative p-6 text-sm font-mono text-text-label">
                .cta-radial
              </div>
            </div>
            <div className="relative h-56 rounded-[10px] border-steel overflow-hidden">
              <div className="absolute inset-0 vignette" />
              <div className="relative p-6 text-sm font-mono text-text-label">
                .vignette
              </div>
            </div>
            <div className="relative h-56 rounded-[10px] border-steel flex items-center justify-center">
              <div className="w-24 h-24 bg-accent rounded-[10px] glow-accent" />
              <div className="absolute top-4 left-4 text-sm font-mono text-text-label">
                .glow-accent
              </div>
            </div>
            <div className="relative h-56 rounded-[10px] border-steel flex items-center justify-center">
              <div className="w-20 h-20 bg-accent rounded-[10px] glow-accent-sm" />
              <div className="absolute top-4 left-4 text-sm font-mono text-text-label">
                .glow-accent-sm
              </div>
            </div>
          </div>
        </Section>

        {/* Rules */}
        <Section
          label="Rules"
          title="Do / Don't"
          description="Strict rules. If a contribution breaks one of these, the PR goes back."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center gap-2 text-accent font-semibold">
                <Check className="text-xl" width="1em" height="1em" />
                Do
              </div>
              <ul className="mt-4 space-y-2 text-sm text-text-muted list-disc list-inside">
                <li>Use rounded-[10px] on every surface and control.</li>
                <li>Use Card for every container.</li>
                <li>Use IconTile for icon+container patterns.</li>
                <li>Use named imports from @boxicons/react.</li>
                <li>Use border-steel variants for card outlines.</li>
                <li>Use Figtree — weights 400/500/600/700.</li>
              </ul>
            </Card>
            <Card>
              <div className="flex items-center gap-2 text-[#ff7a7a] font-semibold">
                <X className="text-xl" width="1em" height="1em" />
                Don&apos;t
              </div>
              <ul className="mt-4 space-y-2 text-sm text-text-muted list-disc list-inside">
                <li>No rounded-full, no pills, no mixed radii.</li>
                <li>No emoji or inline SVG icons — @boxicons/react only.</li>
                <li>No raw borders — always use a border-steel variant.</li>
                <li>No custom shadows outside glow-accent / glow-accent-sm.</li>
                <li>No new color tokens without updating @theme first.</li>
                <li>No new font families.</li>
              </ul>
            </Card>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
