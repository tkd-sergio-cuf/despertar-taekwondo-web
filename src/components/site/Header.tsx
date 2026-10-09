import Link from "next/link";
import type { Tables } from "@/lib/data";
import { Brand } from "./Brand";
import { MobileMenu } from "./MobileMenu";
import { NAV_ITEMS, type NavId } from "./nav";

type Props = {
  settings: Tables<"site_settings"> | null;
  visibleSections: NavId[];
  freeClassHref: string;
};

export function Header({ settings, visibleSections, freeClassHref }: Props) {
  const items = NAV_ITEMS.filter((item) =>
    visibleSections.includes(item.id),
  ).map((item) => ({
    href: `#${item.id}`,
    label: item.label,
  }));

  return (
    <nav
      aria-label="Principal"
      className="relative flex h-[60px] items-center justify-between lg:h-[72px] lg:px-6"
    >
      <Brand settings={settings} href="/" size="nav" />
      <div className="hidden items-center gap-9 lg:flex">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-[15px] font-bold text-ink no-underline hover:text-brand-text"
          >
            {item.label}
          </Link>
        ))}
        <a href={freeClassHref} className="btn btn-brand min-h-12!">
          Clase gratis →
        </a>
      </div>
      <MobileMenu items={items} freeClassHref={freeClassHref} />
    </nav>
  );
}
