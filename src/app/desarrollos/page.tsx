import type { Metadata } from "next";

import BandaCTA from "@/components/shared/BandaCTA";
import LoteCard from "@/components/desarrollos/LoteCard";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import TituloSeccion from "@/components/ui/TituloSeccion";
import { propiedades } from "@/lib/propiedades";

export const metadata: Metadata = {
  title: "Desarrollos | Pinar Rosa",
  description:
    "Tres casas en los bosques de Pinamar, proyectadas y construidas por Pinar Rosa Group.",
};

export default function DesarrollosPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-[var(--page-gutter)] py-16 md:py-24">
          <TituloSeccion eyebrow="Pinamar Norte">Desarrollos</TituloSeccion>

          <div className="mx-auto mt-12 grid max-w-6xl gap-x-[var(--frame-gap)] gap-y-12 md:grid-cols-3">
            {propiedades.map((propiedad) => (
              <LoteCard key={propiedad.slug} propiedad={propiedad} />
            ))}
          </div>
        </section>

        <BandaCTA />
      </main>
      <SiteFooter />
    </>
  );
}
