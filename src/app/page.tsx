import AboutSection from "@/components/home/AboutSection";
import BlogSection from "@/components/home/BlogSection";
import ContactSection from "@/components/home/ContactSection";
import Hero from "@/components/home/Hero";
import ProjectsSection from "@/components/home/ProjectsSection";
import ServicesSection from "@/components/home/ServicesSection";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      {/*
        La parte blanca cierra con las esquinas de abajo redondeadas: el bloque
        negro se mete detrás con un margen negativo y sólo asoma en esas dos
        esquinas, igual que el radio de los marcos de imagen.
      */}
      <main className="bg-pr-white relative z-10 rounded-b-[var(--radius-frame)]">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <BlogSection />
      </main>
      <div className="bg-pr-black -mt-[var(--radius-frame)] pt-[var(--radius-frame)]">
        <ContactSection />
        <SiteFooter />
      </div>
    </>
  );
}
