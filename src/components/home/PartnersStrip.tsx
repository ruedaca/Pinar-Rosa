import { partners } from "@/lib/content";

/** Fila de estudios y entidades con las que trabaja Pinar Rosa Group. */
export default function PartnersStrip() {
  return (
    <section
      aria-label="Estudios y entidades asociadas"
      className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-12"
    >
      <ul className="grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {partners.map((partner) => (
          <li
            key={partner}
            className="text-pr-gray-400 text-center text-[11px] font-medium tracking-[0.14em] uppercase"
          >
            {partner}
          </li>
        ))}
      </ul>
    </section>
  );
}
