"use client";

import { useId, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type SeccionDesplegableProps = {
  eyebrow: string;
  titulo: string;
  children: ReactNode;
  /** La primera arranca abierta, para que la ficha no se vea vacía. */
  abiertaPorDefecto?: boolean;
};

/**
 * Cerrada muestra solo la etiqueta chica: la ficha queda como un índice.
 * Al abrir bajan juntos el título grande y el contenido.
 */
export default function SeccionDesplegable({
  eyebrow,
  titulo,
  children,
  abiertaPorDefecto = false,
}: SeccionDesplegableProps) {
  const [abierta, setAbierta] = useState(abiertaPorDefecto);
  const id = useId();

  return (
    <section className="px-[var(--page-gutter)] pb-8 md:pb-12">
      <button
        type="button"
        onClick={() => setAbierta((valor) => !valor)}
        aria-expanded={abierta}
        aria-controls={id}
        className="focus-visible:outline-pr-green-1 group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <span className="eyebrow text-pr-gray-700 group-hover:text-pr-green-1 flex items-center gap-2 transition-colors">
          {/* El signo se arma con dos barras: al abrir se esconde la vertical */}
          <span aria-hidden className="text-pr-green-1 relative block size-2.5">
            <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
            <span
              className={cn(
                "absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300",
                abierta && "scale-y-0",
              )}
            />
          </span>
          {eyebrow}
        </span>
      </button>

      {/* Separador entre secciones cerradas: se desvanece al abrir */}
      <span
        aria-hidden
        className={cn(
          "bg-pr-gray-200 mt-6 block h-px w-full transition-opacity duration-300 md:mt-8",
          abierta && "opacity-0",
        )}
      />

      <div
        id={id}
        className={cn("desplegable", abierta && "desplegable--abierto")}
      >
        <div>
          <h2 className="display display--section text-pr-black pt-10 pb-8 text-[clamp(1.6rem,4vw,2.5rem)] md:pt-14 md:pb-12">
            {titulo}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}
