import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** El isotipo real (SVG del cliente) va en /public/images/brand/isotipo.svg */
  invert?: boolean;
};

export default function Logo({ className, invert = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Pinar Rosa Group — Inicio"
      className={cn(
        "focus-visible:outline-pr-green-1 inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4",
        className,
      )}
    >
      <svg viewBox="0 0 28 28" className="size-6 shrink-0" aria-hidden>
        <rect
          x="1"
          y="1"
          width="26"
          height="26"
          rx="8"
          stroke="var(--color-pr-green-3)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M9 20V9h5.5a3.5 3.5 0 0 1 0 7H12"
          stroke="var(--color-pr-green-3)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="19.5" cy="18.5" r="1.6" fill="var(--color-pr-green-3)" />
      </svg>
      <span
        className={cn(
          "text-[13px] leading-none tracking-[0.02em]",
          invert ? "text-pr-black" : "text-white",
        )}
      >
        <span className="font-light">PINAR </span>
        <span className="font-semibold">ROSA</span>
      </span>
    </Link>
  );
}
