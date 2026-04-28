"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { IconTile } from "./ui/IconTile";
import { Logo } from "./ui/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { GetStartedDialog } from "./GetStartedDialog";

type DropdownItem = {
  href: string;
  icon: string;
  title: string;
  description: string;
};

const featuresItems: DropdownItem[] = [
  {
    href: "#features",
    icon: "bx-git-branch",
    title: "Pipelines",
    description: "Structured AI workflows you can version and reuse",
  },
  {
    href: "#features",
    icon: "bx-line-chart",
    title: "Observability",
    description: "Cost, latency, and quality metrics out of the box",
  },
  {
    href: "#features",
    icon: "bx-plug",
    title: "Integrations",
    description: "LLMs, vector DBs, agent frameworks",
  },
  {
    href: "#features",
    icon: "bx-cloud-upload",
    title: "Deployment",
    description: "One-click cloud deploy with elastic scaling",
  },
];

const resourcesItems: DropdownItem[] = [
  { href: "#resources", icon: "bx-book", title: "Documentation", description: "Guides, references, and integrations" },
  { href: "#resources", icon: "bx-code-alt", title: "API Reference", description: "Every endpoint, every parameter" },
  { href: "#resources", icon: "bx-bulb", title: "Guides", description: "Step-by-step walkthroughs" },
  { href: "#resources", icon: "bx-news", title: "Blog", description: "Product updates and engineering posts" },
  { href: "#resources", icon: "bx-group", title: "Community", description: "Join thousands of builders" },
];

const companyItems: DropdownItem[] = [
  { href: "#company", icon: "bx-building", title: "About", description: "Our story and mission" },
  { href: "#company", icon: "bx-briefcase", title: "Careers", description: "Join the team" },
  { href: "#company", icon: "bx-happy", title: "Customers", description: "Who builds on RocketRide" },
  { href: "#company", icon: "bx-envelope", title: "Contact", description: "Get in touch" },
];

function DropdownItemRow({ item }: { item: DropdownItem }) {
  return (
    <NavigationMenuLink asChild>
      <Link href={item.href} className="group/link">
        <IconTile name={item.icon} size={32} className="shrink-0" />
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[15px] font-semibold text-white leading-tight">
            {item.title}
          </span>
          <span className="text-[13px] text-text-dim leading-snug">
            {item.description}
          </span>
        </div>
      </Link>
    </NavigationMenuLink>
  );
}

export function Nav() {
  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="mx-auto max-w-[1200px]">
        <nav className="flex items-center justify-between gap-4 rounded-[10px] border border-border-strong bg-surface/80 backdrop-blur-xl px-4 sm:px-5 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-base shrink-0"
          >
            <Logo height={28} />
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[480px] grid-cols-2 gap-2 p-2">
                    {featuresItems.map((item) => (
                      <li key={item.title}>
                        <DropdownItemRow item={item} />
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[360px] gap-1 p-2">
                    {resourcesItems.map((item) => (
                      <li key={item.title}>
                        <DropdownItemRow item={item} />
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[360px] gap-1 p-2">
                    {companyItems.map((item) => (
                      <li key={item.title}>
                        <DropdownItemRow item={item} />
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="#pricing">Pricing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/design-system">Design System</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              href="#contact"
              variant="secondary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Contact
            </Button>
            <GetStartedDialog>
              <Button variant="primary" size="sm">
                Get Started
                <Icon name="bx-right-arrow-alt" className="text-lg" />
              </Button>
            </GetStartedDialog>
          </div>
        </nav>
      </div>
    </header>
  );
}
