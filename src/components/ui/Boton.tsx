import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Variant = "solido" | "contorno";
/** El contorno cambia de color según si va sobre una foto oscura o sobre blanco. */
type Tono = "sobre-oscuro" | "sobre-claro";

const base =
  "inline-flex items-center justify-center rounded-sm px-7 py-3 text-[11px] font-medium tracking-[0.16em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pr-green-1";

const estilos: Record<Variant, Record<Tono, string>> = {
  solido: {
    "sobre-oscuro": "bg-pr-white text-pr-black hover:bg-pr-green-3",
    "sobre-claro": "bg-pr-black text-white hover:bg-pr-green-1",
  },
  contorno: {
    "sobre-oscuro":
      "border border-white/70 text-white hover:bg-white hover:text-pr-black",
    "sobre-claro":
      "border border-pr-black text-pr-black hover:bg-pr-black hover:text-white",
  },
};

type BotonProps = {
  children: string;
  variant?: Variant;
  tono?: Tono;
  className?: string;
  href?: string;
};

/** Enlace o botón de envío, según traiga `href`. Mismo aspecto en los dos casos. */
export default function Boton({
  children,
  variant = "solido",
  tono = "sobre-claro",
  className,
  href,
  ...props
}: BotonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const clases = cn(base, estilos[variant][tono], className);

  if (href) {
    return (
      <Link href={href} className={clases}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={clases} {...props}>
      {children}
    </button>
  );
}
