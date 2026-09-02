import Link from "next/link";

import Media from "@/components/ui/Media";
import type { Propiedad } from "@/lib/propiedades";

function IconoUbicacion() {
  return (
    <svg viewBox="0 0 20 20" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M10 18s6-5.2 6-9.6A6 6 0 0 0 4 8.4C4 12.8 10 18 10 18Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle
        cx="10"
        cy="8.2"
        r="2.1"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

/** Tarjeta de un lote: se usa en /desarrollos y en el teaser de la home. */
export default function LoteCard({ propiedad }: { propiedad: Propiedad }) {
  return (
    <Link href={`/desarrollos/${propiedad.slug}`} className="group block">
      <div className="marco-foto relative aspect-[4/3] overflow-hidden">
        <div className="size-full transition-transform duration-500 group-hover:scale-105">
          <Media
            media={propiedad.portada}
            sizes="(min-width: 768px) 33vw, 100vw"
            quality={85}
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-pr-green-1 flex items-center gap-1.5 text-[10px] font-medium tracking-[0.16em] uppercase">
          <IconoUbicacion />
          Pinamar Norte
        </p>
        <h3 className="display text-pr-black group-hover:text-pr-green-1 mt-1 text-[clamp(1.5rem,3vw,2rem)] transition-colors">
          {propiedad.name}
        </h3>
      </div>
    </Link>
  );
}
