import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Sobre fondo claro las letras van en negro; sobre la píldora, en blanco. */
  tono?: "claro" | "oscuro";
};

/**
 * Isotipo: la R acostada, en verde y sin recuadro. El
 * logotipo va apilado, PINAR liviano arriba y ROSA con peso abajo.
 * Cuando llegue el SVG original del cliente reemplaza a este dibujo.
 */
export default function Logo({ className, tono = "claro" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Pinar Rosa — Inicio"
      className={cn(
        "focus-visible:outline-pr-green-1 inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4",
        className,
      )}
    >
      {/*
        Solo la R, sin el cuadrado: el viewBox está recortado a su contorno
        para que ocupe todo el alto que le den y quede a la par del logotipo.
      */}
      <svg viewBox="8 7 17 16" className="h-[26px] w-auto shrink-0" aria-hidden>
        <g transform="rotate(-90 16 16)">
          <path
            d="M11 23V10h6a4 4 0 0 1 0 8h-6"
            stroke="var(--color-pr-green-3)"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="m15.6 18 4.2 5"
            stroke="var(--color-pr-green-3)"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>

      <span
        className={cn(
          "block leading-[1.05]",
          tono === "oscuro" ? "text-pr-black" : "text-white",
        )}
      >
        <span className="block text-[10px] font-light tracking-[0.2em]">
          PINAR
        </span>
        <span className="block text-[14px] font-semibold tracking-[0.06em]">
          ROSA
        </span>
      </span>
    </Link>
  );
}
