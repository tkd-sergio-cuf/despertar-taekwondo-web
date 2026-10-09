import type { Location, Program, Tables } from "@/lib/data";
import { Glyph } from "@/components/ui/Glyph";
import { Section } from "@/components/ui/Section";

type Props = {
  section: Tables<"section_content"> | undefined;
  locations: Location[];
  programs: Program[];
};

// Fixed answers for "¿Para quién es la clase?"; the value is what free_class_requests.audience stores.
const AUDIENCES = [
  { value: "para_mi", label: "Para mí" },
  { value: "hijo_hija", label: "Para mi hijo o hija" },
  { value: "adulto_mayor", label: "Para un adulto mayor" },
  { value: "varias", label: "Para varias personas" },
];

// Layout only: submitting the request is implemented in a separate branch.
export function FreeClassForm({ section, locations, programs }: Props) {
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

      <form className="card flex flex-col gap-4 p-5 lg:grid lg:grid-cols-2 lg:gap-5 lg:p-10">
        <Field label="Nombre completo">
          <input
            type="text"
            name="full_name"
            placeholder="Tu nombre"
            autoComplete="name"
            className="field"
          />
        </Field>
        <Field label="WhatsApp">
          <input
            type="tel"
            name="whatsapp"
            placeholder="300 000 0000"
            autoComplete="tel"
            className="field"
          />
        </Field>
        <Field label="¿Para quién es la clase?">
          <select name="audience" className="field">
            {AUDIENCES.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Sede">
          <select name="location_id" className="field">
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </Field>
        {programs.length > 0 && (
          <Field label="Clase de interés" className="lg:col-span-2">
            <select name="class_group_id" className="field">
              {programs.map((p) => (
                <option key={p.id} value={p.group_id ?? ""}>
                  {p.class_group ? `${p.name} (${p.time_label})` : p.name}
                </option>
              ))}
            </select>
          </Field>
        )}
        <div className="flex flex-col-reverse gap-4 pt-1 lg:col-span-2 lg:flex-row lg:items-center lg:justify-between lg:pt-2">
          <p className="text-center text-[13px] font-medium text-muted lg:text-left lg:text-sm lg:leading-[22px]">
            Sin costo y sin compromiso.
          </p>
          <button type="button" className="btn btn-accent">
            Agendar mi clase gratis →
          </button>
        </div>
      </form>
    </Section>
  );
}

function Field({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-2 text-sm font-bold ${className}`}>
      {label}
      {children}
    </label>
  );
}
