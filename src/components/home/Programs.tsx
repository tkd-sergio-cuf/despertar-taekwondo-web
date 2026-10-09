import type { Program, Tables } from "@/lib/data";
import { Glyph } from "@/components/ui/Glyph";
import { ClockIcon } from "@/components/ui/icons";
import { Section, SectionHeading } from "@/components/ui/Section";
import { StorageImage } from "@/components/ui/StorageImage";

type Props = {
  section: Tables<"section_content"> | undefined;
  programs: Program[];
  askHref: string;
  showScheduleLink: boolean;
};

function programColor(program: Program): string {
  return (
    program.class_group?.color_dot ??
    program.color ??
    "var(--color-line-strong)"
  );
}

// The first three programs get the large card; the rest the horizontal one (as in the design).
const FEATURED = 3;

export function Programs({
  section,
  programs,
  askHref,
  showScheduleLink,
}: Props) {
  if (!section || programs.length === 0) return null;
  const featured = programs.slice(0, FEATURED);
  const others = programs.slice(FEATURED);

  return (
    <Section
      id="clases"
      tone="mist"
      className="flex flex-col gap-6 lg:gap-14"
      decoration={
        <Glyph className="top-4 -right-[30px] text-[120px] lg:top-6 lg:-right-[50px] lg:text-[230px]">
          태권도
        </Glyph>
      }
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          subtitle={section.subtitle}
        />
        {showScheduleLink && (
          <a
            href="#sedes"
            className="link-accent hidden self-start lg:inline-flex lg:self-auto"
          >
            Ver horarios por sede →
          </a>
        )}
      </div>

      <div
        className={`grid gap-4 md:grid-cols-2 lg:gap-6 ${featured.length >= 3 ? "lg:grid-cols-3" : ""}`}
      >
        {featured.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            askHref={askHref}
            layout="vertical"
          />
        ))}
      </div>
      {others.length > 0 && (
        <div className="-mt-2 grid gap-4 md:grid-cols-2 lg:-mt-8 lg:gap-6">
          {others.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              askHref={askHref}
              layout="horizontal"
            />
          ))}
        </div>
      )}
    </Section>
  );
}

function ProgramCard({
  program,
  askHref,
  layout,
}: {
  program: Program;
  askHref: string;
  layout: "vertical" | "horizontal";
}) {
  const horizontal = layout === "horizontal";
  return (
    <article
      className={`card flex flex-col overflow-hidden ${horizontal ? "lg:flex-row" : ""}`}
    >
      <div
        className={`relative h-[150px] shrink-0 ${horizontal ? "lg:h-auto lg:w-[200px]" : "lg:h-[200px]"}`}
      >
        <StorageImage
          path={program.image_path}
          alt={program.image_alt}
          sizes={
            horizontal
              ? "(min-width: 1024px) 200px, 100vw"
              : "(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
          }
          className="absolute inset-0"
        />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2 lg:h-2.5"
          style={{ background: programColor(program) }}
        />
      </div>
      <div
        className={`flex grow flex-col gap-2.5 p-5 lg:p-7 ${horizontal ? "" : "lg:gap-3.5"}`}
      >
        <p className="text-xs font-bold tracking-[0.04em] text-muted uppercase lg:text-[13px]">
          {program.audience_label}
        </p>
        <h3
          className={`text-[21px] leading-7 font-bold ${horizontal ? "lg:text-[22px]" : "lg:text-2xl lg:leading-[30px]"}`}
        >
          {program.name}
        </h3>
        <p
          className={`grow text-[15px] leading-6 text-muted ${horizontal ? "" : "lg:text-base lg:leading-[26px]"}`}
        >
          {program.description}
        </p>
        <div
          className={`flex items-center justify-between pt-2.5 ${horizontal ? "border-t border-line lg:border-0 lg:pt-1" : "border-t border-line lg:pt-3.5"}`}
        >
          <span className="flex items-center gap-2 text-sm font-bold lg:text-[15px]">
            <ClockIcon />
            {program.time_label}
          </span>
          <a href={askHref} className="link-accent">
            Pregunta →
          </a>
        </div>
      </div>
    </article>
  );
}
