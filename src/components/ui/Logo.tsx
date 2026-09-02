import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** "blanco" para fondos oscuros (header y footer), "negro" para fondos claros. */
  variant?: "blanco" | "negro";
};

const ARCHIVOS = {
  blanco: "/logos/pinar-rosa-blanco.png",
  negro: "/logos/pinar-rosa-negro.png",
};

export default function Logo({ className, variant = "blanco" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Pinar Rosa Group — Inicio"
      className={cn(
        "focus-visible:outline-pr-green-1 inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-4",
        className,
      )}
    >
      <Image
        src={ARCHIVOS[variant]}
        alt="Pinar Rosa"
        width={1900}
        height={819}
        priority
        className="h-8 w-auto md:h-10"
      />
    </Link>
  );
}
