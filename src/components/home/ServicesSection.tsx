import Media from "@/components/ui/Media";
import NotchFrame from "@/components/ui/NotchFrame";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

type Service = (typeof services)[number];
type Corner = "bottom-left" | "bottom-right";

function ServiceCard({
  service,
  corner,
  className,
  sizes,
}: {
  service: Service;
  corner: Corner;
  className?: string;
  sizes: string;
}) {
  return (
    <NotchFrame
      corner={corner}
      className={cn("min-h-[300px]", className)}
      notchClassName="w-fit md:w-[57%]"
      notch={
        <article>
          <h3 className="text-pr-black text-[17px] font-semibold">
            {service.title}
          </h3>
          {/* En mobile la tarjeta queda solo con el título */}
          <p className="text-pr-gray-700 mt-1.5 hidden text-[12px] leading-[1.55] md:block">
            {service.description}
          </p>
        </article>
      }
    >
      <Media media={service.image} sizes={sizes} quality={85} />
    </NotchFrame>
  );
}

export default function ServicesSection() {
  const [main, ...rest] = services;

  /*
    El lado del recorte es posicional, no propio de cada servicio: el marco alto
    lo lleva a la izquierda y los apilados alternan derecha/izquierda, para que
    dos tarjetas vecinas nunca se lean iguales.
  */
  const stackedCorners: Corner[] = ["bottom-right", "bottom-left"];

  return (
    <section
      aria-label="Servicios del estudio"
      className="px-[var(--page-gutter)] pb-14 md:pb-20"
    >
      {/*
        Las dos columnas son items de grid: se estiran a la misma altura.
        La derecha fija la altura con la proporción de sus dos marcos (16:8.6),
        que las deja casi sin recortar, y la izquierda estira el suyo para
        cerrar exactamente contra ella.
      */}
      <div className="grid gap-[var(--frame-gap)] md:grid-cols-2">
        {/*
          `sizes` acá no es el ancho del marco. Como el marco es vertical y la
          foto apaisada, `object-cover` escala por el alto: la imagen se dibuja
          a alto × 1.78 de ancho y recién después se recorta. Pedir 50vw hacía
          que el navegador bajara una variante de 750px y la agrandara casi al
          doble — de ahí que se viera pixelada.
        */}
        <ServiceCard
          service={main}
          corner="bottom-left"
          className="md:h-full"
          sizes="(min-width: 768px) 1400px, 200vw"
        />

        <div className="flex flex-col gap-[var(--frame-gap)]">
          {rest.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              corner={stackedCorners[index]}
              className="md:aspect-[16/8.6] md:min-h-0"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
