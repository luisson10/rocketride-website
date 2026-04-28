import Link from "next/link";
import type { ReactNode, Ref } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  ref?: Ref<HTMLButtonElement | HTMLAnchorElement>;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] transition-all duration-200 whitespace-nowrap";

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-6 py-3 text-base",
};

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white font-semibold hover:bg-[#00a8d6]",
  secondary:
    "bg-icon-tile border border-accent text-white font-semibold shadow-[0_0_20px_rgba(0,185,236,0.15)] hover:bg-accent-soft hover:shadow-[0_0_28px_rgba(0,185,236,0.28)]",
  ghost: "text-text-muted hover:text-accent",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  onClick,
  ref,
  ...rest
}: Props) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        ref={ref as Ref<HTMLAnchorElement>}
        {...rest}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={cls}
      ref={ref as Ref<HTMLButtonElement>}
      {...rest}
    >
      {children}
    </button>
  );
}
