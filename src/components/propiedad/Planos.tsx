"use client";

import { useState } from "react";

import Foto from "@/components/ui/Foto";
import { cn } from "@/lib/utils";

type Plano = { src: string; titulo: string };

/** Pestañas simples, una por planta, como en el sitio de referencia. */
export default function Planos({
  planos,
  nombrePropiedad,
}: {
  planos: Plano[];
  nombrePropiedad: string;
}) {
  const [activo, setActivo] = useState(0);
  const plano = planos[activo];

  return (
    <div>
      <div className="mb-6 flex justify-center gap-8">
        {planos.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActivo(index)}
            className={cn(
              "pb-2 text-[11px] font-medium tracking-[0.16em] uppercase transition-colors",
              index === activo
                ? "text-pr-green-1 border-pr-green-1 border-b-2"
                : "text-pr-gray-400 hover:text-pr-black border-b-2 border-transparent",
            )}
          >
            {item.titulo}
          </button>
        ))}
      </div>

      <div className="marco-foto relative aspect-[3/2] bg-white">
        <Foto
          src={plano.src}
          alt={`${plano.titulo} del ${nombrePropiedad}`}
          sizes="(min-width: 768px) 70vw, 100vw"
          ajuste="contain"
        />
      </div>
    </div>
  );
}
