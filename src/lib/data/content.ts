import { getClient } from "./client";
import type { Tables } from "./database.types";

// Every read goes through the public (anon) role, so RLS already hides unpublished rows.

function unwrap<T>({ data, error }: { data: T | null; error: { message: string } | null }): T {
  if (error) throw new Error(error.message);
  return data as T;
}

export type SectionKey =
  | "clases"
  | "sedes"
  | "nosotros"
  | "testimonios"
  | "faq"
  | "clase_gratis"
  | "contacto";

export async function getSiteSettings(): Promise<Tables<"site_settings"> | null> {
  return unwrap(await getClient().from("site_settings").select("*").maybeSingle());
}

export async function getHero(): Promise<Tables<"hero"> | null> {
  return unwrap(await getClient().from("hero").select("*").maybeSingle());
}

export async function getStats(): Promise<Tables<"stats">[]> {
  return unwrap(await getClient().from("stats").select("*").order("sort_order"));
}

export async function getSection(key: SectionKey): Promise<Tables<"section_content"> | null> {
  return unwrap(
    await getClient().from("section_content").select("*").eq("key", key).maybeSingle(),
  );
}

export async function getPrinciples(): Promise<Tables<"values_principles">[]> {
  return unwrap(await getClient().from("values_principles").select("*").order("sort_order"));
}

export async function getClassGroups(): Promise<Tables<"class_groups">[]> {
  return unwrap(await getClient().from("class_groups").select("*").order("sort_order"));
}

export async function getPrograms() {
  return unwrap(
    await getClient()
      .from("programs")
      .select("*, class_group:class_groups(*)")
      .order("sort_order"),
  );
}

export async function getLocations() {
  return unwrap(
    await getClient()
      .from("locations")
      .select("*, images:location_images(*)")
      .order("sort_order")
      .order("sort_order", { referencedTable: "location_images" }),
  );
}

export async function getLocationBySlug(slug: string) {
  return unwrap(
    await getClient()
      .from("locations")
      .select("*, images:location_images(*)")
      .eq("slug", slug)
      .order("sort_order", { referencedTable: "location_images" })
      .maybeSingle(),
  );
}

export async function getScheduleByLocation(locationId: string) {
  return unwrap(
    await getClient()
      .from("schedule_slots")
      .select(
        "id, weekday, start_time, end_time, class_type:class_types!inner(*, class_group:class_groups!inner(*))",
      )
      .eq("location_id", locationId)
      .order("weekday")
      .order("start_time"),
  );
}

export async function getInstructors(): Promise<Tables<"instructors">[]> {
  return unwrap(await getClient().from("instructors").select("*").order("sort_order"));
}

export async function getTestimonials(): Promise<Tables<"testimonials">[]> {
  return unwrap(await getClient().from("testimonials").select("*").order("sort_order"));
}

export async function getFaqs(): Promise<Tables<"faqs">[]> {
  return unwrap(await getClient().from("faqs").select("*").order("sort_order"));
}

export async function getSocialLinks(): Promise<Tables<"social_links">[]> {
  return unwrap(await getClient().from("social_links").select("*").order("sort_order"));
}
