import type { ReactNode } from "react";

type Props = {
  id?: string;
  tone?: "paper" | "mist";
  className?: string;
  // Decoration positioned against the full-width band (e.g. a <Glyph>).
  decoration?: ReactNode;
  children: ReactNode;
};

// Full-width band with the design's top rule; content sits in a 1120px column.
export function Section({
  id,
  tone = "paper",
  className = "",
  decoration,
  children,
}: Props) {
  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden border-t-[1.5px] border-ink ${
        tone === "mist" ? "bg-mist" : "bg-paper"
      }`}
    >
      {decoration}
      <div
        className={`relative mx-auto w-full max-w-[1120px] px-4 py-16 md:px-8 lg:py-24 xl:px-0 ${className}`}
      >
        {children}
      </div>
    </section>
  );
}

type HeadingProps = {
  eyebrow?: string | null;
  title: string;
  subtitle?: string | null;
  eyebrowClassName?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  eyebrowClassName = "text-brand-text",
  as = "h2",
}: HeadingProps) {
  const Heading = as;
  return (
    <div className="flex max-w-[620px] flex-col gap-2.5 lg:gap-3">
      {eyebrow && <p className={`eyebrow ${eyebrowClassName}`}>{eyebrow}</p>}
      <Heading className="text-[28px] font-bold leading-[34px] tracking-[-0.01em] lg:text-[40px] lg:leading-[46px]">
        {title}
      </Heading>
      {subtitle && (
        <p className="text-base leading-[26px] text-muted lg:text-lg lg:leading-[30px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
