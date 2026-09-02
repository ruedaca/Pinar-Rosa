import type { Metadata } from "next";

import Boton from "@/components/ui/Boton";
import Media from "@/components/ui/Media";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import TituloSeccion from "@/components/ui/TituloSeccion";
import { about, PROYECTO_PROPIO, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "El Estudio | Pinar Rosa",
  description:
    "Estudio de arquitectura y desarrollo inmobiliario en Pinamar: cómo trabajamos y qué ofrecemos.",
};

export default function ElEstudioPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-[var(--page-gutter)] py-16 md:py-24">
          <TituloSeccion eyebrow="Desarrolladora">El Estudio</TituloSeccion>

          <div className="mx-auto mt-12 grid max-w-5xl gap-10 md:grid-cols-2 md:gap-16">
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-pr-gray-700 text-[14px] leading-[1.8]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Boton
              href={`/contacto?motivo=${encodeURIComponent(PROYECTO_PROPIO)}`}
              variant="contorno"
            >
              Quiero un proyecto propio
            </Boton>
          </div>
        </section>

        <section className="bg-pr-gray-100 px-[var(--page-gutter)] py-16 md:py-24">
          <TituloSeccion eyebrow="Qué hacemos">Servicios</TituloSeccion>

          <div className="mx-auto mt-12 grid max-w-6xl gap-[var(--frame-gap)] md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title}>
                <div className="marco-foto relative aspect-[4/3]">
                  <Media
                    media={service.image}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    quality={85}
                  />
                </div>
                <h3 className="text-pr-black mt-4 text-[16px] font-semibold">
                  {service.title}
                </h3>
                <p className="text-pr-gray-700 mt-2 text-[13px] leading-[1.7]">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
