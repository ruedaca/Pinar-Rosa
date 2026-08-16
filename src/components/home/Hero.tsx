import Media from "@/components/ui/Media";
import NotchFrame from "@/components/ui/NotchFrame";
import { hero } from "@/lib/content";

export default function Hero() {
  return (
    <section className="px-[var(--page-gutter)] pt-[var(--page-top)]">
      <NotchFrame
        corner="bottom-right"
        className="min-h-[560px] md:min-h-[720px] lg:h-[calc(100vh-var(--page-top)-var(--page-gutter))] lg:min-h-[760px]"
        notchClassName="notch--roomy w-[82%] md:w-[40%] md:max-w-[440px]"
        notch={
          <p className="text-pr-gray-700 text-[13px] leading-[1.6]">
            {hero.intro}
          </p>
        }
        overlay={
          <h1 className="display absolute bottom-44 left-6 z-10 text-[clamp(2.5rem,9.5vw,7.5rem)] text-white uppercase md:bottom-9 md:left-9">
            {hero.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        }
      >
        <Media media={hero.image} sizes="100vw" priority tone="dark" />
        {/* Velo del 30% para que el texto blanco mantenga contraste sobre la foto */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/30"
        />
      </NotchFrame>
    </section>
  );
}
