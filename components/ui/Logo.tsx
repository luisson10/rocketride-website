import Image from "next/image";

type Props = {
  height?: number;
  className?: string;
};

export function Logo({ height = 28, className = "" }: Props) {
  // The SVG aspect ratio is roughly ~5:1; we let height drive width.
  const width = Math.round(height * 5);
  return (
    <Image
      src="/rocketride-logo-white-tm.svg"
      alt="RocketRide"
      height={height}
      width={width}
      priority
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
