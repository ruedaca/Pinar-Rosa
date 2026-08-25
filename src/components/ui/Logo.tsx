import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Sobre fondo claro las letras van en negro; sobre la píldora, en blanco. */
  tono?: "claro" | "oscuro";
};

/**
 * Isotipo: la R dentro del cuadrado redondeado, siempre en verde. El
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
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden>
        <rect
          x="1.4"
          y="1.4"
          width="29.2"
          height="29.2"
          rx="9"
          stroke="var(--color-pr-green-3)"
          strokeWidth="2.4"
          fill="none"
        />
        {/* La R va acostada, girada un cuarto de vuelta como en la marca */}
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
