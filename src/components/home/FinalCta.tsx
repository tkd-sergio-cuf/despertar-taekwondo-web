import type { Tables } from "@/lib/data";

type Props = {
  section: Tables<"section_content"> | undefined;
  // WhatsApp link; without one the band is not shown.
  href: string | null;
};

export function FinalCta({ section, href }: Props) {
  if (!section || !href) return null;

  return (
    <section className="border-t-[1.5px] border-ink bg-mist">
      <div className="mx-auto w-full max-w-[1120px] px-4 py-12 md:px-8 lg:py-16 xl:px-0">
        <div className="relative flex flex-col gap-4 overflow-hidden rounded-[28px] bg-wine px-6 py-10 text-white lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-20 lg:py-[72px]">
          <span
            aria-hidden
            className="glyph absolute -top-[30px] -right-[30px] text-[200px] [-webkit-text-stroke-color:rgba(255,255,255,0.18)] lg:-top-[60px] lg:right-[220px] lg:text-[360px]"
          >
            도
          </span>
          <div className="relative flex max-w-[620px] flex-col gap-4">
            <h2 className="display m-0 text-[32px] leading-9 tracking-[-0.015em] lg:text-5xl lg:leading-[52px]">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="text-base leading-[26px] lg:text-lg lg:leading-[30px]">
                {section.subtitle}
              </p>
            )}
          </div>
          <a
            href={href}
            className="btn btn-brand relative shadow-[0_0_0_1.5px_rgba(255,255,255,0.5)]"
          >
            Escribir por WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
