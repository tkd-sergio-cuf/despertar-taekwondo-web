import Image from "next/image";
import { getImageUrl } from "@/lib/data";

type Props = {
  path: string | null;
  alt: string;
  // Intrinsic size in px; the displayed size can be changed with className.
  size: number;
  className?: string;
  eager?: boolean;
};

export function Logo({ path, alt, size, className = "", eager }: Props) {
  const src = getImageUrl(path);
  if (!src) return null;
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      sizes={`${size}px`}
      loading={eager ? "eager" : "lazy"}
      className={`object-contain ${className}`}
    />
  );
}
