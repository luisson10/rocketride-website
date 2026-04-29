import Link from "next/link";
import type { ComponentType } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  type BoxIconProps,
} from "@boxicons/react";
import { Logo } from "./ui/Logo";

const cols: { title: string; links: string[] }[] = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"],
  },
  {
    title: "Resources",
    links: ["Docs", "Guides", "Blog", "API Reference", "Community"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact", "Terms", "Privacy"],
  },
];

type Social = {
  href: string;
  label: string;
  icon: ComponentType<BoxIconProps>;
};

const socials: Social[] = [
  { href: "#", label: "GitHub", icon: Github },
  { href: "#", label: "X / Twitter", icon: Twitter },
  { href: "#", label: "LinkedIn", icon: Linkedin },
];

export function Footer() {
  return (
    <footer id="company" className="relative border-t border-border mt-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <Logo height={24} />
            </Link>
            <p className="mt-4 text-sm text-text-muted leading-relaxed max-w-xs">
              Build AI your whole team can run.
            </p>
            <div className="mt-5 flex items-center gap-2 text-text-muted">
              {socials.map((s) => {
                const SocialIcon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-[10px] bg-icon-tile flex items-center justify-center hover:text-accent transition-colors"
                  >
                    <SocialIcon className="text-lg" width="1em" height="1em" />
                  </a>
                );
              })}
            </div>
            <p className="mt-6 text-xs text-text-label">© 2026 RocketRide, Inc.</p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-text mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-text-dim hover:text-text transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
