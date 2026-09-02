"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Logo from "@/components/ui/Logo";
import { footer, nav } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Barra oscura fija, igual en todas las páginas — no flota sobre el hero. */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="bg-pr-charcoal sticky top-0 z-50">
      <div className="flex h-[var(--header-height)] items-center justify-between px-[var(--page-gutter)]">
        <Logo />

        <nav
          aria-label="Principal"
          className="hidden items-center gap-1 md:flex"
        >
          {nav.map((item) => {
            const activo =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "hover:text-pr-green-3 focus-visible:outline-pr-green-3 rounded-sm border border-transparent px-4 py-2 text-[11px] font-medium tracking-[0.14em] text-white/80 uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                  activo && "border-pr-green-1 text-pr-green-3",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={footer.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp de Pinar Rosa Group"
            className="hover:border-pr-green-1 hover:text-pr-green-1 flex size-8 items-center justify-center rounded-full border border-white/40 text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
              <path
                d="M4 20.2 5.3 16a7.7 7.7 0 1 1 2.9 2.8L4 20.2Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path
                d="M9.4 8.5c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.6 1.4c.1.2 0 .4-.1.5l-.4.5c-.1.2-.2.3 0 .6a6 6 0 0 0 2.4 2c.3.1.4 0 .6-.1l.5-.6c.2-.2.3-.1.5 0l1.3.7c.2.1.4.2.4.4a1.7 1.7 0 0 1-1.2 1.6c-.5.2-1.2.2-2.6-.4a9 9 0 0 1-3.7-3.4c-.5-.9-.7-1.7-.7-2.2 0-.5.2-.8.4-1Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href={footer.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram de Pinar Rosa Group"
            className="hover:border-pr-green-1 hover:text-pr-green-1 flex size-8 items-center justify-center rounded-full border border-white/40 text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
              <rect
                x="3.5"
                y="3.5"
                width="17"
                height="17"
                rx="5"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <circle
                cx="12"
                cy="12"
                r="4"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
            </svg>
          </a>
        </div>

        {/* Hamburguesa mobile */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-principal"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="hover:bg-pr-green-1 focus-visible:outline-pr-green-3 flex size-9 shrink-0 items-center justify-center rounded-sm bg-white/10 text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden"
        >
          <span aria-hidden className="flex w-4 flex-col gap-[4px]">
            <span
              className={cn(
                "h-px w-full bg-current transition-transform",
                open && "translate-y-[5px] rotate-45",
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
                open && "-translate-y-[5px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <nav
        id="menu-principal"
        aria-label="Menú desplegable"
        className={cn(
          "overflow-hidden bg-black/95 transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col p-3">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="hover:text-pr-green-3 block px-4 py-3 text-[12px] font-medium tracking-[0.16em] text-white/80 uppercase transition-colors hover:bg-white/5"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
