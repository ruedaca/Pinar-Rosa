import Image from "next/image";

import type { Foto } from "@/lib/propiedades";
import { cn } from "@/lib/utils";

type GaleriaFotosProps = {
  fotos: Foto[];
  /** La primera ocupa el ancho completo: es la que abre la secuencia. */
  destacarPrimera?: boolean;
};

export default function GaleriaFotos({
  fotos,
  destacarPrimera = true,
}: GaleriaFotosProps) {
  return (
    <div className="grid gap-[var(--frame-gap)] md:grid-cols-2">
      {fotos.map((foto, index) => {
        const ancha = destacarPrimera && index === 0;
        return (
          <div
            key={foto.src}
            className={cn(
              "bg-pr-gray-200 relative overflow-hidden rounded-[var(--radius-frame)]",
              ancha ? "aspect-[16/9] md:col-span-2" : "aspect-[4/3]",
            )}
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              sizes={ancha ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
