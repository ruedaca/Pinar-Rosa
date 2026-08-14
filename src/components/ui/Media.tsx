import Image from "next/image";

import Placeholder from "@/components/ui/Placeholder";

/**
 * Fuente de imagen de una card. Mientras no exista la foto real se usa
 * `placeholder`, cuyo `slot` indica el archivo esperado en /public.
 */
export type MediaSource =
  | {
      kind: "photo";
      src: string;
      alt: string;
      /** Reencuadre cuando el marco recorta la foto (CSS object-position). */
      objectPosition?: string;
      /**
       * Acercamiento extra. Sirve cuando el marco casi no recorta y aun así
       * hay que sacar algo de la foto: `objectPosition` marca el punto que
       * queda fijo, y el resto se va fuera del marco.
       */
      zoom?: number;
    }
  | { kind: "placeholder"; slot: string; ratio: string };

type MediaProps = {
  media: MediaSource;
  /** Anchos servidos por next/image según el viewport. */
  sizes: string;
  /** Sólo para la portada: es el LCP de la home. */
  priority?: boolean;
  tone?: "light" | "dark";
};

export default function Media({ media, sizes, priority, tone }: MediaProps) {
  if (media.kind === "photo") {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{
          objectPosition: media.objectPosition,
          transform: media.zoom ? `scale(${media.zoom})` : undefined,
          transformOrigin: media.zoom ? media.objectPosition : undefined,
        }}
      />
    );
  }

  return <Placeholder slot={media.slot} ratio={media.ratio} tone={tone} />;
}
