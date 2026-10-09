import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { getSupabaseUrl } from "./env";

// Reads are kept in Next's Data Cache for at most this many seconds, so database
// changes show up on the site without a redeploy.
export const REVALIDATE_SECONDS = 60;
export const CONTENT_TAG = "content";

let client: SupabaseClient<Database> | undefined;

// Only GET requests are cached; inserts always reach Supabase.
const cachedFetch: typeof fetch = (input, init) => {
  const method = (init?.method ?? "GET").toUpperCase();
  if (method !== "GET") return fetch(input, init);
  return fetch(input, {
    ...init,
    next: { revalidate: REVALIDATE_SECONDS, tags: [CONTENT_TAG] },
  });
};

// Created lazily so a build without env vars only fails if a page actually queries data.
export function getClient(): SupabaseClient<Database> {
  if (!client) {
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
    client = createClient<Database>(getSupabaseUrl(), key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: cachedFetch },
    });
  }
  return client;
}
