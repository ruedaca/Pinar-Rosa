import { cn } from "@/lib/utils";

/**
 * Bloque gris que ocupa el lugar de una fotografía real.
 * Reemplazar por <Image /> cuando lleguen las fotos definitivas:
 * el `slot` es el nombre de archivo sugerido dentro de /public/images.
 */

type PlaceholderProps = {
  slot: string;
  ratio?: string;
  tone?: "light" | "dark";
  className?: string;
};

export default function Placeholder({
  slot,
  ratio,
  tone = "light",
  className,
}: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Espacio reservado para fotografía de arquitectura: ${slot}`}
      className={cn(
        "relative h-full w-full overflow-hidden",
        tone === "dark" ? "bg-pr-gray-700" : "bg-pr-gray-200",
        className,
      )}
    >
      {/* Trama diagonal sutil para distinguir el placeholder de un bloque de color */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0",
          tone === "dark" ? "opacity-[0.10]" : "opacity-[0.55]",
        )}
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, currentColor 0 1px, transparent 1px 14px)",
          color: tone === "dark" ? "#ffffff" : "#a0a0a0",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <span
          className={cn(
            "rounded-full px-3 py-1.5 text-center font-mono text-[10px] tracking-[0.14em] uppercase",
            tone === "dark"
              ? "bg-white/10 text-white/70"
              : "text-pr-gray-700 bg-white/70",
          )}
        >
          {slot}
          {ratio ? ` · ${ratio}` : null}
        </span>
      </div>
    </div>
  );
}
