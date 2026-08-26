import Media from "@/components/ui/Media";
import NotchFrame from "@/components/ui/NotchFrame";
import { hero } from "@/lib/content";

export default function Hero() {
  return (
    <section className="px-[var(--page-gutter)] pt-[var(--page-top)]">
      <NotchFrame
        corner="bottom-right"
        className="min-h-[440px] md:min-h-[720px] lg:h-[calc(100vh-var(--page-top)-var(--page-gutter))] lg:min-h-[760px]"
        notchClassName="notch--roomy hero-in hero-in--delayed w-fit md:w-[40%] md:max-w-[440px]"
        notch={
          <>
            {/* En mobile la tarjeta queda solo con el botón: el texto ocupaba media pantalla */}
            <p className="text-pr-gray-700 hidden text-[13px] leading-[1.6] md:block">
              {hero.intro}
            </p>
            {/* Ancla dentro de la misma página: con next/link no baja */}
            <a
              href={hero.action.href}
              className="bg-pr-black hover:bg-pr-green-1 focus-visible:outline-pr-green-1 inline-block rounded-full px-4 py-2 text-[9px] font-medium tracking-[0.14em] text-white uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 md:mt-6 md:px-7 md:py-3.5 md:text-[10px] md:tracking-[0.18em]"
            >
              {hero.action.label}
            </a>
          </>
        }
        // Cada línea del titular es una línea: el corte lo decide el copy
        overlay={
          <h1 className="display hero-in absolute bottom-6 left-6 z-10 text-[clamp(0.95rem,4.7vw,1.35rem)] text-white uppercase md:bottom-9 md:left-9 md:text-[clamp(1.9rem,6vw,5.25rem)]">
            {hero.titleLines.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </h1>
        }
      >
        {/*
          El marco es vertical y la foto apaisada: con `object-cover` la
          imagen escala por el alto, así que en mobile hace falta pedir
          bastante más ancho que el del viewport o se ve pixelada.
        */}
        <Media
          media={hero.image}
          sizes="(min-width: 768px) 100vw, 175vw"
          priority
          quality={85}
          tone="dark"
        />
        {/*
          Doble velo: uno general y otro más denso en la esquina inferior
          izquierda, que es donde apoya el titular. En mobile el texto ocupa
          casi todo el ancho de la foto, así que ahí el velo es más fuerte.
        */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/30 md:from-black/45 md:via-black/10"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_100%,rgba(0,0,0,0.55)_0%,transparent_60%)]"
        />
      </NotchFrame>
    </section>
  );
}
