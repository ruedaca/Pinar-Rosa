import { footer } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer>
      {/* Cierre de la página: recorte blanco encastrado en la esquina */}
      <div className="notch notch--br notch--bar ml-auto flex w-fit flex-col items-center gap-4 sm:flex-row sm:gap-8">
        <p className="text-pr-gray-700 text-[10px] tracking-[0.14em] uppercase">
          © {new Date().getFullYear()} Pinar Rosa Group · Pinamar, Argentina
        </p>
        <div className="flex items-center gap-2">
          <a
            href={footer.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp de Pinar Rosa Group"
            className="bg-pr-black hover:bg-pr-green-1 focus-visible:outline-pr-green-1 flex size-8 items-center justify-center rounded-full text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
              <path
                d="M4 20.2 5.3 16a7.7 7.7 0 1 1 2.9 2.8L4 20.2Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path
                d="M9.4 8.5c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.6 1.4c.1.2 0 .4-.1.5l-.4.5c-.1.2-.2.3 0 .6a6 6 0 0 0 2.4 2c.3.1.4 0 .6-.1l.5-.6c.2-.2.3-.1.5 0l1.3.7c.2.1.4.2.4.4a1.7 1.7 0 0 1-1.2 1.6c-.5.2-1.2.2-2.6-.4a9 9 0 0 1-3.7-3.4c-.5-.9-.7-1.7-.7-2.2 0-.5.2-.8.4-1Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href={footer.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram de Pinar Rosa Group"
            className="bg-pr-black hover:bg-pr-green-1 focus-visible:outline-pr-green-1 flex size-8 items-center justify-center rounded-full text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
              <rect
                x="3.5"
                y="3.5"
                width="17"
                height="17"
                rx="5"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <circle
                cx="12"
                cy="12"
                r="4"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
            </svg>
          </a>
          <a
            href={`mailto:${footer.email}`}
            aria-label={`Escribir a ${footer.email}`}
            className="bg-pr-black hover:bg-pr-green-1 focus-visible:outline-pr-green-1 flex size-8 items-center justify-center rounded-full text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
              <rect
                x="3"
                y="5.5"
                width="18"
                height="13"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="m4.5 8 7.5 5 7.5-5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
