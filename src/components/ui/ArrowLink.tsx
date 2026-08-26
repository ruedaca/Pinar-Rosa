import Link from "next/link";

import { cn } from "@/lib/utils";

type ArrowLinkProps = {
  href: string;
  children: string;
  className?: string;
};

/** Texto en versalitas + círculo con flecha, como en las tarjetas de proyecto. */
export default function ArrowLink({
  href,
  children,
  className,
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 text-[10px] font-medium tracking-[0.18em] uppercase",
        "text-pr-black hover:text-pr-green-1 transition-colors",
        "focus-visible:outline-pr-green-1 focus-visible:outline-2 focus-visible:outline-offset-4",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="bg-pr-black group-hover:bg-pr-green-1 flex size-7 items-center justify-center rounded-full text-white transition-colors"
      >
        <svg viewBox="0 0 16 16" className="size-3" fill="none">
          <path
            d="M4 12 12 4M6 4h6v6"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
