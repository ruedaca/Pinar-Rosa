import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import WhatsAppFloat from "@/components/shared/WhatsAppFloat";

import "./globals.css";

/**
 * Única familia del sitio, para todos los pesos: títulos, logotipo y texto.
 * Gotham y Sofia Pro (las del manual de marca) son tipografías de pago; Poppins
 * es la alternativa gratuita más cercana a su geometría redondeada.
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

/**
 * Base con la que se resuelven las imágenes de Open Graph: sin esto, al
 * compartir un enlace por WhatsApp la miniatura apunta a localhost. En Vercel
 * la variable la pone la plataforma; cuando exista el dominio propio se define
 * NEXT_PUBLIC_SITE_URL y manda esa.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pinar Rosa Group | Arquitectura y desarrollo en Pinamar",
  description:
    "Estudio de arquitectura y desarrollo inmobiliario en Pinamar. Tres casas de autor entre el bosque y el mar.",
  openGraph: {
    title: "Pinar Rosa Group",
    description:
      "Arquitectura contemporánea en Pinamar. Casas que dialogan con el bosque, el médano y el mar.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // La variable de fuente va en <html> para que exista ya en :root
  return (
    <html lang="es-AR" className={poppins.variable}>
      <head>
        {/* Sin JS el observador nunca corre: el contenido queda visible igual */}
        <noscript>
          <style>{`.reveal { opacity: 1; transform: none; }`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
