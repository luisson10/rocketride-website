"use client";

type Props = {
  items: string[];
  active: string;
  onChange: (item: string) => void;
  className?: string;
};

export function SegmentedControl({
  items,
  active,
  onChange,
  className = "",
}: Props) {
  return (
    <div
      className={`bg-card border-[0.5px] border-[rgba(53,53,53,0.25)] rounded-[10px] p-[5px] inline-flex gap-[5px] overflow-clip ${className}`}
    >
      {items.map((item) => {
        const isActive = item === active;
        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={
              "rounded-[10px] p-[10px] text-base font-semibold transition-colors " +
              (isActive
                ? "bg-black text-white"
                : "text-text-dim hover:text-white")
            }
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
