import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import ContactSection from "@/components/home/ContactSection";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import GaleriaFotos from "@/components/propiedad/GaleriaFotos";
import Eyebrow from "@/components/ui/Eyebrow";
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

function Seccion({
  eyebrow,
  titulo,
  children,
}: {
  eyebrow: string;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-[var(--page-gutter)] pb-14 md:pb-20">
      <header className="mx-auto max-w-7xl px-4 pb-8 md:px-8 md:pb-12 lg:px-12">
        <Eyebrow className="mb-6 md:mb-10">{eyebrow}</Eyebrow>
        <h2 className="display display--section text-pr-black text-[clamp(1.6rem,4vw,2.5rem)]">
          {titulo}
        </h2>
      </header>
      {children}
    </section>
  );
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
            className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[48/25]"
            notchClassName="notch--roomy w-[82%] md:w-[34%] md:max-w-[400px]"
            notch={
              <>
                <p className="eyebrow text-pr-green-1 mb-3">
                  {propiedad.disponible ? "En venta" : "Vendida"}
                </p>
                <p className="text-pr-gray-700 text-[13px] leading-[1.6]">
                  {propiedad.resumen}
                </p>
              </>
            }
            overlay={
              <h1 className="display absolute bottom-64 left-6 z-10 text-[clamp(1.9rem,6vw,5.25rem)] text-white uppercase sm:bottom-10 md:bottom-9 md:left-9">
                {propiedad.name}
              </h1>
            }
          >
            <Media
              media={propiedad.portada}
              sizes="100vw"
              priority
              tone="dark"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
            />
          </NotchFrame>
        </section>

        {/*
          Lleva menos padding que el resto a propósito: acá lo último es texto
          dentro de una celda con su propio padding, así que 56px se perciben
          como los 80px que separan a las demás secciones.
        */}
        <section className="mx-auto max-w-7xl px-4 pb-10 md:px-8 md:pb-14 lg:px-12">
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

        <Seccion eyebrow="Los ambientes" titulo="Cómo se recorre">
          <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
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
        </Seccion>

        <Seccion eyebrow="La casa" titulo="Cómo se ve">
          <GaleriaFotos fotos={propiedad.galeria} />
        </Seccion>

        <Seccion eyebrow="Los planos" titulo="Cómo está organizada">
          <div className="grid gap-[var(--frame-gap)] md:grid-cols-2">
            {/* Sin epígrafe: cada plano ya trae rotulada la planta y la
                referencia de ambientes dentro del dibujo. */}
            {propiedad.planos.map((plano) => (
              /* Fondo blanco: con object-contain el sobrante del marco se ve,
                 y sobre gris quedaba un borde alrededor del plano. */
              <div
                key={plano.src}
                className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-frame)] bg-white"
              >
                <Image
                  src={plano.src}
                  alt={`${plano.titulo} del ${propiedad.name}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </Seccion>

        <Seccion eyebrow="La obra" titulo="Cómo va">
          <GaleriaFotos fotos={propiedad.obra} destacarPrimera={false} />
        </Seccion>

        <Seccion eyebrow="La ubicación" titulo={propiedad.direccion}>
          <div className="grid gap-[var(--frame-gap)] md:grid-cols-2">
            {[propiedad.mapa, mapaZona].map((mapa) => (
              <div
                key={mapa.src}
                className="bg-pr-gray-200 relative aspect-[16/9] overflow-hidden rounded-[var(--radius-frame)]"
              >
                <Image
                  src={mapa.src}
                  alt={mapa.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Seccion>

        <Seccion eyebrow="Las terminaciones" titulo="Con qué se entrega">
          <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
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
        </Seccion>
      </main>

      <div className="bg-pr-black -mt-[var(--radius-frame)] pt-[var(--radius-frame)]">
        <ContactSection />
        <SiteFooter />
      </div>
    </>
  );
}
