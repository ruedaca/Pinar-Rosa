import ProyectoPropioButton from "@/components/shared/ProyectoPropioButton";
import Eyebrow from "@/components/ui/Eyebrow";
import { about } from "@/lib/content";

export default function AboutSection() {
  return (
    <section
      id="estudio"
      className="mx-auto max-w-7xl scroll-mt-6 px-4 pt-12 pb-16 md:px-8 md:pt-20 md:pb-24 lg:px-12"
    >
      {/* La etiqueta va arriba de todo y el título entra bien más abajo */}
      <Eyebrow className="mb-14 md:mb-20">{about.eyebrow}</Eyebrow>

      <div className="grid gap-8 md:grid-cols-2 md:gap-16">
        {/* Cada entrada de `title` es una línea: no debe reflowear */}
        <h2 className="display display--section text-pr-black text-[clamp(1.6rem,4.5vw,2.75rem)]">
          {about.title.map((line) => (
            <span key={line} className="block whitespace-nowrap">
              {line}
            </span>
          ))}
        </h2>

        <div className="max-w-[46ch] space-y-4">
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph.slice(0, 24)}
              className={
                index === 0
                  ? "text-pr-black text-[15px] leading-[1.65]"
                  : "text-pr-gray-700 text-[13px] leading-[1.7]"
              }
            >
              {paragraph}
            </p>
          ))}

          <ProyectoPropioButton />
        </div>
      </div>
    </section>
  );
}
