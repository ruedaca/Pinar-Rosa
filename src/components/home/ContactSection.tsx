import ContactForm from "@/components/shared/ContactForm";
import { contacto } from "@/lib/content";

/**
 * Cierre de la home: el llamado a la acción y el formulario son un solo bloque
 * dentro del pie negro. No hay página de contacto aparte.
 */
export default function ContactSection() {
  return (
    <section
      id="contacto"
      className="mx-auto max-w-[640px] scroll-mt-6 px-[var(--page-gutter)] pt-16 pb-16 text-center md:pt-32 md:pb-24"
    >
      <h2 className="display mx-auto max-w-[16ch] text-[clamp(2.25rem,7vw,4.75rem)] text-white uppercase">
        {contacto.titleLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>

      <p className="mx-auto mt-4 max-w-[46ch] text-[13px] leading-[1.7] text-white/60 md:mt-6">
        {contacto.intro}
      </p>

      <ContactForm tone="dark" />
    </section>
  );
}
