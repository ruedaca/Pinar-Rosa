import Boton from "@/components/ui/Boton";
import Media from "@/components/ui/Media";
import type { MediaSource } from "@/components/ui/Media";
import { cn } from "@/lib/utils";

type TeaserProps = {
  eyebrow: string;
  title: string;
  paragraph: string;
  ctaLabel: string;
  ctaHref: string;
  image: MediaSource;
  /** De qué lado va la foto en desktop; en mobile siempre arriba. */
  imageSide?: "left" | "right";
};

/** Bloque foto + texto de la home: El Estudio, Desarrollos y Blog lo comparten. */
export default function Teaser({
  eyebrow,
  title,
  paragraph,
  ctaLabel,
  ctaHref,
  image,
  imageSide = "left",
}: TeaserProps) {
  return (
    <section className="grid md:grid-cols-2">
      <div
        className={cn(
          "marco-foto relative aspect-[4/3] md:aspect-auto",
          imageSide === "right" && "md:order-2",
        )}
      >
        <Media
          media={image}
          sizes="(min-width: 768px) 50vw, 100vw"
          quality={85}
        />
      </div>

      <div className="flex flex-col justify-center px-[var(--page-gutter)] py-12 md:px-16 md:py-20">
        <p className="eyebrow text-pr-green-1 mb-3">{eyebrow}</p>
        <h2 className="display text-pr-black text-[clamp(1.7rem,4vw,2.5rem)]">
          {title}
        </h2>
        <p className="text-pr-gray-700 mt-5 max-w-[46ch] text-[14px] leading-[1.75]">
          {paragraph}
        </p>
        <Boton href={ctaHref} variant="contorno" className="mt-8 w-fit">
          {ctaLabel}
        </Boton>
      </div>
    </section>
  );
}
