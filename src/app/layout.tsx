import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

/** Títulos y subtítulos. */
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

/** Cuerpo de texto, navegación, botones y epígrafes. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
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
  // Las variables de fuente van en <html> para que existan ya en :root
  return (
    <html lang="es-AR" className={`${montserrat.variable} ${jakarta.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
