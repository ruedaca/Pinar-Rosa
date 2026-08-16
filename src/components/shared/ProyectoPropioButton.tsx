"use client";

import { EVENTO_CONSULTA } from "@/components/shared/ContactForm";
import { PROYECTO_PROPIO } from "@/lib/content";

/**
 * Segunda puerta de entrada al formulario, desde la sección de Estudio: baja
 * al mismo bloque de contacto pero con el motivo ya elegido, así el que viene
 * por un encargo propio no tiene que explicar que no le interesan las casas.
 */
export default function ProyectoPropioButton() {
  function handleClick() {
    window.dispatchEvent(
      new CustomEvent(EVENTO_CONSULTA, { detail: PROYECTO_PROPIO }),
    );
  }

  return (
    <a
      href="#contacto"
      onClick={handleClick}
      className="border-pr-gray-200 hover:border-pr-green-1 hover:text-pr-green-1 focus-visible:outline-pr-green-1 mt-8 inline-block rounded-full border px-6 py-3.5 text-[10px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      Quiero un proyecto propio
    </a>
  );
}
