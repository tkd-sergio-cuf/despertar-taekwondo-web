// Fixed answers for "¿Para quién es la clase?"; the value is what
// free_class_requests.audience stores. Shared by the form and the server action.
export const AUDIENCES = [
  { value: "para_mi", label: "Para mí" },
  { value: "hijo_hija", label: "Para mi hijo o hija" },
  { value: "adulto_mayor", label: "Para un adulto mayor" },
  { value: "varias", label: "Para varias personas" },
] as const;

export type FreeClassField =
  "full_name" | "whatsapp" | "audience" | "location_id" | "age";

export type FreeClassFormState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors: Partial<Record<FreeClassField, string>>;
      // What the visitor typed, to refill the form.
      values: Partial<Record<FreeClassField, string>>;
    };
