import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type NotchFrameProps = {
  /** La imagen: ocupa todo el marco. */
  children: ReactNode;
  /** Contenido que vive dentro del recorte. */
  notch: ReactNode;
  corner?: "bottom-left" | "bottom-right";
  /** Ancho y padding del recorte. */
  notchClassName?: string;
  /** Contenido superpuesto sobre la foto (títulos de proyecto). */
  overlay?: ReactNode;
  /** Proporción o altura del marco. */
  className?: string;
};

export default function NotchFrame({
  children,
  notch,
  corner = "bottom-left",
  notchClassName,
  overlay,
  className,
}: NotchFrameProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-frame)]">
        {children}
      </div>

      {overlay}

      <div
        className={cn(
          "notch",
          corner === "bottom-left" ? "notch--bl" : "notch--br",
          notchClassName,
        )}
      >
        {notch}
      </div>
    </div>
  );
}
