"use client";

import { useState, type ReactNode } from "react";

type Tab = {
  id: string;
  name: string;
  shortName: string;
  neighborhood: string;
};

type Props = {
  heading: ReactNode;
  tabs: Tab[];
  // One server-rendered panel per tab, in the same order.
  panels: ReactNode[];
};

export function LocationTabs({ heading, tabs, panels }: Props) {
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        {heading}
        {tabs.length > 1 && (
          <div
            role="tablist"
            aria-label="Sedes"
            className="flex gap-2 lg:gap-3"
          >
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActive(i)}
                className={`flex min-h-14 flex-1 flex-col items-start justify-center gap-0.5 rounded-[12px] px-3.5 text-left text-sm font-bold tracking-[0.04em] uppercase lg:flex-none lg:px-7 lg:text-[15px] ${
                  i === active
                    ? "bg-accent"
                    : "bg-card shadow-[inset_0_0_0_1.5px_var(--color-line-strong)]"
                }`}
              >
                <span className="lg:hidden">{tab.shortName}</span>
                <span className="hidden lg:inline">{tab.name}</span>
                <span
                  className={`text-xs font-medium tracking-normal normal-case ${i === active ? "opacity-80" : "text-muted"}`}
                >
                  {tab.neighborhood}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      {panels.map((panel, i) => (
        <div
          key={tabs[i].id}
          role={tabs.length > 1 ? "tabpanel" : undefined}
          id={`panel-${tabs[i].id}`}
          aria-labelledby={tabs.length > 1 ? `tab-${tabs[i].id}` : undefined}
          hidden={i !== active}
          className="flex flex-col gap-5 lg:gap-10"
        >
          {panel}
        </div>
      ))}
    </>
  );
}
