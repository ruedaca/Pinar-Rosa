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

export default function SeccionDesplegable({
  eyebrow,
  titulo,
  children,
  abiertaPorDefecto = false,
}: SeccionDesplegableProps) {
  const [abierta, setAbierta] = useState(abiertaPorDefecto);
  const id = useId();

  return (
    <section className="px-[var(--page-gutter)] pb-14 md:pb-20">
      <button
        type="button"
        onClick={() => setAbierta((valor) => !valor)}
        aria-expanded={abierta}
        aria-controls={id}
        className="focus-visible:outline-pr-green-1 group block w-full pb-8 text-left focus-visible:outline-2 focus-visible:outline-offset-4 md:pb-12"
      >
        <span className="eyebrow text-pr-gray-700 group-hover:text-pr-green-1 mb-6 flex items-center gap-2 transition-colors md:mb-10">
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

        <span className="display display--section text-pr-black block text-[clamp(1.6rem,4vw,2.5rem)]">
          {titulo}
        </span>
      </button>

      <div
        id={id}
        className={cn("desplegable", abierta && "desplegable--abierto")}
      >
        <div>{children}</div>
      </div>
    </section>
  );
}
