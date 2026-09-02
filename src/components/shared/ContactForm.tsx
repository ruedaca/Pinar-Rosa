"use client";

import { useState, type FormEvent } from "react";

import SelectConsulta from "@/components/shared/SelectConsulta";
import Boton from "@/components/ui/Boton";
import { contacto, footer } from "@/lib/content";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  /** Motivo preseleccionado, por ejemplo desde /contacto?motivo=... */
  initialMotivo?: string;
};

/**
 * Sin backend todavía: al enviar se arma un mail al estudio con los datos
 * cargados. Cuando exista un endpoint real, se reemplaza `handleSubmit`.
 */
export default function ContactForm({ initialMotivo }: ContactFormProps) {
  const [enviado, setEnviado] = useState(false);
  const [consulta, setConsulta] = useState(
    contacto.consultas.find((opcion) => opcion.value === initialMotivo)
      ?.value ?? contacto.consultas[0].value,
  );

  const inputClasses =
    "border-pr-gray-200 bg-white text-pr-black placeholder:text-pr-gray-400 focus:border-pr-green-1 w-full rounded-sm border px-4 py-2.5 text-[13px] md:py-3 transition-colors focus:outline-none";
  const labelClasses = "eyebrow text-pr-gray-700 mb-2 block";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const datos = new FormData(event.currentTarget);
    const nombre = String(datos.get("nombre") ?? "");
    const apellido = String(datos.get("apellido") ?? "");
    const cuerpo = [
      `Nombre: ${nombre} ${apellido}`,
      `Teléfono: ${datos.get("telefono") ?? ""}`,
      `Email: ${datos.get("email") ?? ""}`,
      `Motivo: ${consulta}`,
      "",
      String(datos.get("mensaje") ?? ""),
    ].join("\n");

    const asunto = `${consulta} — ${nombre} ${apellido}`;

    window.location.href = `mailto:${footer.email}?subject=${encodeURIComponent(
      asunto,
    )}&body=${encodeURIComponent(cuerpo)}`;
    setEnviado(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 max-w-xl text-left md:mt-14"
    >
      <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
        <div>
          <label htmlFor="nombre" className={labelClasses}>
            Nombre *
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            autoComplete="given-name"
            placeholder="Tu nombre"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="apellido" className={labelClasses}>
            Apellido *
          </label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            required
            autoComplete="family-name"
            placeholder="Tu apellido"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 md:mt-5 md:gap-5">
        <div>
          <label htmlFor="telefono" className={labelClasses}>
            Teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            autoComplete="tel"
            placeholder="Tu teléfono"
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

      <div className="mt-4 md:mt-5">
        <span id="consulta-label" className={labelClasses}>
          ¿Por qué nos escribís?
        </span>
        <SelectConsulta
          id="consulta"
          labelId="consulta-label"
          opciones={contacto.consultas}
          value={consulta}
          onChange={setConsulta}
        />
      </div>

      <div className="mt-4 md:mt-5">
        <label htmlFor="mensaje" className={labelClasses}>
          Información adicional
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          placeholder="Contanos qué estás buscando (opcional)."
          className={cn(inputClasses, "resize-y")}
        />
      </div>

      <Boton type="submit" className="mt-6 w-full md:mt-8">
        Enviar consulta
      </Boton>

      <p
        aria-live="polite"
        className="text-pr-gray-700 mt-4 text-center text-[12px] leading-[1.6]"
      >
        {enviado
          ? "Abrimos tu cliente de correo con el mensaje listo para enviar."
          : `También podés escribirnos directo a ${footer.email}.`}
      </p>
    </form>
  );
}
