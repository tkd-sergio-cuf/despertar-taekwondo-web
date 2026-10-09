import type { NextConfig } from "next";

const STORAGE_PATH = "/storage/v1/object/public/**";
const LOCAL_SUPABASE = "http://127.0.0.1:54321";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const usesLocalSupabase =
  !!supabaseUrl &&
  ["127.0.0.1", "localhost"].includes(new URL(supabaseUrl).hostname);

const nextConfig: NextConfig = {
  images: {
    // Images only come from Supabase Storage: the local stack and any hosted project.
    remotePatterns: [
      new URL(`${LOCAL_SUPABASE}${STORAGE_PATH}`),
      { protocol: "https", hostname: "*.supabase.co", pathname: STORAGE_PATH },
      ...(supabaseUrl ? [new URL(`${supabaseUrl}${STORAGE_PATH}`)] : []),
    ],
    // Next blocks optimizing images from private IPs; allow it only for local Supabase.
    dangerouslyAllowLocalIP: usesLocalSupabase,
  },
};

export default nextConfig;
