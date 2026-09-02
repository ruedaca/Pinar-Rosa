import { cn } from "@/lib/utils";

type TituloSeccionProps = {
  eyebrow?: string;
  children: string;
  centrado?: boolean;
  className?: string;
  as?: "h1" | "h2";
};

/** Título de página/sección con la línea de acento del sitio de referencia. */
export default function TituloSeccion({
  eyebrow,
  children,
  centrado = true,
  className,
  as = "h2",
}: TituloSeccionProps) {
  const Tag = as;
  return (
    <div className={cn(centrado && "text-center", className)}>
      {eyebrow ? (
        <p className="eyebrow text-pr-green-1 mb-3">{eyebrow}</p>
      ) : null}
      <Tag
        className={cn(
          "display titulo-seccion text-pr-black inline-block text-[clamp(1.9rem,5vw,3rem)]",
          centrado && "titulo-seccion--centrado",
        )}
      >
        {children}
      </Tag>
    </div>
  );
}
