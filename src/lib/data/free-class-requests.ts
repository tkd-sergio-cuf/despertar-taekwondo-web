import { getClient } from "./client";
import type { TablesInsert } from "./database.types";

export type FreeClassRequestInput = Pick<
  TablesInsert<"free_class_requests">,
  "full_name" | "whatsapp" | "audience" | "location_id" | "class_group_id"
>;

// No .select() after the insert: the public role can insert but not read the row back.
export async function createFreeClassRequest(input: FreeClassRequestInput): Promise<void> {
  const { error } = await getClient().from("free_class_requests").insert(input);
  if (error) throw new Error(error.message);
}
