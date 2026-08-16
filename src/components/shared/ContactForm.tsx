"use client";

import { useEffect, useState, type FormEvent } from "react";

import { contacto, footer, PROYECTO_PROPIO } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Evento con el que el botón de Estudio preselecciona el motivo de consulta. */
export const EVENTO_CONSULTA = "pinar-rosa:consulta";

type ContactFormProps = {
  /** "dark" es la versión que vive en el bloque negro del pie. */
  tone?: "light" | "dark";
};

/**
 * Sin backend todavía: al enviar se arma un mail al estudio con los datos
 * cargados. Cuando exista un endpoint real, se reemplaza `handleSubmit`.
 */
export default function ContactForm({ tone = "light" }: ContactFormProps) {
  const [enviado, setEnviado] = useState(false);
  const [consulta, setConsulta] = useState(contacto.consultas[0].value);
  const dark = tone === "dark";

  useEffect(() => {
    const onConsulta = (evento: Event) => {
      const detalle = (evento as CustomEvent<string>).detail;
      if (detalle) setConsulta(detalle);
    };
    window.addEventListener(EVENTO_CONSULTA, onConsulta);
    return () => window.removeEventListener(EVENTO_CONSULTA, onConsulta);
  }, []);

  const inputClasses = cn(
    "w-full rounded-lg border px-4 py-3 text-[13px] transition-colors focus:outline-none",
    dark
      ? "border-white/15 bg-white/5 text-white placeholder:text-white/35 focus:border-pr-green-3"
      : "border-pr-gray-200 bg-white text-pr-black placeholder:text-pr-gray-400 focus:border-pr-green-1",
  );
  const labelClasses = cn(
    "eyebrow mb-2 block",
    dark ? "text-white/50" : "text-pr-gray-700",
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const datos = new FormData(event.currentTarget);
    const nombre = String(datos.get("nombre") ?? "");
    const cuerpo = [
      `Nombre: ${nombre}`,
      `Email: ${datos.get("email") ?? ""}`,
      `Motivo: ${consulta}`,
      "",
      String(datos.get("mensaje") ?? ""),
    ].join("\n");

    // El asunto lleva el motivo adelante para que se pueda clasificar
    // la consulta desde la bandeja de entrada, sin abrir el mail.
    const asunto =
      consulta === PROYECTO_PROPIO
        ? `Proyecto propio — ${nombre}`
        : `${consulta} — ${nombre}`;

    window.location.href = `mailto:${footer.email}?subject=${encodeURIComponent(
      asunto,
    )}&body=${encodeURIComponent(cuerpo)}`;
    setEnviado(true);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 text-left md:mt-14">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className={labelClasses}>
            Nombre *
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="hola@ejemplo.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="consulta" className={labelClasses}>
          ¿Por qué nos escribís?
        </label>
        {/* Las opciones se pintan en negro: el desplegable nativo va sobre blanco */}
        <select
          id="consulta"
          name="consulta"
          value={consulta}
          onChange={(event) => setConsulta(event.target.value)}
          className={inputClasses}
        >
          {contacto.consultas.map((opcion) => (
            <option
              key={opcion.value}
              value={opcion.value}
              className="text-pr-black"
            >
              {opcion.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="mensaje" className={labelClasses}>
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={5}
          placeholder="Contanos qué estás buscando."
          className={cn(inputClasses, "resize-y")}
        />
      </div>

      <button
        type="submit"
        className={cn(
          "mt-8 w-full rounded-full px-8 py-4 text-[10px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4",
          dark
            ? "text-pr-black hover:bg-pr-green-3 focus-visible:outline-pr-green-3 bg-white"
            : "bg-pr-black hover:bg-pr-green-1 focus-visible:outline-pr-green-1 text-white",
        )}
      >
        Enviar mensaje
      </button>

      <p
        aria-live="polite"
        className={cn(
          "mt-4 text-center text-[12px] leading-[1.6]",
          dark ? "text-white/50" : "text-pr-gray-700",
        )}
      >
        {enviado
          ? "Abrimos tu cliente de correo con el mensaje listo para enviar."
          : `También podés escribirnos directo a ${footer.email}.`}
      </p>
    </form>
  );
}
