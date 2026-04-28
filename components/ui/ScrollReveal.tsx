"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type Variant = "fade-up" | "scale-up" | "fade-left";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
};

const variantClasses: Record<Variant, string> = {
  "fade-up": "translate-y-8",
  "scale-up": "translate-y-6 scale-[0.98]",
  "fade-left": "translate-x-8",
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.18 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const style = { transitionDelay: `${delay}ms` } as CSSProperties;

  return (
    <div
      ref={ref}
      style={style}
      className={`will-change-transform transition-all duration-700 ease-out motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 ${
        isVisible
          ? "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0"
          : `opacity-0 blur-[6px] ${variantClasses[variant]}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
