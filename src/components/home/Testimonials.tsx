import type { Tables } from "@/lib/data";
import { Glyph } from "@/components/ui/Glyph";
import { StarIcon } from "@/components/ui/icons";
import { Section, SectionHeading } from "@/components/ui/Section";

type Props = {
  section: Tables<"section_content"> | undefined;
  testimonials: Tables<"testimonials">[];
};

export function Testimonials({ section, testimonials }: Props) {
  if (!section || testimonials.length === 0) return null;

  return (
    <Section
      id="testimonios"
      tone="mist"
      className="flex flex-col gap-5 lg:gap-12"
      decoration={
        <Glyph className="top-4 -right-6 text-[130px] lg:top-auto lg:right-auto lg:-bottom-[60px] lg:-left-10 lg:text-[240px]">
          제자
        </Glyph>
      }
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <SectionHeading eyebrow={section.eyebrow} title={section.title} />
        {section.subtitle && (
          <span className="self-start rounded-full px-3 py-1.5 text-xs font-bold text-muted shadow-[inset_0_0_0_1px_var(--color-line-strong)] lg:self-auto lg:bg-card lg:text-[13px]">
            {section.subtitle}
          </span>
        )}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {testimonials.map((t) => (
          <figure
            key={t.id}
            className="card m-0 flex flex-col gap-4 p-[22px] lg:gap-6 lg:p-8"
          >
            <div
              role="img"
              aria-label={`${t.rating} de 5 estrellas`}
              className="flex gap-[3px] lg:gap-1"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <StarIcon key={n} filled={n <= t.rating} />
              ))}
            </div>
            <blockquote className="m-0 grow text-base leading-[26px] lg:text-lg lg:leading-[30px]">
              “{t.quote}”
            </blockquote>
            <figcaption className="flex flex-col gap-0.5 border-t border-line pt-3 lg:gap-1 lg:pt-4">
              <span className="text-[15px] font-bold lg:text-base">
                {t.author_name}
              </span>
              <span className="text-[13px] font-medium text-muted lg:text-sm">
                {t.author_meta}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
