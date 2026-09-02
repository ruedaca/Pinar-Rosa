import type { Metadata } from "next";

import Boton from "@/components/ui/Boton";
import Foto from "@/components/ui/Foto";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import TituloSeccion from "@/components/ui/TituloSeccion";
import { notas } from "@/lib/notas";

export const metadata: Metadata = {
  title: "Blog | Pinar Rosa",
  description:
    "Cómo se piensan y cómo se construyen las casas de Pinar Rosa, contado por quienes las proyectan.",
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-[var(--page-gutter)] py-16 md:py-24">
          <TituloSeccion eyebrow="Novedades">Blog</TituloSeccion>

          <div className="mx-auto mt-12 grid max-w-5xl gap-[var(--frame-gap)] md:grid-cols-2">
            {notas.map((nota) => (
              <article key={nota.slug}>
                <div className="marco-foto relative aspect-[16/9]">
                  <Foto
                    src={nota.portada.src}
                    alt={nota.portada.alt}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    objectPosition={nota.portada.objectPosition}
                  />
                </div>
                <p className="eyebrow text-pr-green-1 mt-4">
                  {nota.categoria} · {nota.fechaTexto}
                </p>
                <h3 className="text-pr-black mt-2 text-[17px] font-semibold">
                  {nota.titulo}
                </h3>
                <p className="text-pr-gray-700 mt-2 text-[13px] leading-[1.65]">
                  {nota.bajada}
                </p>
                <Boton
                  href={`/blog/${nota.slug}`}
                  variant="contorno"
                  className="mt-5"
                >
                  Leer artículo
                </Boton>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
