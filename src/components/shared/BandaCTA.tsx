import Boton from "@/components/ui/Boton";
import { ctaInteres } from "@/lib/content";

/** Banda gris de llamado a la acción, igual a la del sitio actual del cliente. */
export default function BandaCTA() {
  return (
    <section className="bg-pr-gray-100 px-[var(--page-gutter)] py-14 text-center md:py-20">
      <p className="display text-pr-black mx-auto max-w-[36ch] text-[clamp(1.3rem,3.2vw,1.9rem)]">
        {ctaInteres.texto}
      </p>
      <Boton href={ctaInteres.accion.href} className="mt-8">
        {ctaInteres.accion.label}
      </Boton>
    </section>
  );
}
