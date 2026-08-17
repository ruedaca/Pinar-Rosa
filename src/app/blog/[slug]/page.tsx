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

  const otras = notas.filter((otra) => otra.slug !== nota.slug);

  return (
    <>
      <SiteHeader />

      <main className="bg-pr-white relative z-10 rounded-b-[var(--radius-frame)]">
        <article>
          <section className="px-[var(--page-gutter)] pt-[var(--page-top)] pb-14 md:pb-20">
            <NotchFrame
              corner="bottom-right"
              className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[48/25]"
              notchClassName="notch--roomy w-[82%] md:w-[30%] md:max-w-[340px]"
              notch={
                <dl className="grid grid-cols-2 gap-y-4 text-[12px] md:grid-cols-1">
                  <div>
                    <dt className="eyebrow text-pr-gray-400">Categoría</dt>
                    <dd className="text-pr-black mt-1">{nota.categoria}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-pr-gray-400">Publicada</dt>
                    <dd className="text-pr-black mt-1">{nota.fechaTexto}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-pr-gray-400">Lectura</dt>
                    <dd className="text-pr-black mt-1">{nota.lectura}</dd>
                  </div>
                </dl>
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
                <p className="text-pr-black max-w-[52ch] text-[16px] leading-[1.6]">
                  {nota.bajada}
                </p>

                {nota.bloques.map((bloque, indice) => (
                  <section key={bloque.titulo} className="mt-12">
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
                    {indice === 1 ? (
                      <figure className="mt-12">
                        <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-frame)]">
                          <Image
                            src={nota.imagenInterior.src}
                            alt={nota.imagenInterior.alt}
                            fill
                            sizes="(min-width: 768px) 60vw, 100vw"
                            className="object-cover"
                          />
                        </div>
                        <figcaption className="text-pr-gray-400 mt-3 text-[12px]">
                          {nota.imagenInterior.alt}
                        </figcaption>
                      </figure>
                    ) : null}
                  </section>
                ))}
              </div>

              <aside className="md:pt-2">
                <div className="border-pr-gray-200 rounded-[var(--radius-card)] border p-6">
                  <p className="eyebrow text-pr-gray-400">La casa de la nota</p>
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

        {otras.length > 0 ? (
          <section className="px-[var(--page-gutter)] pb-14 md:pb-20">
            <header className="mx-auto max-w-7xl px-4 pb-8 md:px-8 md:pb-12 lg:px-12">
              <h2 className="display display--section text-pr-black text-[clamp(1.6rem,4vw,2.5rem)]">
                Seguir leyendo
              </h2>
            </header>

            <div className="grid gap-[var(--frame-gap)] md:grid-cols-2">
              {otras.map((otra) => (
                <NotchFrame
                  key={otra.slug}
                  className="aspect-[4/3] md:aspect-[16/9]"
                  notchClassName="w-[76%] md:w-[46%]"
                  notch={
                    <article>
                      <h3 className="text-pr-black max-w-[38ch] text-[13px] leading-[1.5] font-semibold">
                        {otra.titulo}
                      </h3>
                      <ArrowLink href={`/blog/${otra.slug}`} className="mt-4">
                        Leer artículo
                      </ArrowLink>
                    </article>
                  }
                >
                  <Image
                    src={otra.portada.src}
                    alt={otra.portada.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </NotchFrame>
              ))}

              {otras.length === 1 ? (
                <div className="hidden md:block" aria-hidden />
              ) : null}
            </div>

            <div className="mx-auto mt-10 max-w-7xl px-4 md:px-8 lg:px-12">
              <Link
                href="/#blog"
                className="border-pr-gray-200 hover:border-pr-green-1 hover:text-pr-green-1 focus-visible:outline-pr-green-1 inline-block rounded-full border px-6 py-3.5 text-[10px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Volver al blog
              </Link>
            </div>
          </section>
        ) : null}
      </main>

      <div className="bg-pr-black -mt-[var(--radius-frame)] pt-[var(--radius-frame)]">
        <ContactSection />
        <SiteFooter />
      </div>
    </>
  );
}
