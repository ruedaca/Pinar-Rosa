"use client";

import { useState, type FormEvent } from "react";

import SelectConsulta from "@/components/shared/SelectConsulta";
import Boton from "@/components/ui/Boton";
import { contacto, FORMSPREE_ENDPOINT, footer } from "@/lib/content";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  /** Motivo preseleccionado, por ejemplo desde /contacto?motivo=... */
  initialMotivo?: string;
};

type Estado = "inicial" | "enviando" | "enviado" | "error";

/** El formulario entrega a Formspree, que reenvía la consulta al mail del estudio. */
export default function ContactForm({ initialMotivo }: ContactFormProps) {
  const [estado, setEstado] = useState<Estado>("inicial");
  const [consulta, setConsulta] = useState(
    contacto.consultas.find((opcion) => opcion.value === initialMotivo)
      ?.value ?? contacto.consultas[0].value,
  );

  const inputClasses =
    "border-pr-gray-200 bg-white text-pr-black placeholder:text-pr-gray-400 focus:border-pr-green-1 w-full rounded-sm border px-4 py-2.5 text-[13px] md:py-3 transition-colors focus:outline-none disabled:opacity-60";
  const labelClasses = "eyebrow text-pr-gray-700 mb-2 block";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const datos = new FormData(form);
    datos.set("Motivo", consulta);
    datos.set("_subject", `${consulta} — Pinar Rosa`);

    setEstado("enviando");

    try {
      const respuesta = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: datos,
        headers: { Accept: "application/json" },
      });

      if (!respuesta.ok) throw new Error("Formspree respondió con error");

      form.reset();
      setConsulta(contacto.consultas[0].value);
      setEstado("enviado");
    } catch {
      setEstado("error");
    }
  }

  const enviando = estado === "enviando";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 max-w-xl text-left md:mt-14"
    >
      {/* Trampa para bots: invisible para personas, Formspree descarta el envío si viene lleno */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

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
            disabled={enviando}
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
            disabled={enviando}
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
            disabled={enviando}
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
            disabled={enviando}
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
          disabled={enviando}
          className={cn(inputClasses, "resize-y")}
        />
      </div>

      <Boton type="submit" disabled={enviando} className="mt-6 w-full md:mt-8">
        {enviando ? "Enviando…" : "Enviar consulta"}
      </Boton>

      <p
        aria-live="polite"
        className={cn(
          "mt-4 text-center text-[12px] leading-[1.6]",
          estado === "error" ? "text-red-600" : "text-pr-gray-700",
        )}
      >
        {estado === "enviado" &&
          "¡Gracias! Recibimos tu consulta y te vamos a responder a la brevedad."}
        {estado === "error" &&
          `No pudimos enviar el formulario. Escribinos directo a ${footer.email}.`}
        {(estado === "inicial" || estado === "enviando") &&
          `También podés escribirnos directo a ${footer.email}.`}
      </p>
    </form>
  );
}
