import type { Location, Tables } from "@/lib/data";
import { Glyph } from "@/components/ui/Glyph";
import { Section } from "@/components/ui/Section";
import { FreeClassFields } from "./FreeClassFields";

type Props = {
  section: Tables<"section_content"> | undefined;
  settings: Tables<"site_settings"> | null;
  locations: Location[];
};

export function FreeClassForm({ section, settings, locations }: Props) {
  if (!section || locations.length === 0) return null;
  const checklist =
    section.body
      ?.split("\n")
      .map((line) => line.trim())
      .filter(Boolean) ?? [];

  return (
    <Section
      id="clase-gratis"
      className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-16"
      decoration={
        <Glyph className="top-5 -right-6 text-[140px] lg:top-auto lg:right-auto lg:-bottom-14 lg:-left-10 lg:text-[240px]">
          도장
        </Glyph>
      }
    >
      <div className="flex flex-col gap-5">
        {section.eyebrow && (
          <p className="eyebrow text-brand-text">{section.eyebrow}</p>
        )}
        <h2 className="text-[28px] leading-[34px] font-bold tracking-[-0.01em] lg:text-[40px] lg:leading-[46px]">
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="text-base leading-[26px] text-muted lg:text-lg lg:leading-[30px]">
            {section.subtitle}
          </p>
        )}
        {checklist.length > 0 && (
          <ul className="flex flex-col gap-3 lg:pt-2">
            {checklist.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-base">
                <span
                  aria-hidden
                  className={`size-2 shrink-0 rounded-full ${i === checklist.length - 1 ? "bg-info" : "bg-accent"}`}
                />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <FreeClassFields
        locations={locations.map((l) => ({ id: l.id, name: l.name }))}
        minAge={settings?.free_class_min_age ?? 1}
        maxAge={settings?.free_class_max_age ?? 120}
      />
    </Section>
  );
}
