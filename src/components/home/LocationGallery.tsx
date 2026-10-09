"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type GalleryImage = { src: string; alt: string };

// Thumbnails shown under the main photo; the rest are reachable in the viewer.
const THUMBS = 3;

// Photos of a location: main photo plus thumbnails. Clicking any of them opens a
// full-screen viewer with previous/next buttons (arrow keys and Esc also work).
export function LocationGallery({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) dialog.showModal();
    if (openIndex === null && dialog.open) dialog.close();
  }, [openIndex]);

  if (images.length === 0) return null;

  const thumbs = images.slice(1, 1 + THUMBS);
  const hiddenCount = images.length - 1 - thumbs.length;
  const current = openIndex === null ? null : images[openIndex];
  const step = (delta: number) =>
    setOpenIndex((i) =>
      i === null ? i : (i + delta + images.length) % images.length,
    );

  return (
    <div className="flex flex-col gap-2 lg:gap-3">
      <button
        type="button"
        onClick={() => setOpenIndex(0)}
        aria-label={`Ver foto: ${images[0].alt}`}
        className="card relative h-60 cursor-zoom-in overflow-hidden lg:h-[420px]"
      >
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          className="object-cover"
        />
      </button>
      {thumbs.length > 0 && (
        <div className="grid grid-cols-3 gap-2 lg:gap-3">
          {thumbs.map((image, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i + 1)}
              aria-label={`Ver foto: ${image.alt}`}
              className="card relative h-24 cursor-zoom-in overflow-hidden lg:h-[150px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 210px, 33vw"
                className="object-cover"
              />
              {i === thumbs.length - 1 && hiddenCount > 0 && (
                <span className="absolute inset-0 flex items-center justify-center bg-ink/60 text-xl font-bold text-white">
                  +{hiddenCount}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-label="Fotos de la sede"
        onClose={() => setOpenIndex(null)}
        onClick={(e) => {
          // A click on the backdrop (the dialog itself) closes the viewer.
          if (e.target === e.currentTarget) setOpenIndex(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-0 h-dvh max-h-none w-dvw max-w-none bg-ink/95 p-0 text-white backdrop:bg-ink"
      >
        {current && openIndex !== null && (
          <div className="pointer-events-none flex h-full flex-col">
            <div className="pointer-events-auto flex items-center justify-between gap-4 px-4 py-3 lg:px-8">
              <p className="text-sm font-bold">
                {openIndex + 1} / {images.length}
              </p>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                className="flex min-h-11 items-center gap-2 rounded-[12px] px-4 text-sm font-bold tracking-[0.04em] uppercase shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.5)]"
              >
                Cerrar ×
              </button>
            </div>
            <div className="relative min-h-0 grow">
              <Image
                key={current.src + openIndex}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
              {images.length > 1 && (
                <>
                  <ViewerArrow
                    side="left"
                    label="Foto anterior"
                    onClick={() => step(-1)}
                  />
                  <ViewerArrow
                    side="right"
                    label="Foto siguiente"
                    onClick={() => step(1)}
                  />
                </>
              )}
            </div>
            <p className="px-4 py-4 text-center text-sm font-medium lg:px-8">
              {current.alt}
            </p>
          </div>
        )}
      </dialog>
    </div>
  );
}

type ArrowProps = {
  side: "left" | "right";
  label: string;
  onClick: () => void;
};

function ViewerArrow({ side, label, onClick }: ArrowProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`pointer-events-auto absolute top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-card text-2xl font-bold text-ink shadow-raised lg:size-14 ${
        side === "left" ? "left-3 lg:left-8" : "right-3 lg:right-8"
      }`}
    >
      {side === "left" ? "←" : "→"}
    </button>
  );
}
