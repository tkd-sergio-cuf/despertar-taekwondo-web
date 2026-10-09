// Menu items are interface text; a link is shown only if its section has content.
export const NAV_ITEMS = [
  { id: "clases", label: "Clases" },
  { id: "sedes", label: "Sedes" },
  { id: "nosotros", label: "Nosotros" },
  { id: "testimonios", label: "Testimonios" },
  { id: "contacto", label: "Contacto" },
] as const;

export type NavId = (typeof NAV_ITEMS)[number]["id"];
