import type { Location, Tables } from "@/lib/data";
import { whatsappHref } from "@/lib/whatsapp";
import { Glyph } from "@/components/ui/Glyph";
import { Brand } from "./Brand";

type Props = {
  settings: Tables<"site_settings"> | null;
  locations: Pick<Location, "id" | "name" | "address">[];
  socialLinks: Tables<"social_links">[];
};

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  youtube: "YouTube",
  x: "X",
  linkedin: "LinkedIn",
};

function platformLabel(platform: string): string {
  return (
    PLATFORM_LABELS[platform.toLowerCase()] ??
    platform.charAt(0).toUpperCase() + platform.slice(1)
  );
}

export function Footer({ settings, locations, socialLinks }: Props) {
  const chatHref = whatsappHref(
    settings?.whatsapp_number,
    settings?.free_class_message,
  );
  const hasContact =
    !!settings && (!!chatHref || !!settings.phone || !!settings.email);

  return (
    <footer
      id="contacto"
      className="relative isolate overflow-hidden border-t-[1.5px] border-ink bg-paper"
    >
      <Glyph className="top-5 -right-6 text-[130px] opacity-35! lg:top-6 lg:-right-10 lg:text-[260px]">
        각성
      </Glyph>
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-7 px-4 pt-10 pb-8 md:px-8 lg:gap-12 lg:pt-16 lg:pb-12 xl:px-0">
        <div className="flex flex-col gap-7 lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,3fr)_minmax(0,3fr)_minmax(0,3fr)] lg:gap-10">
          {settings && (
            <div className="flex flex-col gap-4">
              <Brand settings={settings} href="/" size="footer" />
              <p className="hidden max-w-[320px] text-base leading-[26px] text-muted lg:block">
                {settings.footer_description}
              </p>
            </div>
          )}

          {hasContact && (
            <div className="flex flex-col gap-2.5 lg:gap-3">
              <p className="eyebrow text-brand-text">Contacto</p>
              {chatHref && (
                <a
                  href={chatHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-8 items-center text-base font-bold text-ink no-underline"
                >
                  WhatsApp {settings.whatsapp_number}
                </a>
              )}
              {settings.phone && (
                <span className="text-base text-muted">
                  Tel. {settings.phone}
                </span>
              )}
              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="text-base text-muted no-underline"
                >
                  {settings.email}
                </a>
              )}
            </div>
          )}

          {locations.length > 0 && (
            <div className="flex flex-col gap-2.5 lg:gap-3">
              <p className="eyebrow text-brand-text">Sedes</p>
              {locations.map((l) => (
                <div key={l.id} className="flex flex-col gap-0.5">
                  <span className="text-base font-bold">{l.name}</span>
                  <span className="text-sm font-medium text-muted">
                    {l.address}
                  </span>
                </div>
              ))}
            </div>
          )}

          {socialLinks.length > 0 && (
            <div className="flex flex-col gap-2.5 lg:gap-3">
              <p className="eyebrow text-brand-text">Síguenos</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 lg:flex lg:flex-col lg:gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center text-base text-ink no-underline lg:min-h-0"
                  >
                    {platformLabel(link.platform)}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between gap-4 border-t border-line pt-5 text-[13px] font-medium text-muted lg:pt-6 lg:text-sm">
          <span>{settings?.copyright_text}</span>
          <span aria-hidden className="hangul">
            태권도 · 도장
          </span>
        </div>
      </div>
    </footer>
  );
}
