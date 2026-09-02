import Logo from "@/components/ui/Logo";
import { footer } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="bg-pr-charcoal">
      {/* Línea de acento, igual a la que remata el pie del sitio actual */}
      <div className="from-pr-green-1 to-pr-green-3 h-[3px] bg-gradient-to-r" />

      <div className="flex flex-col items-center gap-6 px-[var(--page-gutter)] py-12 text-center md:flex-row md:justify-between md:py-14 md:text-left">
        <Logo className="opacity-90" />

        <div className="text-[13px] leading-[1.8] text-white/70">
          <p>{footer.direccion}</p>
          <p>
            <a
              href={`mailto:${footer.email}`}
              className="hover:text-pr-green-3 transition-colors"
            >
              {footer.email}
            </a>
            {" · "}
            <a
              href={footer.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hover:text-pr-green-3 transition-colors"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-[var(--page-gutter)] py-5">
        <p className="mx-auto max-w-4xl text-center text-[10px] leading-[1.6] text-white/40">
          (*) Todos los renders e imágenes del sitio web se exhiben con fines
          publicitarios y son a título meramente ilustrativo. Los materiales,
          terminaciones, etc. podrán ser modificados durante el proceso de obra.
          © {new Date().getFullYear()} Pinar Rosa Group.
        </p>
      </div>
    </footer>
  );
}
