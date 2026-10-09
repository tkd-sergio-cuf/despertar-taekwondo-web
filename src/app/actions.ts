"use server";

import {
  createFreeClassRequest,
  getLocations,
  getSiteSettings,
} from "@/lib/data";
import { sendFreeClassNotification } from "@/lib/email";
import {
  AUDIENCES,
  type FreeClassField,
  type FreeClassFormState,
} from "@/lib/free-class";

const FIELDS: FreeClassField[] = [
  "full_name",
  "whatsapp",
  "audience",
  "location_id",
  "age",
];

export async function submitFreeClassRequest(
  _previous: FreeClassFormState,
  formData: FormData,
): Promise<FreeClassFormState> {
  // Honeypot: real visitors never see or fill this field.
  if (formData.get("website")) return { status: "success" };

  const values = Object.fromEntries(
    FIELDS.map((field) => [field, String(formData.get(field) ?? "").trim()]),
  ) as Record<FreeClassField, string>;

  const [settings, locations] = await Promise.all([
    getSiteSettings(),
    getLocations(),
  ]);
  const minAge = settings?.free_class_min_age ?? 1;
  const maxAge = settings?.free_class_max_age ?? 120;
  const audience = AUDIENCES.find((a) => a.value === values.audience);
  const location = locations.find((l) => l.id === values.location_id);
  const age = Number(values.age);
  const phoneDigits = values.whatsapp.replace(/\D/g, "");

  const fieldErrors: Partial<Record<FreeClassField, string>> = {};
  if (values.full_name.length < 2 || values.full_name.length > 120)
    fieldErrors.full_name = "Escribe tu nombre completo.";
  if (phoneDigits.length < 7 || phoneDigits.length > 15)
    fieldErrors.whatsapp = "Escribe un número de WhatsApp válido.";
  if (!audience) fieldErrors.audience = "Elige una opción.";
  if (!location) fieldErrors.location_id = "Elige una sede.";
  if (!Number.isInteger(age) || age < minAge || age > maxAge)
    fieldErrors.age = `La edad debe estar entre ${minAge} y ${maxAge} años.`;

  if (!audience || !location || Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Revisa los campos marcados.",
      fieldErrors,
      values,
    };
  }

  try {
    await createFreeClassRequest({
      full_name: values.full_name,
      whatsapp: values.whatsapp,
      audience: audience.value,
      location_id: location.id,
      age,
    });
  } catch (error) {
    console.error("Free class request could not be saved", error);
    return {
      status: "error",
      message: "No pudimos enviar tu solicitud. Inténtalo de nuevo.",
      fieldErrors: {},
      values,
    };
  }

  // The request is already saved; a failed email must not lose it for the visitor.
  try {
    await sendFreeClassNotification({
      businessName: settings?.business_name ?? "",
      fullName: values.full_name,
      whatsapp: values.whatsapp,
      audience: audience.label,
      locationName: location.name,
      age,
    });
  } catch (error) {
    console.error("Free class notification email failed", error);
  }

  return { status: "success" };
}
