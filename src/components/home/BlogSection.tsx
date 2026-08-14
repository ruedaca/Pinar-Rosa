import ArrowLink from "@/components/ui/ArrowLink";
import Eyebrow from "@/components/ui/Eyebrow";
import Media from "@/components/ui/Media";
import NotchFrame from "@/components/ui/NotchFrame";
import { posts } from "@/lib/content";

export default function BlogSection() {
  return (
    <section
      id="blog"
      className="scroll-mt-6 px-[var(--page-gutter)] pb-24 md:pb-36"
    >
      <header className="mx-auto max-w-2xl px-4 pb-10 text-center md:pb-14">
        <Eyebrow className="mb-6 text-center">Blog</Eyebrow>
        <h2 className="display display--section text-[clamp(1.9rem,5vw,3rem)] text-pr-black">
          Últimas novedades
        </h2>
        <p className="mx-auto mt-5 max-w-[50ch] text-[13px] leading-[1.7] text-pr-gray-700">
          Notas sobre arquitectura costera, tendencias de diseño sustentable y
          el mercado inmobiliario de Pinamar.
        </p>
      </header>

      <div className="grid gap-[var(--frame-gap)] md:grid-cols-2">
        {posts.map((post) => (
          <NotchFrame
            key={post.slug}
            className="aspect-[4/3] md:aspect-[16/9]"
            notchClassName="w-[76%] md:w-[46%]"
            notch={
              <article>
                <h3 className="max-w-[38ch] text-[13px] leading-[1.5] font-semibold text-pr-black">
                  {post.title}
                </h3>
                <ArrowLink href={`/blog/${post.slug}`} className="mt-4">
                  Leer artículo
                </ArrowLink>
              </article>
            }
          >
            <Media
              media={post.image}
              sizes="(min-width: 768px) 50vw, 100vw"
              tone="dark"
            />
          </NotchFrame>
        ))}
      </div>
    </section>
  );
}
