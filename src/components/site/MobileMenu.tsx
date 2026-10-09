"use client";

import { useState } from "react";
import { MenuIcon } from "@/components/ui/icons";

type Props = {
  items: { href: string; label: string }[];
  freeClassHref: string;
};

export function MobileMenu({ items, freeClassHref }: Props) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen(!open)}
        className="flex size-12 items-center justify-center rounded-[12px] shadow-[inset_0_0_0_1.5px_var(--color-line-strong)]"
      >
        <MenuIcon open={open} />
      </button>
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-20 flex flex-col rounded-[4px] bg-card px-5 pt-2 pb-5 shadow-raised"
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className="flex min-h-[52px] items-center border-b border-line text-lg font-bold text-ink no-underline"
            >
              {item.label}
            </a>
          ))}
          <a
            href={freeClassHref}
            onClick={close}
            className="btn btn-brand mt-4"
          >
            Clase gratis →
          </a>
        </div>
      )}
    </div>
  );
}
