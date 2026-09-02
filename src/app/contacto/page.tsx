import type { Metadata } from "next";

import ContactForm from "@/components/shared/ContactForm";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import TituloSeccion from "@/components/ui/TituloSeccion";

export const metadata: Metadata = {
  title: "Contacto | Pinar Rosa",
  description:
    "Coordinamos un recorrido por Pinamar o el inicio de tu proyecto propio.",
};

type Props = { searchParams: Promise<{ motivo?: string }> };

export default async function ContactoPage({ searchParams }: Props) {
  const { motivo } = await searchParams;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-[var(--page-gutter)] py-16 md:py-24">
          <div className="text-center">
            <TituloSeccion eyebrow="Contacto">
              Conocé más sobre nuestros proyectos
            </TituloSeccion>
            <p className="text-pr-gray-700 mx-auto mt-6 max-w-[52ch] text-[14px] leading-[1.8]">
              Coordinamos un recorrido por Pinamar y recorremos las tres casas.
              Si lo tuyo es un proyecto propio, también empezamos por acá.
            </p>
          </div>

          <ContactForm initialMotivo={motivo} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
