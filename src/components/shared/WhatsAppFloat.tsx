import { footer } from "@/lib/content";

/** Botón flotante fijo, visible en todas las páginas, como en el sitio actual. */
export default function WhatsAppFloat() {
  return (
    <a
      href={footer.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 md:right-8 md:bottom-8"
    >
      <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden>
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
  );
}
