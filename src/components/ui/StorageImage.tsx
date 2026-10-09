import Image from "next/image";
import { getImageUrl } from "@/lib/data";
import { ImagePlaceholder } from "./ImagePlaceholder";

type Props = {
  path: string | null;
  alt: string | null;
  sizes: string;
  // Classes for the wrapper that sets the image box; it must be positioned (relative by default).
  className?: string;
  imgClassName?: string;
  preload?: boolean;
};

// Storage image filling its wrapper. Without a path it renders a neutral placeholder.
export function StorageImage({
  path,
  alt,
  sizes,
  className = "relative",
  imgClassName = "object-cover",
  preload,
}: Props) {
  const src = getImageUrl(path);
  if (!src) return <ImagePlaceholder className={className} />;
  return (
    <div className={`overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes={sizes}
        className={imgClassName}
        preload={preload}
        loading={preload ? "eager" : "lazy"}
      />
    </div>
  );
}
