import type { ReactNode } from "react";
import type { Tables } from "@/lib/data";
import { Logo } from "@/components/ui/Logo";
import { StorageImage } from "@/components/ui/StorageImage";

type Props = {
  header: ReactNode;
  hero: Tables<"hero"> | null;
  settings: Tables<"site_settings"> | null;
  stats: Tables<"stats">[];
  freeClassHref: string;
};

// Top band of the home page: navigation, hero and stats share the same background.
export function Hero({ header, hero, settings, stats, freeClassHref }: Props) {
  return (
    <section id="inicio" className="bg-paper">
      <div className="relative mx-auto flex max-w-[1360px] flex-col gap-4 px-4 pt-3 pb-10 lg:gap-6 lg:px-10 lg:pt-6 lg:pb-16">
        {header}
        {hero && (
          <div className="relative flex flex-col gap-5 lg:grid lg:h-[720px] lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:gap-0">
            <div className="relative h-[400px] overflow-hidden rounded-[28px] bg-wine lg:order-2 lg:h-auto">
              <span
                aria-hidden
                className="glyph absolute top-2.5 -left-5 text-[300px] [-webkit-text-stroke-color:rgba(255,255,255,0.18)] lg:top-5 lg:-left-[30px] lg:text-[520px]"
              >
                도
              </span>
              <span
                aria-hidden
                className="absolute top-14 left-1/2 size-[250px] -translate-x-1/2 rounded-full bg-brand lg:top-[110px] lg:size-[420px]"
              />
              <StorageImage
                path={hero.image_path}
                alt={hero.image_alt}
                sizes="(min-width: 1024px) 560px, 100vw"
                preload
                className="absolute inset-x-0 bottom-0 h-[360px] lg:h-[640px]"
                imgClassName="object-contain object-bottom"
              />
            </div>
            {settings && (
              <Logo
                path={settings.logo_path}
                alt=""
                size={152}
                className="absolute top-[330px] left-3.5 z-10 size-[104px] drop-shadow-[0_12px_24px_rgba(20,19,19,0.3)] lg:top-auto lg:bottom-11 lg:left-[calc(55%-76px)] lg:size-[152px]"
              />
            )}

            <div className="relative flex flex-col gap-5 pt-9 lg:order-1 lg:justify-center lg:gap-7 lg:pt-0 lg:pr-20 lg:pl-16">
              <p className="eyebrow text-brand-text">{hero.eyebrow}</p>
              <h1 className="display m-0 text-[42px] leading-[46px] tracking-[-0.02em] lg:text-[76px] lg:leading-[78px]">
                {hero.title}{" "}
                <em className="text-brand-text not-italic">
                  {hero.title_highlight}
                </em>
              </h1>
              <p className="max-w-[520px] text-[17px] leading-7 text-muted lg:text-lg lg:leading-[30px]">
                {hero.subtitle}
              </p>
              <div className="flex flex-col gap-3 lg:flex-row">
                <a href={freeClassHref} className="btn btn-brand">
                  {hero.primary_cta_label}
                </a>
                <a href="#sedes" className="btn btn-line">
                  {hero.secondary_cta_label}
                </a>
              </div>
              <p className="hangul hidden text-sm leading-5 text-muted lg:block">
                <span aria-hidden>태권도 · 도장 &nbsp;—&nbsp; </span>
                {hero.badge_text}
              </p>
            </div>
          </div>
        )}
        {stats.length > 0 && (
          <dl className="grid grid-cols-2 gap-x-5 gap-y-4 px-1 pt-2 lg:grid-cols-4 lg:gap-6 lg:px-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col-reverse gap-1 border-t-[1.5px] border-ink pt-3 lg:pt-4"
              >
                <dd className="text-[13px] leading-5 font-medium text-muted lg:text-sm lg:leading-[22px]">
                  {stat.description}
                </dd>
                <dt className="display text-[28px] leading-8 lg:text-[40px] lg:leading-[44px]">
                  {stat.value}{" "}
                  <span className="text-base text-brand-text lg:text-[22px]">
                    {stat.label}
                  </span>
                </dt>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
