"use client";

import { useEffect, useState } from "react";

import Foto from "@/components/ui/Foto";
import type { MediaSource } from "@/components/ui/Media";
import { cn } from "@/lib/utils";

type Slide = Extract<MediaSource, { kind: "photo" }>;

/** Carrusel simple de fotos a pantalla completa, como el del sitio actual. */
export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [activo, setActivo] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const intervalo = setInterval(() => {
      setActivo((valor) => (valor + 1) % slides.length);
    }, 6000);
    return () => clearInterval(intervalo);
  }, [slides.length]);

  return (
    <div className="absolute inset-0">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          aria-hidden={index !== activo}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === activo ? "opacity-100" : "opacity-0",
          )}
        >
          <Foto
            src={slide.src}
            alt={slide.alt}
            sizes="100vw"
            objectPosition={slide.objectPosition}
            priority={index === 0}
            quality={85}
          />
        </div>
      ))}

      {slides.length > 1 ? (
        <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2 md:bottom-10">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActivo(index)}
              aria-label={`Mostrar foto ${index + 1}`}
              className={cn(
                "size-2 rounded-full transition-colors",
                index === activo ? "bg-pr-green-3" : "bg-white/50",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
