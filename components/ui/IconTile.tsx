import type { ComponentType } from "react";
import type { BoxIconProps } from "@boxicons/react";

type Props = {
  icon: ComponentType<BoxIconProps>;
  size?: number;
  className?: string;
  iconClassName?: string;
};

export function IconTile({
  icon: Icon,
  size = 48,
  className = "",
  iconClassName,
}: Props) {
  const defaultIconClass =
    size <= 36 ? "text-white text-base" : "text-white text-[22px]";
  return (
    <div
      className={`bg-icon-tile rounded-[10px] flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Icon
        className={iconClassName ?? defaultIconClass}
        width="1em"
        height="1em"
      />
    </div>
  );
}
