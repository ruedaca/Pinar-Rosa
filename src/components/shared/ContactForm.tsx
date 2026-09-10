"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import SelectConsulta from "@/components/shared/SelectConsulta";
import Aviso from "@/components/ui/Aviso";
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
  const zonaAviso = useRef<HTMLDivElement>(null);

  // En mobile el botón queda al pie de la pantalla: el aviso se trae a la
  // vista para que el resultado no pase desapercibido.
  useEffect(() => {
    if (estado === "enviado" || estado === "error") {
      zonaAviso.current?.scrollIntoView({ block: "center" });
    }
  }, [estado]);

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

      if (!respuesta.ok) {
        throw new Error(
          `Formspree respondió ${respuesta.status}: ${await respuesta.text()}`,
        );
      }

      form.reset();
      setConsulta(contacto.consultas[0].value);
      setEstado("enviado");
    } catch (error) {
      console.error("[ContactForm] No se pudo enviar la consulta", error);
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

      {/* Siempre montada: los lectores de pantalla anuncian lo que aparece adentro */}
      <div ref={zonaAviso} aria-live="polite">
        {estado === "enviado" && (
          <Aviso
            tipo="exito"
            titulo="¡Consulta enviada!"
            onCerrar={() => setEstado("inicial")}
            className="mt-5"
          >
            Gracias por escribirnos. Te vamos a responder a la brevedad.
          </Aviso>
        )}

        {estado === "error" && (
          <Aviso
            tipo="error"
            titulo="No pudimos enviar tu consulta"
            onCerrar={() => setEstado("inicial")}
            className="mt-5"
          >
            Revisá tu conexión y volvé a intentar. Si sigue fallando, escribinos
            a{" "}
            <a href={`mailto:${footer.email}`} className="underline">
              {footer.email}
            </a>{" "}
            o por{" "}
            <a
              href={footer.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              WhatsApp
            </a>
            .
          </Aviso>
        )}
      </div>

      {(estado === "inicial" || enviando) && (
        <p className="text-pr-gray-700 mt-4 text-center text-[12px] leading-[1.6]">
          También podés escribirnos directo a {footer.email}.
        </p>
      )}
    </form>
  );
}
