"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Retraso en ms, para escalonar elementos hermanos. */
  retraso?: number;
  className?: string;
};

/**
 * Aparece cuando entra en pantalla y se queda: no vuelve a esconderse al
 * scrollear hacia arriba, que marea. Si el sistema pide menos movimiento, el
 * CSS lo deja visible desde el principio.
 */
export default function Reveal({
  children,
  retraso = 0,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        setVisible(true);
        observador.disconnect();
      },
      // Espera a que el bloque entre un poco, no apenas asoma el borde
      { rootMargin: "0px 0px -10% 0px" },
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "reveal--visible", className)}
      style={retraso ? { transitionDelay: `${retraso}ms` } : undefined}
    >
      {children}
    </div>
  );
}
