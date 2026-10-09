import type { Tables } from "@/lib/data";
import { Glyph } from "@/components/ui/Glyph";
import { Section, SectionHeading } from "@/components/ui/Section";

type Props = {
  section: Tables<"section_content"> | undefined;
  faqs: Tables<"faqs">[];
};

// Native <details> accordion: works without JavaScript; the first answer starts open.
export function Faq({ section, faqs }: Props) {
  if (!section || faqs.length === 0) return null;

  return (
    <Section
      id="preguntas"
      className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-start lg:gap-16"
      decoration={
        <Glyph className="top-4 -right-6 text-[130px] lg:top-auto lg:right-auto lg:-bottom-14 lg:-left-[30px] lg:text-[260px]">
          배움
        </Glyph>
      }
    >
      <SectionHeading
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
      />
      <div className="flex flex-col gap-2">
        {faqs.map((faq, i) => (
          <details key={faq.id} open={i === 0} className="card group">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 p-[18px] text-[17px] leading-6 font-bold lg:gap-6 lg:p-6 lg:text-xl lg:leading-7 [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <span
                aria-hidden
                className="text-[22px] text-brand-text lg:text-2xl"
              >
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">×</span>
              </span>
            </summary>
            <p className="px-[18px] pb-[18px] text-[15px] leading-6 text-muted lg:px-6 lg:pb-6 lg:text-base lg:leading-[26px]">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
