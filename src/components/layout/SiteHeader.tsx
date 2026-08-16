"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Logo from "@/components/ui/Logo";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  /**
   * "overlay": flota sobre la foto del hero, píldora oscura translúcida.
   * "light": va en el flujo sobre fondo blanco, píldora clara.
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
          ? "pt-[calc(var(--page-top)+18px)] md:pt-[calc(var(--page-top)+26px)]"
          : // La píldora flota dentro del hero, a poco más de un margen de su borde
            "absolute inset-x-0 top-[calc(var(--page-top)+18px)] md:top-[calc(var(--page-top)+44px)]",
      )}
    >
      <div className="w-full max-w-[560px] md:w-auto">
        <div
          className={cn(
            "flex items-center gap-2 rounded-full p-1.5 pr-4 md:gap-6 md:py-2.5 md:pl-5",
            light ? "bg-pr-gray-100" : "bg-black/35 backdrop-blur-md",
          )}
        >
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden",
              light
                ? "bg-pr-black hover:bg-pr-green-1 focus-visible:outline-pr-green-1 text-white"
                : "hover:bg-pr-green-1 focus-visible:outline-pr-green-3 bg-white/15 text-white",
            )}
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

          <Logo className="mr-auto md:mr-0" invert={light} />

          <nav
            aria-label="Principal"
            className="hidden items-center gap-6 md:flex"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[10px] font-medium tracking-[0.16em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4",
                  light
                    ? "text-pr-gray-700 hover:text-pr-green-1 focus-visible:outline-pr-green-1"
                    : "hover:text-pr-green-3 focus-visible:outline-pr-green-3 text-white/75",
                )}
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
            "mt-2 overflow-hidden rounded-[var(--radius-card)] transition-[max-height,opacity] duration-300 md:hidden",
            light ? "bg-pr-gray-100" : "bg-black/80 backdrop-blur-md",
            open ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <ul className="flex flex-col p-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-full px-4 py-3 text-[11px] font-medium tracking-[0.16em] uppercase transition-colors",
                    light
                      ? "text-pr-gray-700 hover:bg-pr-gray-200 hover:text-pr-green-1"
                      : "hover:text-pr-green-3 text-white/80 hover:bg-white/10",
                  )}
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
