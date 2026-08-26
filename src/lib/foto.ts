import type { CSSProperties } from "react";

/** Fracción del eje que representa cada palabra de `object-position`. */
const PALABRAS: Record<string, number> = {
  left: 0,
  top: 0,
  center: 0.5,
  right: 1,
  bottom: 1,
};

function fraccion(valor: string | undefined, porDefecto = 0.5) {
  if (!valor) return porDefecto;
  if (valor in PALABRAS) return PALABRAS[valor];
  const numero = Number.parseFloat(valor);
  return Number.isFinite(numero) ? numero / 100 : porDefecto;
}

/**
 * Estilos de una foto dentro de un `.marco-foto`.
 *
 * Hace dos cosas, las dos con ancho y posición en vez de `transform`:
 *
 * - El acercamiento de los encuadres. Con `transform` el recorte fallaba: iOS no
 *   le aplica el radio del marco a un hijo transformado y dejaba una línea en el
 *   filo. Agrandando la caja de la imagen el recorte es el normal.
 * - Un pixel de desborde por lado. Así la fila del borde se mezcla entre foto y
 *   foto, y no entre foto y fondo, que es lo que dibujaba esa línea en algunos
 *   niveles de zoom.
 *
 * El punto que marca `objectPosition` queda fijo: es el que decide qué se ve
 * cuando el marco recorta.
 */
export function estiloFoto(objectPosition?: string, zoom = 1): CSSProperties {
  const [x, y] = (objectPosition ?? "center center").split(/\s+/);
  const anclaX = fraccion(x);
  const anclaY = fraccion(y);

  return {
    objectPosition,
    width: `calc(${zoom * 100}% + 2px)`,
    height: `calc(${zoom * 100}% + 2px)`,
    left: `calc(${(anclaX * (1 - zoom) * 100).toFixed(3)}% - 1px)`,
    top: `calc(${(anclaY * (1 - zoom) * 100).toFixed(3)}% - 1px)`,
    right: "auto",
    bottom: "auto",
  };
}
