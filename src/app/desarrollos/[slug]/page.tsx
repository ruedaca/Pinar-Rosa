import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import GaleriaFotos from "@/components/propiedad/GaleriaFotos";
import Planos from "@/components/propiedad/Planos";
import SeccionDesplegable from "@/components/propiedad/SeccionDesplegable";
import Foto from "@/components/ui/Foto";
import Media from "@/components/ui/Media";
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
      <SiteHeader />

      <main>
        <section className="px-[var(--page-gutter)] pt-14 pb-8 text-center md:pt-20">
          <p className="eyebrow text-pr-green-1 mb-3">
            {propiedad.disponible ? "En venta" : "Vendida"}
          </p>
          <h1 className="display text-pr-black text-[clamp(2rem,6vw,3.5rem)]">
            {propiedad.name}
          </h1>
          <p className="text-pr-gray-700 mt-3 text-[13px] tracking-[0.06em] uppercase">
            Pinamar Norte
            <span className="text-pr-gray-400 mx-2">|</span>
            {propiedad.direccion}
          </p>
        </section>

        <section className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
          <Media
            media={propiedad.portada}
            sizes="100vw"
            priority
            quality={85}
          />
        </section>

        <section className="px-[var(--page-gutter)] py-14 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="eyebrow text-pr-green-1 mb-4">El proyecto</p>
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
            <ul className="mx-auto grid max-w-6xl gap-x-10 gap-y-3 sm:grid-cols-2">
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
          <div className="mx-auto max-w-6xl">
            <GaleriaFotos fotos={propiedad.galeria} />
          </div>
        </SeccionDesplegable>

        <SeccionDesplegable eyebrow="Los planos" titulo="Cómo está organizada">
          <div className="mx-auto max-w-3xl">
            <Planos
              planos={propiedad.planos}
              nombrePropiedad={propiedad.name}
            />
          </div>
        </SeccionDesplegable>

        <SeccionDesplegable eyebrow="La obra" titulo="Cómo va">
          <div className="mx-auto max-w-6xl">
            <GaleriaFotos fotos={propiedad.obra} destacarPrimera={false} />
          </div>
        </SeccionDesplegable>

        <SeccionDesplegable eyebrow="La ubicación" titulo={propiedad.direccion}>
          <div className="mx-auto grid max-w-6xl gap-[var(--frame-gap)] md:grid-cols-2">
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
          <div className="mx-auto max-w-6xl">
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

      <SiteFooter />
    </>
  );
}
