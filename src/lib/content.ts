import type { MediaSource } from "@/components/ui/Media";

/**
 * Contenido de la home. Todo el copy vive acá para que sea fácil de editar
 * sin tocar los componentes. Las imágenes con `kind: "photo"` ya son las
 * definitivas; las `kind: "placeholder"` esperan la foto real, y su `slot`
 * indica el nombre de archivo sugerido dentro de /public.
 */

/** Todo el menú baja a secciones de la home: no hay páginas internas todavía. */
export const nav = [
  { label: "Estudio", href: "/#estudio" },
  { label: "Propiedades", href: "/#propiedades" },
  { label: "Blog", href: "/#blog" },
  { label: "Contacto", href: "/#contacto" },
];

export const hero = {
  titleLines: ["Construimos", "el futuro"],
  intro:
    "Elevá tu forma de habitar la costa. Pinar Rosa Group desarrolla arquitectura contemporánea en Pinamar: casas que dialogan con el bosque, el médano y el mar.",
  image: {
    kind: "photo",
    src: "/PORTADA.png",
    alt: "Casa de dos plantas en hormigón visto al atardecer, con grandes paños vidriados iluminados, galería, pileta y pinos alrededor",
  } satisfies MediaSource,
};

export const partners = [
  "Estudio Galindo",
  "Reyes Arquitectura",
  "Vidal & Asoc.",
  "Cámara Inmobiliaria",
  "Pinamar Diseño",
  "Costa Atlántica",
];

export const about = {
  eyebrow: "Qué hacemos",
  title: ["Arquitectura", "que da forma al futuro"],
  paragraphs: [
    "En Pinar Rosa Group combinamos diseño y conciencia ambiental para repensar la vida moderna en la costa. Con una obsesión por el detalle, proyectamos espacios funcionales y sobrios que resisten el paso del tiempo mientras minimizan su huella sobre el médano.",
    "Nuestro equipo de arquitectos, desarrolladores y directores de obra trabaja de forma integrada. Cada casa nace de un estudio del terreno, de la orientación del sol y de la vegetación existente: nada se tala si puede rodearse.",
    "Tres casas, tres estudios, una misma manera de entender Pinamar. Sumate al recorrido y descubrí en qué se convierte una idea cuando se la construye con criterio.",
  ],
};

/**
 * El orden define la posición en la grilla: el primero ocupa el marco alto de
 * la izquierda y los otros dos van apilados a la derecha.
 */
export const services = [
  {
    title: "Exteriores",
    description:
      "Decks, galerías y parquización nativa: el afuera como una habitación más de la casa durante todo el año.",
    image: {
      kind: "photo",
      src: "/exterior.png",
      alt: "Galería exterior al anochecer con parrilla, comedor y estar bajo losa de hormigón, y al fondo la pileta con reposeras y fogonero sobre el parque",
      // Marco vertical: recorta a lo ancho. El encuadre va contra el borde
      // derecho para quedarse con la galería entera y ceder el parque.
      objectPosition: "right center",
    } satisfies MediaSource,
  },
  {
    title: "Interiorismo",
    description:
      "Espacios que reflejan a quien los habita. Paletas naturales, luz cenital y piezas seleccionadas una por una.",
    image: {
      kind: "photo",
      src: "/interior1.jpg",
      alt: "Comedor diario integrado a la cocina: mesa y sillas de madera clara, respaldo de listones, isla de mármol y celosía negra que separa los ambientes",
    } satisfies MediaSource,
  },
  {
    title: "Arquitectura",
    description:
      "De la idea a la obra: proyectos residenciales que integran volumetría limpia, materiales nobles y una relación honesta con el paisaje boscoso.",
    image: {
      kind: "photo",
      src: "/arquitectura1.JPG",
      alt: "Frente de una casa de dos plantas en hormigón visto al atardecer, con puerta de acceso en madera, garaje y terraza verde, rodeada de pinos",
      // El marco horizontal casi no recorta (4%), así que para sacar cielo hay
      // que acercar: se ancla abajo y algo a la izquierda para no comerse el
      // borde de la casa, y lo que sale por arriba es cielo.
      objectPosition: "35% bottom",
      zoom: 1.22,
    } satisfies MediaSource,
  },
];

export const projects = [
  {
    name: "Lote 5",
    slug: "lote-5",
    summary:
      "280 m² cubiertos sobre un lote de 900 m² en Pinamar Norte. El volumen se implanta entre los pinos existentes y se abre al parque por una galería continua.",
    image: {
      kind: "photo",
      src: "/LOTE5.png",
      alt: "Lote 5 al anochecer: volumen de dos plantas entre pinos altos, galería iluminada y pileta en primer plano",
    } satisfies MediaSource,
  },
  {
    name: "Lote 6",
    slug: "lote-6",
    summary:
      "Planta baja íntegramente vidriada y un volumen superior en voladizo. La pileta acompaña el eje de la galería y estira la casa hacia el fondo del lote.",
    image: {
      kind: "photo",
      src: "/LOTE6.JPG",
      alt: "Lote 6: planta baja vidriada con comedor y estar a la vista, volumen superior en voladizo y pileta en L rodeada de deck",
    } satisfies MediaSource,
  },
  {
    name: "Lote 7",
    slug: "lote-7",
    summary:
      "A 300 metros del mar. Carpinterías de madera, hormigón y un frente de piedra que ancla la casa al médano sin taparle la vista al pinar.",
    image: {
      kind: "photo",
      src: "/LOTE7.jpg",
      alt: "Lote 7: frente longitudinal en hormigón con carpinterías de madera, terraza verde y pileta larga sobre la arena",
      // El marco recorta apenas a lo alto, así que para sacar cielo hay que
      // acercar: anclado abajo, lo que sale por arriba son las nubes.
      objectPosition: "center bottom",
      zoom: 1.12,
    } satisfies MediaSource,
  },
];

export const posts = [
  {
    title:
      "Casas inteligentes: cómo integrar tecnología sin romper el diseño",
    slug: "casas-inteligentes-diseno",
    image: {
      kind: "placeholder",
      slot: "blog/domotica-dormitorio",
      ratio: "4:3",
    } satisfies MediaSource,
  },
  {
    title:
      "Materiales sustentables: el camino hacia una arquitectura más honesta",
    slug: "materiales-sustentables",
    image: {
      kind: "placeholder",
      slot: "blog/materiales-fachada",
      ratio: "4:3",
    } satisfies MediaSource,
  },
];

/** Título del bloque de cierre, arriba del formulario de contacto. */
export const cta = {
  titleLines: ["Demos forma a", "tu próximo hogar"],
};

export const footer = {
  email: "pinar.rosa.group@gmail.com",
  instagram: "https://instagram.com/pinarrosagroup",
  // PENDIENTE: reemplazar por el número real, con código de país y sin signos
  // (formato wa.me, ej. https://wa.me/5492254123456).
  whatsapp: "https://wa.me/000000000000",
};
