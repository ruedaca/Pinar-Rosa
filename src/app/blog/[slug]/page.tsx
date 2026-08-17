import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import ContactSection from "@/components/home/ContactSection";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import ArrowLink from "@/components/ui/ArrowLink";
import NotchFrame from "@/components/ui/NotchFrame";
import { buscarNota, notas } from "@/lib/notas";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return notas.map((nota) => ({ slug: nota.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const nota = buscarNota(slug);
  if (!nota) return {};

  return {
    title: `${nota.titulo} | Pinar Rosa`,
    description: nota.bajada,
    openGraph: {
      title: nota.titulo,
      description: nota.bajada,
      images: [{ url: nota.portada.src }],
      locale: "es_AR",
      type: "article",
      publishedTime: nota.fecha,
    },
  };
}

export default async function NotaPage({ params }: Params) {
  const { slug } = await params;
  const nota = buscarNota(slug);
  if (!nota) notFound();

  return (
    <>
      <SiteHeader />

      <main className="bg-pr-white relative z-10 rounded-b-[var(--radius-frame)]">
        <article>
          <section className="px-[var(--page-gutter)] pt-[var(--page-top)] pb-14 md:pb-20">
            <NotchFrame
              corner="bottom-right"
              className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
              notchClassName="notch--roomy w-[82%] md:w-[34%] md:max-w-[400px]"
              notch={
                <p className="text-pr-gray-700 text-[13px] leading-[1.6]">
                  {nota.bajada}
                </p>
              }
              overlay={
                <h1 className="display absolute bottom-64 left-6 z-10 max-w-[16ch] text-[clamp(1.6rem,4.5vw,3.5rem)] text-white sm:bottom-10 md:bottom-9 md:left-9">
                  {nota.titulo}
                </h1>
              }
            >
              <Image
                src={nota.portada.src}
                alt={nota.portada.alt}
                fill
                sizes="100vw"
                priority
                className="object-cover"
                style={{ objectPosition: nota.portada.objectPosition }}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"
              />
            </NotchFrame>
          </section>

          <div className="mx-auto max-w-7xl px-4 pb-14 md:px-8 md:pb-20 lg:px-12">
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_280px] md:gap-16">
              <div>
                {nota.bloques.map((bloque, indice) => (
                  <section
                    key={bloque.titulo}
                    className={indice === 0 ? "" : "mt-12"}
                  >
                    <h2 className="text-pr-black text-[19px] font-semibold">
                      {bloque.titulo}
                    </h2>
                    {bloque.parrafos.map((parrafo) => (
                      <p
                        key={parrafo.slice(0, 24)}
                        className="text-pr-gray-700 mt-4 max-w-[58ch] text-[14px] leading-[1.75]"
                      >
                        {parrafo}
                      </p>
                    ))}

                    {/* La foto entra a mitad de la nota, no al final */}
                    {/* Sin epígrafe: repetía el alt y no sumaba nada */}
                    {indice === 1 ? (
                      <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[var(--radius-frame)]">
                        <Image
                          src={nota.imagenInterior.src}
                          alt={nota.imagenInterior.alt}
                          fill
                          sizes="(min-width: 768px) 60vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                  </section>
                ))}
              </div>

              <aside className="md:pt-2">
                <div className="border-pr-gray-200 rounded-[var(--radius-card)] border p-6">
                  <p className="eyebrow text-pr-gray-700">La casa de la nota</p>
                  <p className="text-pr-black mt-3 text-[17px] font-semibold">
                    {nota.relacionada.nombre}
                  </p>
                  <p className="text-pr-gray-700 mt-2 text-[12px] leading-[1.6]">
                    {nota.relacionada.texto}
                  </p>
                  <ArrowLink
                    href={`/propiedades/${nota.relacionada.slug}`}
                    className="mt-5"
                  >
                    Ver la ficha
                  </ArrowLink>
                </div>
              </aside>
            </div>
          </div>
        </article>

        {/* El cierre de la nota es solo la vuelta: el resto de las notas ya
            están en la home, a un clic de acá */}
        <section className="px-[var(--page-gutter)] pb-14 text-center md:pb-20">
          <Link
            href="/#blog"
            className="bg-pr-black hover:bg-pr-green-1 focus-visible:outline-pr-green-1 inline-block rounded-full px-7 py-3.5 text-[10px] font-medium tracking-[0.18em] text-white uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Volver al blog
          </Link>
        </section>
      </main>

      <div className="bg-pr-black -mt-[var(--radius-frame)] pt-[var(--radius-frame)]">
        <ContactSection />
        <SiteFooter />
      </div>
    </>
  );
}
