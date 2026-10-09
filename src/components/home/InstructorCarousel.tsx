"use client";

import { useState, type ReactNode } from "react";

type Props = {
  // One server-rendered card per instructor.
  slides: ReactNode[];
};

// Shows one instructor at a time with previous/next arrows. All cards share the
// same grid cell, so the block keeps the height of the tallest one.
export function InstructorCarousel({ slides }: Props) {
  const [active, setActive] = useState(0);
  const many = slides.length > 1;
  const step = (delta: number) =>
    setActive((i) => (i + delta + slides.length) % slides.length);

  return (
    <div className="flex flex-col gap-4 pt-4 lg:pt-0">
      <div className="flex min-h-11 items-center justify-between gap-4">
        <p className="eyebrow text-ochre">
          {many ? "Instructores" : "Instructor"}
        </p>
        {many && (
          <div className="flex items-center gap-3">
            <span aria-live="polite" className="text-sm font-bold text-muted">
              {active + 1} / {slides.length}
            </span>
            <ArrowButton label="Instructor anterior" onClick={() => step(-1)}>
              ←
            </ArrowButton>
            <ArrowButton label="Instructor siguiente" onClick={() => step(1)}>
              →
            </ArrowButton>
          </div>
        )}
      </div>
      <div className="grid">
        {slides.map((slide, i) => (
          <div
            key={i}
            inert={i !== active}
            className={`col-start-1 row-start-1 ${i === active ? "" : "invisible"}`}
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
}

type ArrowProps = { label: string; onClick: () => void; children: ReactNode };

function ArrowButton({ label, onClick, children }: ArrowProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-11 items-center justify-center rounded-full bg-card text-xl font-bold shadow-[inset_0_0_0_1.5px_var(--color-line-strong)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
    >
      {children}
    </button>
  );
}
