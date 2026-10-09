// Large outlined Korean characters behind a section. Purely decorative template styling.
export function Glyph({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`glyph absolute -z-10 opacity-40 ${className}`}
    >
      {children}
    </span>
  );
}
