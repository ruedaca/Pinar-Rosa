"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Logo from "@/components/ui/Logo";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  /**
   * "overlay": flota sobre la foto del hero.
   * "light": va en el flujo, sobre el blanco de las páginas interiores.
   * En los dos casos la píldora es oscura: es la misma pieza.
   */
  variant?: "overlay" | "light";
};

export default function SiteHeader({ variant = "overlay" }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const light = variant === "light";

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "z-50 flex justify-center px-[var(--page-gutter)]",
        light
          ? // Queda arriba de todo y se va con el scroll, como en la home
            "pt-[calc(var(--page-top)+8px)] pb-4 md:pt-[calc(var(--page-top)+12px)]"
          : // La píldora flota dentro del hero, a poco más de un margen de su borde
            "absolute inset-x-0 top-[calc(var(--page-top)+18px)] md:top-[calc(var(--page-top)+44px)]",
      )}
    >
      <div className="w-full max-w-[560px] md:w-auto">
        <div
          className={cn(
            "flex items-center gap-2 rounded-full p-1.5 pr-4 backdrop-blur-md md:gap-6 md:py-2.5 md:pl-5",
            // Sobre la foto del hero alcanza con el negro al 35%. Sobre el
            // blanco de las interiores hay que subirlo hasta el 75% para que
            // se perciba del mismo gris oscuro y el texto blanco se lea.
            light ? "bg-black/75" : "bg-black/35",
          )}
        >
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="hover:bg-pr-green-1 focus-visible:outline-pr-green-3 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden"
          >
            <span aria-hidden className="flex w-3.5 flex-col gap-[3px]">
              <span
                className={cn(
                  "h-px w-full bg-current transition-transform",
                  open && "translate-y-[4px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-full bg-current transition-opacity",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-px w-full bg-current transition-transform",
                  open && "-translate-y-[4px] -rotate-45",
                )}
              />
            </span>
          </button>

          <Logo className="mr-auto md:mr-0" />

          <nav
            aria-label="Principal"
            className="hidden items-center gap-6 md:flex"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-pr-green-3 focus-visible:outline-pr-green-3 text-[10px] font-medium tracking-[0.16em] text-white/75 uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <nav
          id="menu-principal"
          aria-label="Menú desplegable"
          className={cn(
            "mt-2 overflow-hidden rounded-[var(--radius-card)] bg-black/85 backdrop-blur-md transition-[max-height,opacity] duration-300 md:hidden",
            open ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <ul className="flex flex-col p-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-pr-green-3 block rounded-full px-4 py-3 text-[11px] font-medium tracking-[0.16em] text-white/80 uppercase transition-colors hover:bg-white/10"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
