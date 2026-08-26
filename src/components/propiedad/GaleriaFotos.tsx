import Foto from "@/components/ui/Foto";
// La galería recibe los datos de la foto; `Foto` acá es el componente.
import type { Foto as DatosDeFoto } from "@/lib/propiedades";
import { cn } from "@/lib/utils";

type GaleriaFotosProps = {
  fotos: DatosDeFoto[];
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
              "bg-pr-gray-200 marco-foto relative",
              ancha ? "aspect-[16/9] md:col-span-2" : "aspect-[4/3]",
            )}
          >
            <Foto
              src={foto.src}
              alt={foto.alt}
              sizes={ancha ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
              objectPosition={foto.objectPosition}
            />
          </div>
        );
      })}
    </div>
  );
}
