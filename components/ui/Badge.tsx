import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center bg-accent-soft text-accent rounded-[10px] px-3 py-1 text-sm font-semibold ${className}`}
    >
      {children}
    </span>
  );
}
