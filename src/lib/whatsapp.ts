// WhatsApp click-to-chat link. Returns null when the number has no digits (e.g. still a placeholder).
export function whatsappHref(
  number: string | null | undefined,
  message?: string | null,
): string | null {
  const digits = number?.replace(/\D/g, "");
  if (!digits) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}
