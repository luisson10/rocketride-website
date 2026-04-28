import { Icon } from "./Icon";

type Props = {
  name: string;
  size?: number;
  className?: string;
  iconClassName?: string;
};

export function IconTile({
  name,
  size = 48,
  className = "",
  iconClassName,
}: Props) {
  // Scale the glyph to roughly 46% of the tile so smaller tiles (32px) don't
  // overflow with the default 22px glyph size.
  const defaultIconClass =
    size <= 36 ? "text-white text-base" : "text-white text-[22px]";
  return (
    <div
      className={`bg-icon-tile rounded-[10px] flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Icon name={name} className={iconClassName ?? defaultIconClass} />
    </div>
  );
}
