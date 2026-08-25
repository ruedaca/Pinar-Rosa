import ArrowLink from "@/components/ui/ArrowLink";
import Eyebrow from "@/components/ui/Eyebrow";
import Media from "@/components/ui/Media";
import NotchFrame from "@/components/ui/NotchFrame";
import { projects } from "@/lib/content";

export default function ProjectsSection() {
  return (
    <section
      id="propiedades"
      className="scroll-mt-6 px-[var(--page-gutter)] pb-14 md:pb-20"
    >
      <header className="mx-auto max-w-2xl px-4 pb-10 text-center md:pb-14">
        <Eyebrow className="mb-6 text-center md:mb-10">
          Obra seleccionada
        </Eyebrow>
        <h2 className="display display--section text-pr-black text-[clamp(1.9rem,5vw,3rem)]">
          <span className="block">Casas que respiran</span>
          <span className="block">el bosque</span>
        </h2>
        <p className="text-pr-gray-700 mx-auto mt-5 max-w-[52ch] text-[13px] leading-[1.7]">
          Una selección de los proyectos que mejor resumen nuestra manera de
          construir en Pinamar: materiales nobles, escala doméstica y una
          implantación que respeta cada pino existente.
        </p>
      </header>

      <div className="flex flex-col gap-[var(--frame-gap)]">
        {projects.map((project) => (
          <NotchFrame
            key={project.slug}
            corner="bottom-right"
            className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[48/25]"
            notchClassName="w-fit md:w-[30%] md:max-w-[400px]"
            notch={
              <article>
                {/* El resumen completo vive en la ficha; acá en mobile solo el enlace */}
                <p className="text-pr-gray-700 hidden text-[12px] leading-[1.65] md:block">
                  {project.resumen}
                </p>
                <ArrowLink
                  href={`/propiedades/${project.slug}`}
                  className="md:mt-5"
                >
                  Ver proyecto
                </ArrowLink>
              </article>
            }
            overlay={
              <h3 className="display absolute bottom-6 left-6 z-10 text-[clamp(1.85rem,6vw,4.25rem)] text-white uppercase sm:bottom-8 md:bottom-9 md:left-9">
                {project.name}
              </h3>
            }
          >
            <Media
              media={project.portada}
              sizes="(min-width: 768px) 100vw, 175vw"
              quality={85}
              tone="dark"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"
            />
          </NotchFrame>
        ))}
      </div>
    </section>
  );
}
