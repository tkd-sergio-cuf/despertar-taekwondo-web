import Link from "next/link";
import {
  getLocations,
  getScheduleByLocation,
  getSiteSettings,
  type Location,
} from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { hourRange, weekday, formatTime } from "@/lib/schedule";
import { whatsappHref } from "@/lib/whatsapp";
import {
  WeekSchedule,
  type ScheduleClass,
} from "@/components/schedule/WeekSchedule";
import { Brand } from "@/components/site/Brand";

export async function generateMetadata() {
  return buildMetadata("Horarios");
}

function pickLocation(
  locations: Location[],
  slug: string | string[] | undefined,
): Location | undefined {
  return locations.find((l) => l.slug === slug) ?? locations[0];
}

// Dynamic because it reads searchParams: rendered per request, data cached up to 60 s.
export default async function SchedulePage({
  searchParams,
}: PageProps<"/horarios">) {
  const { sede } = await searchParams;
  const [settings, locations] = await Promise.all([
    getSiteSettings(),
    getLocations(),
  ]);
  const location = pickLocation(locations, sede);
  const slots = location ? await getScheduleByLocation(location.id) : [];

  const classes: ScheduleClass[] = slots.map((slot) => {
    const type = slot.class_type;
    const group = type.class_group;
    const message =
      settings && location
        ? `Hola ${settings.business_name}, quiero probar la clase de ${type.name} (${group.label}) del ${weekday(slot.weekday).full.toLowerCase()} a las ${formatTime(slot.start_time)} en la ${location.name}`
        : null;
    return {
      id: slot.id,
      weekday: slot.weekday,
      start: slot.start_time,
      end: slot.end_time,
      name: type.name,
      description: type.description,
      highlights: type.highlights,
      group: {
        label: group.label,
        dot: group.color_dot,
        soft: group.color_soft,
        ink: group.color_ink,
      },
      href:
        whatsappHref(settings?.whatsapp_number, message) ?? "/#clase-gratis",
    };
  });

  const legend = [
    ...new Map(classes.map((c) => [c.group.label, c.group])).values(),
  ];

  return (
    <main className="relative isolate overflow-hidden">
      <span
        aria-hidden
        className="glyph absolute top-[90px] -right-6 -z-10 text-[120px] opacity-40 lg:top-[120px] lg:-right-10 lg:text-[240px]"
      >
        시간표
      </span>
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-5 px-4 pt-3 pb-12 md:px-8 lg:gap-8 lg:pt-6 lg:pb-20 xl:px-0">
        <nav
          aria-label="Principal"
          className="flex h-[60px] items-center justify-between lg:h-[72px]"
        >
          <Brand settings={settings} href="/" size="nav" />
          <Link
            href="/#sedes"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-ink no-underline hover:text-brand-text lg:gap-2"
          >
            ← <span className="lg:hidden">Sedes</span>
            <span className="hidden lg:inline">Volver a sedes</span>
          </Link>
        </nav>

        {!location ? (
          <p className="card p-6 text-base font-medium text-muted">
            Aún no hay horarios publicados.
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-5 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-x-10 lg:gap-y-6">
              <div className="flex max-w-[620px] flex-col gap-2.5 lg:gap-3">
                <p className="eyebrow text-brand-text">Horarios</p>
                <h1 className="text-[28px] leading-[34px] font-bold tracking-[-0.01em] lg:text-[40px] lg:leading-[46px]">
                  Tu semana en {location.short_name}
                </h1>
                <p className="text-base leading-[26px] text-muted lg:text-lg lg:leading-[30px]">
                  <span className="lg:hidden">
                    Elige el día y toca una clase para ver qué se trabaja.
                  </span>
                  <span className="hidden lg:inline">
                    Cada clase tiene un enfoque distinto. Toca una para ver qué
                    se trabaja.
                  </span>
                </p>
              </div>
              {locations.length > 1 && (
                <nav
                  aria-label="Sedes"
                  className="flex flex-wrap gap-2 lg:gap-3"
                >
                  {locations.map((l) => {
                    const active = l.id === location.id;
                    return (
                      <Link
                        key={l.id}
                        href={`/horarios?sede=${l.slug}`}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-14 min-w-[30%] flex-1 flex-col items-start justify-center gap-0.5 rounded-[12px] px-3.5 text-sm font-bold tracking-[0.04em] text-ink uppercase no-underline lg:min-w-0 lg:flex-none lg:px-6 lg:text-[15px] ${
                          active
                            ? "bg-accent"
                            : "bg-card shadow-[inset_0_0_0_1.5px_var(--color-line-strong)]"
                        }`}
                      >
                        <span className="lg:hidden">{l.short_name}</span>
                        <span className="hidden lg:inline">{l.name}</span>
                        <span
                          className={`text-xs font-medium tracking-normal normal-case ${active ? "opacity-80" : "text-muted"}`}
                        >
                          {l.neighborhood_label}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              )}
            </div>

            {classes.length === 0 ? (
              <p className="card p-6 text-base font-medium text-muted">
                Horario por confirmar.
              </p>
            ) : (
              <>
                <ul className="flex flex-wrap gap-3.5 text-[13px] font-bold lg:gap-6 lg:text-sm">
                  {legend.map((g) => (
                    <li
                      key={g.label}
                      className="inline-flex items-center gap-1.5 lg:gap-2"
                    >
                      <span
                        aria-hidden
                        className="size-2.5 rounded-full lg:size-3"
                        style={{ background: g.dot }}
                      />
                      {g.label}
                    </li>
                  ))}
                </ul>
                <WeekSchedule
                  key={location.id}
                  classes={classes}
                  locationName={location.name}
                  hours={hourRange(slots)}
                />
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
