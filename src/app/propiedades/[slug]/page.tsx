import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ContactSection from "@/components/home/ContactSection";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import GaleriaFotos from "@/components/propiedad/GaleriaFotos";
import SeccionDesplegable from "@/components/propiedad/SeccionDesplegable";
import Eyebrow from "@/components/ui/Eyebrow";
import Foto from "@/components/ui/Foto";
import Media from "@/components/ui/Media";
import NotchFrame from "@/components/ui/NotchFrame";
import { mapaZona } from "@/lib/content";
import { buscarPropiedad, propiedades } from "@/lib/propiedades";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return propiedades.map((propiedad) => ({ slug: propiedad.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const propiedad = buscarPropiedad(slug);
  if (!propiedad) return {};

  return {
    title: `${propiedad.name} | Pinar Rosa`,
    description: `${propiedad.superficies.total} sobre un lote de ${propiedad.superficies.lote} en los bosques de Pinamar.`,
    openGraph: {
      title: `${propiedad.name} | Pinar Rosa`,
      description: propiedad.resumen,
      images: [{ url: propiedad.portada.src }],
      locale: "es_AR",
      type: "website",
    },
  };
}

export default async function PropiedadPage({ params }: Params) {
  const { slug } = await params;
  const propiedad = buscarPropiedad(slug);
  if (!propiedad) notFound();

  const { superficies } = propiedad;
  const fichaTecnica = [
    { titulo: "Terreno", valor: superficies.lote },
    { titulo: "Cubierta", valor: superficies.cubierta },
    { titulo: "Semicubierta", valor: superficies.semicubierta },
    { titulo: "Superficie total", valor: superficies.total },
    { titulo: "Dormitorios", valor: superficies.dormitorios },
    { titulo: "Pileta", valor: superficies.pileta },
  ];

  return (
    <>
      {/* Igual que en la home: la píldora flota sobre la foto de portada */}
      <SiteHeader />

      <main className="bg-pr-white relative z-10 rounded-b-[var(--radius-frame)]">
        <section className="px-[var(--page-gutter)] pt-[var(--page-top)] pb-14 md:pb-20">
          <NotchFrame
            corner="bottom-right"
            className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[48/25]"
            notchClassName="notch--roomy w-fit md:w-[34%] md:max-w-[400px]"
            notch={
              <>
                {/*
                  El h1 es siempre este, no el de la foto: en mobile es el
                  título visible y en desktop queda solo para lectores de
                  pantalla, porque ahí el nombre se lee sobre la portada.
                */}
                <span className="flex items-baseline gap-3 md:block">
                  <h1 className="text-pr-black text-[17px] font-semibold md:sr-only">
                    {propiedad.name}
                  </h1>
                  <span className="eyebrow text-pr-green-1 block md:mb-3">
                    {propiedad.disponible ? "En venta" : "Vendida"}
                  </span>
                </span>
                <p className="text-pr-gray-700 hidden text-[13px] leading-[1.6] md:block">
                  {propiedad.resumen}
                </p>
              </>
            }
            overlay={
              <p
                aria-hidden
                className="display absolute bottom-9 left-9 z-10 hidden text-[clamp(1.9rem,6vw,5.25rem)] text-white uppercase md:block"
              >
                {propiedad.name}
              </p>
            }
          >
            <Media
              media={propiedad.portada}
              sizes="(min-width: 768px) 100vw, 175vw"
              priority
              quality={85}
              tone="dark"
            />
            <div
              aria-hidden
              className="absolute -inset-px bg-gradient-to-t from-black/50 to-transparent"
            />
          </NotchFrame>
        </section>

        {/*
          Lleva menos padding que el resto a propósito: acá lo último es texto
          dentro de una celda con su propio padding, así que 56px se perciben
          como los 80px que separan a las demás secciones.
        */}
        <section className="px-[var(--page-gutter)] pb-10 md:pb-14">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <Eyebrow className="mb-6">El proyecto</Eyebrow>
              <div className="max-w-[46ch] space-y-4">
                {propiedad.descripcion.map((parrafo) => (
                  <p
                    key={parrafo.slice(0, 24)}
                    className="text-pr-gray-700 text-[13px] leading-[1.7]"
                  >
                    {parrafo}
                  </p>
                ))}
              </div>
            </div>

            {/* Un solo bloque: antes los destacados colgaban sueltos abajo */}
            <dl className="bg-pr-gray-200 grid grid-cols-2 gap-px self-start overflow-hidden rounded-[var(--radius-card)]">
              {fichaTecnica.map((fila) => (
                <div key={fila.titulo} className="bg-white p-5 md:p-6">
                  <dt className="eyebrow text-pr-gray-700">{fila.titulo}</dt>
                  <dd className="text-pr-black mt-2 text-[20px]">
                    {fila.valor}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <SeccionDesplegable eyebrow="Los ambientes" titulo="Cómo se recorre">
          <div>
            <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {propiedad.programa.map((ambiente) => (
                <li
                  key={ambiente}
                  className="border-pr-gray-200 text-pr-gray-700 border-b pb-3 text-[13px]"
                >
                  {ambiente}
                </li>
              ))}
            </ul>
          </div>
        </SeccionDesplegable>

        <SeccionDesplegable eyebrow="La casa" titulo="Cómo se ve">
          <GaleriaFotos fotos={propiedad.galeria} />
        </SeccionDesplegable>

        <SeccionDesplegable eyebrow="Los planos" titulo="Cómo está organizada">
          <div className="grid gap-[var(--frame-gap)] md:grid-cols-2">
            {/* Sin epígrafe: cada plano ya trae rotulada la planta y la
                referencia de ambientes dentro del dibujo. */}
            {propiedad.planos.map((plano) => (
              /* Fondo blanco: con object-contain el sobrante del marco se ve,
                 y sobre gris quedaba un borde alrededor del plano. */
              <div
                key={plano.src}
                className="marco-foto relative aspect-[3/2] bg-white"
              >
                <Foto
                  src={plano.src}
                  alt={`${plano.titulo} del ${propiedad.name}`}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  ajuste="contain"
                />
              </div>
            ))}
          </div>
        </SeccionDesplegable>

        <SeccionDesplegable eyebrow="La obra" titulo="Cómo va">
          <GaleriaFotos fotos={propiedad.obra} destacarPrimera={false} />
        </SeccionDesplegable>

        <SeccionDesplegable eyebrow="La ubicación" titulo={propiedad.direccion}>
          <div className="grid gap-[var(--frame-gap)] md:grid-cols-2">
            {[propiedad.mapa, mapaZona].map((mapa) => (
              <div
                key={mapa.src}
                className="bg-pr-gray-200 marco-foto relative aspect-[16/9]"
              >
                <Foto
                  src={mapa.src}
                  alt={mapa.alt}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        </SeccionDesplegable>

        <SeccionDesplegable
          eyebrow="Las terminaciones"
          titulo="Con qué se entrega"
        >
          <div>
            <dl className="grid gap-x-10 gap-y-6 md:grid-cols-2">
              {propiedad.materiales.map((material) => (
                <div
                  key={material.titulo}
                  className="border-pr-gray-200 border-t pt-4"
                >
                  <dt className="text-pr-black text-[13px] font-semibold">
                    {material.titulo}
                  </dt>
                  <dd className="text-pr-gray-700 mt-1 max-w-[52ch] text-[12px] leading-[1.65]">
                    {material.detalle}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </SeccionDesplegable>
      </main>

      <div className="bg-pr-black -mt-[var(--radius-frame)] pt-[var(--radius-frame)]">
        <ContactSection />
        <SiteFooter />
      </div>
    </>
  );
}
