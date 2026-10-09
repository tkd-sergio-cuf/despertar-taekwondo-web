import Link from "next/link";
import type { Tables } from "@/lib/data";
import { Logo } from "@/components/ui/Logo";

type Props = {
  settings: Tables<"site_settings"> | null;
  href: string;
  size: "nav" | "footer";
};

// Logo plus business name, as in the header and footer of the design.
export function Brand({ settings, href, size }: Props) {
  if (!settings) return null;
  const logo = size === "nav" ? "size-11 lg:size-14" : "size-[52px] lg:size-16";
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 text-ink no-underline lg:gap-3.5"
    >
      <Logo
        path={settings.logo_path}
        alt={settings.logo_alt}
        size={64}
        eager={size === "nav"}
        className={`shrink-0 ${logo}`}
      />
      <span className="display text-[17px] uppercase leading-[22px] tracking-[0.08em] lg:text-xl lg:leading-6">
        {settings.business_name}
      </span>
    </Link>
  );
}
