"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Opcion = { value: string; label: string };

type SelectConsultaProps = {
  opciones: Opcion[];
  value: string;
  onChange: (value: string) => void;
  /** Id del <label> que lo nombra. */
  labelId: string;
  id: string;
  dark?: boolean;
};

/**
 * El desplegable nativo lo dibuja el sistema operativo: siempre blanco, con la
 * tipografía del sistema y sin manera de darle el estilo del sitio. Este lo
 * reemplaza con el mismo panel oscuro del menú de la barra.
 */
export default function SelectConsulta({
  opciones,
  value,
  onChange,
  labelId,
  id,
  dark = false,
}: SelectConsultaProps) {
  const [abierto, setAbierto] = useState(false);
  const [marcada, setMarcada] = useState(() =>
    Math.max(
      0,
      opciones.findIndex((opcion) => opcion.value === value),
    ),
  );
  const contenedor = useRef<HTMLDivElement>(null);

  const elegida = opciones.find((opcion) => opcion.value === value);

  // Al cerrarse por afuera, la opción marcada vuelve a la elegida: si no, la
  // próxima apertura arranca donde quedó el recorrido con el teclado.
  useEffect(() => {
    if (abierto) return;
    const indice = opciones.findIndex((opcion) => opcion.value === value);
    if (indice >= 0) setMarcada(indice);
  }, [abierto, opciones, value]);

  useEffect(() => {
    if (!abierto) return;
    const alTocarAfuera = (evento: PointerEvent) => {
      if (!contenedor.current?.contains(evento.target as Node)) {
        setAbierto(false);
      }
    };
    document.addEventListener("pointerdown", alTocarAfuera);
    return () => document.removeEventListener("pointerdown", alTocarAfuera);
  }, [abierto]);

  function elegir(indice: number) {
    onChange(opciones[indice].value);
    setMarcada(indice);
    setAbierto(false);
  }

  function alTeclado(evento: React.KeyboardEvent<HTMLButtonElement>) {
    const ultimo = opciones.length - 1;

    if (evento.key === "Escape") {
      setAbierto(false);
      return;
    }
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      if (abierto) elegir(marcada);
      else setAbierto(true);
      return;
    }
    if (evento.key === "ArrowDown" || evento.key === "ArrowUp") {
      evento.preventDefault();
      if (!abierto) {
        setAbierto(true);
        return;
      }
      const paso = evento.key === "ArrowDown" ? 1 : -1;
      setMarcada((actual) => Math.min(ultimo, Math.max(0, actual + paso)));
      return;
    }
    if (evento.key === "Home") {
      evento.preventDefault();
      setMarcada(0);
    }
    if (evento.key === "End") {
      evento.preventDefault();
      setMarcada(ultimo);
    }
  }

  return (
    <div ref={contenedor} className="relative">
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-controls={`${id}-opciones`}
        aria-labelledby={`${labelId} ${id}`}
        aria-activedescendant={abierto ? `${id}-opcion-${marcada}` : undefined}
        onClick={() => setAbierto((estado) => !estado)}
        onKeyDown={alTeclado}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-left text-[13px] transition-colors focus:outline-none md:py-3",
          dark
            ? "focus:border-pr-green-3 border-white/15 bg-white/5 text-white"
            : "border-pr-gray-200 text-pr-black focus:border-pr-green-1 bg-white",
        )}
      >
        {elegida?.label}
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={cn(
            "size-3.5 shrink-0 transition-transform duration-300",
            abierto && "rotate-180",
            dark ? "text-white/50" : "text-pr-gray-400",
          )}
          fill="none"
        >
          <path
            d="m4 6 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/*
        Mismo panel que el menú de la barra: negro al 85% con desenfoque. Va
        absoluto para que al abrirse no empuje el resto del formulario.
      */}
      <div
        className={cn(
          "absolute z-20 mt-2 w-full overflow-hidden rounded-[var(--radius-card)] backdrop-blur-md transition-[max-height,opacity] duration-300",
          abierto
            ? "max-h-80 opacity-100"
            : "pointer-events-none max-h-0 opacity-0",
          dark ? "bg-black/85" : "bg-pr-black/90",
        )}
      >
        <ul
          id={`${id}-opciones`}
          role="listbox"
          aria-labelledby={labelId}
          tabIndex={-1}
          className="flex flex-col p-2"
        >
          {opciones.map((opcion, indice) => {
            const seleccionada = opcion.value === value;
            return (
              <li
                key={opcion.value}
                id={`${id}-opcion-${indice}`}
                role="option"
                aria-selected={seleccionada}
                onClick={() => elegir(indice)}
                onPointerEnter={() => setMarcada(indice)}
                className={cn(
                  "cursor-pointer rounded-full px-4 py-3 text-[11px] font-medium tracking-[0.16em] uppercase transition-colors",
                  seleccionada ? "text-pr-green-3" : "text-white/80",
                  marcada === indice && "bg-white/10",
                )}
              >
                {opcion.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
