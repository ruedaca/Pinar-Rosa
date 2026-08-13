import ContactForm from "@/components/shared/ContactForm";
import { cta } from "@/lib/content";

/**
 * Cierre de la home: el llamado a la acción y el formulario son un solo bloque
 * dentro del pie negro. No hay página de contacto aparte.
 */
export default function ContactSection() {
  return (
    <section
      id="contacto"
      className="mx-auto max-w-[640px] scroll-mt-6 px-[var(--page-gutter)] pt-24 pb-20 text-center md:pt-32 md:pb-24"
    >
      <h2 className="display mx-auto max-w-[16ch] text-[clamp(2.25rem,7vw,4.75rem)] text-white">
        {cta.titleLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>

      <p className="mx-auto mt-6 max-w-[46ch] text-[13px] leading-[1.7] text-white/60">
        Contanos qué estás buscando y coordinamos una visita a Pinamar. Si ya
        tenés un lote en mente, elegilo abajo y te respondemos con la ficha
        completa.
      </p>

      <ContactForm tone="dark" />
    </section>
  );
}
