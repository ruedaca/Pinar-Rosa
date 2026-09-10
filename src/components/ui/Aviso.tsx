import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tipo = "exito" | "error";

type AvisoProps = {
  tipo: Tipo;
  titulo: string;
  children: ReactNode;
  /** Si se pasa, el aviso muestra una cruz para cerrarlo. */
  onCerrar?: () => void;
  className?: string;
};

const estilos: Record<Tipo, { caja: string; icono: string }> = {
  exito: { caja: "border-pr-green-1 bg-pr-green-1/5", icono: "bg-pr-green-1" },
  error: { caja: "border-red-600 bg-red-50", icono: "bg-red-600" },
};

/**
 * Resultado destacado de una acción (por ejemplo, el envío del formulario).
 * Solo dibuja: quien lo usa decide dónde anunciarlo a los lectores de pantalla.
 */
export default function Aviso({
  tipo,
  titulo,
  children,
  onCerrar,
  className,
}: AvisoProps) {
  return (
    <div
      className={cn(
        "aviso-entrada flex items-start gap-3 rounded-sm border p-4 text-left md:px-5",
        estilos[tipo].caja,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-white",
          estilos[tipo].icono,
        )}
      >
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
          {tipo === "exito" ? (
            <path
              d="m3.5 8.5 3 3 6-7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M8 3.5v5.5M8 12v.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          )}
        </svg>
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-pr-black text-[14px] font-medium">{titulo}</p>
        <div className="text-pr-gray-700 mt-1 text-[13px] leading-[1.6]">
          {children}
        </div>
      </div>

      {onCerrar && (
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar aviso"
          className="text-pr-gray-400 hover:text-pr-black -mt-1 -mr-1 p-1 transition-colors"
        >
          <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="none">
            <path
              d="m4 4 8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
