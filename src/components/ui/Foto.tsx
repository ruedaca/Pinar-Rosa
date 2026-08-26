import Image from "next/image";

import { estiloFoto } from "@/lib/foto";
import { cn } from "@/lib/utils";

type FotoProps = {
  src: string;
  alt: string;
  /** Anchos servidos por next/image según el viewport. */
  sizes: string;
  /** Reencuadre cuando el marco recorta la foto. */
  objectPosition?: string;
  /** Acercamiento del encuadre. */
  zoom?: number;
  /** Sólo para la portada: es el LCP de la página. */
  priority?: boolean;
  /** Por defecto next/image usa 75. Las portadas van más arriba. */
  quality?: number;
  /** Los planos se muestran enteros; las fotos llenan el marco. */
  ajuste?: "cover" | "contain";
};

/**
 * Foto dentro de un `.marco-foto`.
 *
 * La imagen va en una caja propia, y es esa caja la que lleva el acercamiento y
 * el pixel de desborde: `next/image` con `fill` no admite que se le toque el
 * ancho, y hacerlo con `transform` rompía el recorte redondeado en iOS.
 */
export default function Foto({
  src,
  alt,
  sizes,
  objectPosition,
  zoom,
  priority,
  quality,
  ajuste = "cover",
}: FotoProps) {
  return (
    <div className="absolute" style={estiloFoto(objectPosition, zoom)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={cn(ajuste === "cover" ? "object-cover" : "object-contain")}
        style={{ objectPosition }}
      />
    </div>
  );
}
