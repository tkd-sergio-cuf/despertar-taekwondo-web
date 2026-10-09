import { Archivo, Manrope, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

// Metadata (title, favicon, social image) comes from site_settings in each page's generateMetadata.

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const notoKr = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  weight: ["700", "900"],
  preload: false,
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${archivo.variable} ${notoKr.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
