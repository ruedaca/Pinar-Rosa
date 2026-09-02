import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Boton from "@/components/ui/Boton";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import Foto from "@/components/ui/Foto";
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

      <main>
        <article>
          <section className="px-[var(--page-gutter)] pt-14 pb-8 text-center md:pt-20">
            <p className="eyebrow text-pr-green-1 mb-3">
              {nota.categoria} · {nota.fechaTexto} · {nota.lectura} de lectura
            </p>
            <h1 className="display text-pr-black mx-auto max-w-[22ch] text-[clamp(1.8rem,5vw,3rem)]">
              {nota.titulo}
            </h1>
          </section>

          <section className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
            <Foto
              src={nota.portada.src}
              alt={nota.portada.alt}
              sizes="100vw"
              priority
              objectPosition={nota.portada.objectPosition}
            />
          </section>

          <div className="px-[var(--page-gutter)] py-14 md:py-20">
            <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[minmax(0,1fr)_280px] md:gap-16">
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

                    {indice === 1 ? (
                      <div className="marco-foto relative mt-12 aspect-[16/9]">
                        <Foto
                          src={nota.imagenInterior.src}
                          alt={nota.imagenInterior.alt}
                          sizes="(min-width: 768px) 60vw, 100vw"
                          objectPosition={nota.imagenInterior.objectPosition}
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
                  <Boton
                    href={`/desarrollos/${nota.relacionada.slug}`}
                    variant="contorno"
                    className="mt-5"
                  >
                    Ver la ficha
                  </Boton>
                </div>
              </aside>
            </div>
          </div>
        </article>

        <section className="px-[var(--page-gutter)] pb-14 text-center md:pb-20">
          <Boton href="/blog" variant="contorno">
            Volver al blog
          </Boton>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
