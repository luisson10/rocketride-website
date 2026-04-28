import type { HTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Card({ children, className = "", ...rest }: Props) {
  return (
    <div className={`border-steel rounded-[10px] p-6 ${className}`} {...rest}>
      {children}
    </div>
  );
}
