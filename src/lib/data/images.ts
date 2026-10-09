import { getSupabaseUrl } from "./client";

const BUCKET = "site-media";

// The database stores only the path inside the bucket; the public URL is built here.
export function getImageUrl(path: string): string;
export function getImageUrl(path: string | null): string | null;
export function getImageUrl(path: string | null): string | null {
  if (!path) return null;
  const encoded = path.split("/").map(encodeURIComponent).join("/");
  return `${getSupabaseUrl()}/storage/v1/object/public/${BUCKET}/${encoded}`;
}
