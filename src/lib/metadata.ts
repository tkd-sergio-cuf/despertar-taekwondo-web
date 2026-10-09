import type { Metadata } from "next";
import { getImageUrl, getSiteSettings } from "@/lib/data";

// Shared by every page's generateMetadata: title, favicon and social image come from site_settings.
export async function buildMetadata(pageTitle?: string): Promise<Metadata> {
  const settings = await getSiteSettings();
  if (!settings) return pageTitle ? { title: pageTitle } : {};

  const ogImage = getImageUrl(settings.og_image_path);
  return {
    title: pageTitle
      ? `${pageTitle} · ${settings.business_name}`
      : settings.seo_title,
    description: settings.seo_description,
    icons: { icon: getImageUrl(settings.favicon_path) },
    openGraph: {
      title: settings.seo_title,
      description: settings.seo_description,
      siteName: settings.business_name,
      images: [{ url: ogImage }],
      type: "website",
    },
  };
}
