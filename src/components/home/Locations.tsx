import Link from "next/link";
import type { Location, ScheduleSlot, Tables } from "@/lib/data";
import { summarizeSchedule } from "@/lib/schedule";
import { whatsappHref } from "@/lib/whatsapp";
import { Glyph } from "@/components/ui/Glyph";
import { Section, SectionHeading } from "@/components/ui/Section";
import { StorageImage } from "@/components/ui/StorageImage";
import { LocationTabs } from "./LocationTabs";

type Props = {
  section: Tables<"section_content"> | undefined;
  locations: Location[];
  schedule: ScheduleSlot[];
  businessName: string | undefined;
};

export function Locations({
  section,
  locations,
  schedule,
  businessName,
}: Props) {
  if (!section || locations.length === 0) return null;

  return (
    <Section
      id="sedes"
      className="flex flex-col gap-5 lg:gap-10"
      decoration={
        <Glyph className="top-4 -right-6 text-[130px] lg:top-5 lg:-right-10 lg:text-[230px]">
          수련
        </Glyph>
      }
    >
      <LocationTabs
        heading={
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.title}
            subtitle={section.subtitle}
          />
        }
        tabs={locations.map((l) => ({
          id: l.slug,
          name: l.name,
          shortName: l.short_name,
          neighborhood: l.neighborhood_label,
        }))}
        panels={locations.map((location) => (
          <LocationPanel
            key={location.id}
            location={location}
            slots={schedule.filter((s) => s.location_id === location.id)}
            businessName={businessName}
          />
        ))}
      />
    </Section>
  );
}

type PanelProps = {
  location: Location;
  slots: ScheduleSlot[];
  businessName: string | undefined;
};

function LocationPanel({ location, slots, businessName }: PanelProps) {
  const thumbs = location.images.slice(0, 3);
  const writeHref = whatsappHref(location.phone, location.whatsapp_message);
  const summary = summarizeSchedule(slots);
  const scheduleHref = `/horarios?sede=${location.slug}`;

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
        <div className="flex flex-col gap-2 lg:gap-3">
          <StorageImage
            path={location.main_image_path}
            alt={location.main_image_alt}
            sizes="(min-width: 1024px) 640px, 100vw"
            className="card relative h-60 lg:h-[420px]"
          />
          {thumbs.length > 0 && (
            <div className="grid grid-cols-3 gap-2 lg:gap-3">
              {thumbs.map((image) => (
                <StorageImage
                  key={image.id}
                  path={image.path}
                  alt={image.alt}
                  sizes="(min-width: 1024px) 210px, 33vw"
                  className="card relative h-24 lg:h-[150px]"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="card flex flex-col gap-2.5 p-5 lg:gap-3.5 lg:p-7">
            <p className="eyebrow text-brand-text">{location.name}</p>
            <p className="text-lg leading-[26px] font-bold lg:text-xl lg:leading-7">
              {location.address}
            </p>
            {location.reference && (
              <p className="text-sm leading-[22px] font-medium text-muted">
                {location.reference}
              </p>
            )}
            {location.phone && (
              <p className="flex items-center gap-2.5 text-sm font-medium">
                <span aria-hidden className="size-2 rounded-full bg-accent" />
                WhatsApp {location.phone}
              </p>
            )}
          </div>
          <LocationMap location={location} businessName={businessName} />
          <div className="flex flex-col gap-2.5 lg:flex-row lg:gap-3">
            <a
              href={location.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-brand grow"
            >
              Cómo llegar →
            </a>
            {writeHref && (
              <a
                href={writeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-line grow"
              >
                Escribir a la sede
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <h3 className="mt-4 text-xl leading-7 font-bold lg:mt-0 lg:text-2xl lg:leading-[30px]">
            Horarios · {location.short_name}
          </h3>
          {summary.length > 0 && (
            <Link
              href={scheduleHref}
              className="btn btn-accent hidden min-h-12! lg:inline-flex"
            >
              Ver horario completo →
            </Link>
          )}
        </div>
        {summary.length === 0 ? (
          <p className="card p-5 text-sm font-medium text-muted">
            Horario por confirmar.
          </p>
        ) : (
          <>
            <ul className="card flex flex-col px-[18px] lg:grid lg:grid-cols-5 lg:gap-3 lg:bg-transparent lg:p-0 lg:shadow-none">
              {summary.map((item) => (
                <li
                  key={item.key}
                  className="flex items-center justify-between gap-3 border-b border-line py-3.5 last:border-0 lg:flex-col-reverse lg:items-start lg:justify-end lg:gap-2 lg:rounded-[4px] lg:border-0 lg:bg-card lg:p-5 lg:shadow-[inset_0_0_0_1px_var(--color-line)]"
                >
                  <div className="flex flex-col gap-0.5 lg:gap-2">
                    <span className="flex items-center gap-2 text-base leading-[22px] font-bold">
                      <span
                        aria-hidden
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ background: item.color }}
                      />
                      {item.label}
                    </span>
                    <span className="text-[13px] font-medium text-muted lg:text-sm lg:leading-[22px]">
                      {item.days}
                    </span>
                  </div>
                  <span className="text-sm font-bold whitespace-nowrap lg:font-display lg:text-lg lg:leading-6 lg:font-extrabold lg:[font-stretch:110%]">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
            <Link href={scheduleHref} className="btn btn-accent lg:hidden">
              Ver horario completo →
            </Link>
          </>
        )}
      </div>
    </>
  );
}

function LocationMap({
  location,
  businessName,
}: {
  location: Location;
  businessName: string | undefined;
}) {
  if (location.map_embed_url) {
    return (
      <iframe
        src={location.map_embed_url}
        title={`Mapa · ${location.name}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-60 w-full rounded-[4px] border-0 lg:h-auto lg:min-h-[300px] lg:grow"
      />
    );
  }
  return (
    <div
      aria-hidden
      className="map-pattern relative h-60 overflow-hidden rounded-[4px] lg:h-auto lg:min-h-[300px] lg:grow"
    >
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center gap-1.5 lg:top-[46%]">
        <span className="rounded-[4px] bg-ink px-3 py-2 text-[13px] font-bold whitespace-nowrap text-white shadow-raised">
          {businessName
            ? `${businessName} · ${location.short_name}`
            : location.short_name}
        </span>
        <span className="size-5 rounded-full bg-brand shadow-[0_0_0_4px_var(--color-paper),0_0_0_10px_rgba(194,37,53,0.35)] lg:size-[22px]" />
      </div>
    </div>
  );
}
