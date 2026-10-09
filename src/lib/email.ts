// Email notifications through Resend's HTTP API. Configured with environment
// variables (see .env.example); without them no email is sent.

type FreeClassNotification = {
  businessName: string;
  fullName: string;
  whatsapp: string;
  audience: string;
  locationName: string;
  age: number;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Returns false when email is not configured, true when the email was accepted.
export async function sendFreeClassNotification(
  request: FreeClassNotification,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL_TO;
  const from = process.env.NOTIFICATION_EMAIL_FROM;
  if (!apiKey || !to || !from) return false;

  const digits = request.whatsapp.replace(/\D/g, "");
  const rows: [string, string][] = [
    ["Nombre", request.fullName],
    ["WhatsApp", request.whatsapp],
    ["Para quién", request.audience],
    ["Edad", String(request.age)],
    ["Sede", request.locationName],
  ];

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((address) => address.trim()),
      subject: `Nueva solicitud de clase gratis · ${request.fullName}`,
      text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
      html: `<h2>Nueva solicitud de clase gratis · ${escapeHtml(request.businessName)}</h2>
<table cellpadding="6">${rows
        .map(
          ([label, value]) =>
            `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`,
        )
        .join("")}</table>
<p><a href="https://wa.me/${digits}">Escribirle por WhatsApp</a></p>`,
    }),
  });
  if (!response.ok) {
    throw new Error(`Resend ${response.status}: ${await response.text()}`);
  }
  return true;
}
