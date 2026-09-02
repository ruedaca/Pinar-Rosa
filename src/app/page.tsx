import BandaCTA from "@/components/shared/BandaCTA";
import Hero from "@/components/home/Hero";
import Teaser from "@/components/home/Teaser";
import Reveal from "@/components/ui/Reveal";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { about, projects, services } from "@/lib/content";
import { notas } from "@/lib/notas";

export default function Home() {
  const [primerLote, ...otrosLotes] = projects;
  const [primeraNota] = notas;

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />

        <Reveal>
          <Teaser
            eyebrow="El Estudio"
            title={about.title.join(" ")}
            paragraph={about.paragraphs[0]}
            ctaLabel="Ver más"
            ctaHref="/el-estudio"
            image={services[2].image}
            imageSide="left"
          />
        </Reveal>

        <Reveal>
          <BandaCTA />
        </Reveal>

        <Reveal>
          <Teaser
            eyebrow="Desarrollos"
            title="Nuestros desarrollos"
            paragraph={`Creemos que la arquitectura va más allá de la construcción de estructuras: es la creación de experiencias. ${primerLote.resumen} ${otrosLotes.map((l) => l.name).join(" y ")} completan la propuesta.`}
            ctaLabel="Ver más"
            ctaHref="/desarrollos"
            image={primerLote.portada}
            imageSide="right"
          />
        </Reveal>

        <Reveal>
          <Teaser
            eyebrow="Blog"
            title="Últimas novedades"
            paragraph={primeraNota.bajada}
            ctaLabel="Ver más"
            ctaHref="/blog"
            image={{ kind: "photo", ...primeraNota.portada }}
            imageSide="left"
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
