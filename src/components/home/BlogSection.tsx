import ArrowLink from "@/components/ui/ArrowLink";
import Foto from "@/components/ui/Foto";
import Eyebrow from "@/components/ui/Eyebrow";
import NotchFrame from "@/components/ui/NotchFrame";
import { notas } from "@/lib/notas";

export default function BlogSection() {
  return (
    <section
      id="blog"
      className="scroll-mt-6 px-[var(--page-gutter)] pb-14 md:pb-20"
    >
      <header className="mx-auto max-w-2xl px-4 pb-10 text-center md:pb-14">
        <Eyebrow className="mb-6 text-center md:mb-10">Blog</Eyebrow>
        <h2 className="display display--section text-pr-black text-[clamp(1.9rem,5vw,3rem)]">
          Últimas novedades
        </h2>
        <p className="text-pr-gray-700 mx-auto mt-5 max-w-[50ch] text-[13px] leading-[1.7]">
          Cómo se piensan y cómo se construyen las casas, contado por quienes
          las proyectan.
        </p>
      </header>

      <div className="grid gap-[var(--frame-gap)] md:grid-cols-2">
        {notas.map((nota) => (
          <NotchFrame
            key={nota.slug}
            className="aspect-[4/3] md:aspect-[16/9]"
            notchClassName="w-fit md:w-[46%]"
            notch={
              <article>
                <p className="eyebrow text-pr-gray-700 md:mb-2">
                  {nota.categoria}
                </p>
                {/* En mobile alcanza con la categoría y el enlace */}
                <h3 className="text-pr-black hidden max-w-[38ch] text-[13px] leading-[1.5] font-semibold md:block">
                  {nota.titulo}
                </h3>
                <ArrowLink href={`/blog/${nota.slug}`} className="mt-3 md:mt-4">
                  Leer artículo
                </ArrowLink>
              </article>
            }
          >
            <Foto
              src={nota.portada.src}
              alt={nota.portada.alt}
              sizes="(min-width: 768px) 50vw, 130vw"
              quality={85}
              objectPosition={nota.portada.objectPosition}
            />
          </NotchFrame>
        ))}
      </div>
    </section>
  );
}
