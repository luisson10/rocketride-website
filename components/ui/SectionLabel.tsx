type Props = {
  children: string;
  className?: string;
};

export function SectionLabel({ children, className = "" }: Props) {
  return (
    <div
      className={`label-mono text-xs uppercase tracking-widest text-text-label ${className}`}
    >
      {`// ${children.replace(/^\/\/\s*/, "")}`}
    </div>
  );
}
