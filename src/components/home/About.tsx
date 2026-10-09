import type { Tables } from "@/lib/data";
import { Glyph } from "@/components/ui/Glyph";
import { Section } from "@/components/ui/Section";
import { StorageImage } from "@/components/ui/StorageImage";

type Props = {
  section: Tables<"section_content"> | undefined;
  principles: Tables<"values_principles">[];
  instructors: Tables<"instructors">[];
};

export function About({ section, principles, instructors }: Props) {
  if (!section && instructors.length === 0) return null;
  const paragraphs = section?.body?.split(/\n\s*\n/).filter(Boolean) ?? [];

  return (
    <Section
      id="nosotros"
      tone="mist"
      className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-16"
      decoration={
        <Glyph className="top-5 -right-[30px] text-[160px] lg:top-auto lg:right-auto lg:-bottom-[60px] lg:-left-10 lg:text-[240px]">
          도
        </Glyph>
      }
    >
      {section && (
        <div className="flex flex-col gap-5">
          {section.eyebrow && (
            <p className="eyebrow text-ochre">{section.eyebrow}</p>
          )}
          <h2 className="text-[28px] leading-[34px] font-bold tracking-[-0.01em] lg:text-[40px] lg:leading-[46px]">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-[17px] leading-7 text-muted lg:text-lg lg:leading-[30px]">
              {section.subtitle}
            </p>
          )}
          {paragraphs.map((text, i) => (
            <p
              key={i}
              className={
                i === 0 && !section.subtitle
                  ? "text-[17px] leading-7 text-muted lg:text-lg lg:leading-[30px]"
                  : "text-base leading-[26px] text-muted"
              }
            >
              {text}
            </p>
          ))}
          {principles.length > 0 && (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 lg:gap-x-6 lg:gap-y-3 lg:pt-2">
              {principles.map((principle, i) => (
                <li
                  key={principle.id}
                  className={`flex items-baseline gap-2.5 border-t border-line pt-2.5 lg:gap-3 lg:pt-3 ${
                    i === principles.length - 1 && principles.length % 2 === 1
                      ? "col-span-2 lg:col-span-1"
                      : ""
                  }`}
                >
                  <span
                    lang="ko"
                    className="hangul text-[13px] text-ochre lg:text-sm"
                  >
                    {principle.name_ko}
                  </span>
                  <span className="text-[15px] font-bold lg:text-base">
                    {principle.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {instructors.length > 0 && (
        <div className="flex flex-col gap-4 pt-4 lg:pt-0">
          <p className="eyebrow text-ochre">
            {instructors.length > 1 ? "Instructores" : "Instructor"}
          </p>
          {instructors.map((instructor) => (
            <article
              key={instructor.id}
              className="flex flex-col overflow-hidden rounded-[4px] bg-card shadow-raised"
            >
              <StorageImage
                path={instructor.photo_path}
                alt={instructor.photo_alt}
                sizes="(min-width: 1024px) 530px, 100vw"
                className="relative h-[280px] bg-mist lg:h-[380px]"
                imgClassName="object-cover object-top"
              />
              <div className="flex flex-col gap-2.5 p-5 lg:p-7">
                <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
                  <h3 className="text-xl leading-7 font-bold lg:text-[22px]">
                    {instructor.name}
                  </h3>
                  <span className="inline-flex items-center gap-2 self-start rounded-full bg-mist px-3 py-1.5 text-[13px] font-bold text-ochre lg:self-auto">
                    <span
                      aria-hidden
                      className="size-2.5 rounded-full bg-ink"
                    />
                    {instructor.rank}
                  </span>
                </div>
                <p className="text-base leading-[26px] text-muted">
                  {instructor.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
