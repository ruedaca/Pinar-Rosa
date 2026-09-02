import HeroCarousel from "@/components/home/HeroCarousel";
import { hero, projects } from "@/lib/content";

/**
 * Foto a pantalla completa sin texto encima —como en pinarrosagroup.com.ar—,
 * seguida de una banda oscura con el titular. Las fotos son las portadas
 * reales de los tres desarrollos.
 */
export default function Hero() {
  const slides = [hero.image, ...projects.slice(0, 2).map((p) => p.portada)];

  return (
    <section>
      <div className="relative h-[52vh] min-h-[340px] overflow-hidden md:h-[74vh] md:min-h-[520px]">
        <HeroCarousel slides={slides} />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent"
        />
      </div>

      <div className="bg-pr-charcoal px-[var(--page-gutter)] py-14 text-center md:py-20">
        <h1 className="display mx-auto max-w-[18ch] text-[clamp(1.8rem,5vw,3.25rem)] text-white uppercase">
          {hero.titleLines.join(" ")}
        </h1>
        <p className="mx-auto mt-5 max-w-[58ch] text-[14px] leading-[1.8] text-white/65">
          {hero.intro}
        </p>
      </div>
    </section>
  );
}
