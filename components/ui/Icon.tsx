type Props = {
  name: string;
  className?: string;
  "aria-hidden"?: boolean;
};

export function Icon({ name, className = "", ...rest }: Props) {
  return <i className={`bx ${name} ${className}`} aria-hidden {...rest} />;
}
