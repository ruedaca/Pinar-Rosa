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

/** El titular sale de la memoria descriptiva de los propios proyectos. */
export const hero = {
  titleLines: ["Donde el límite", "es el bosque"],
  intro:
    "Tres casas en los bosques de Pinamar, proyectadas y construidas por Pinar Rosa. Hormigón armado y vidrio: la casa se abre hasta que el cierre lo pone el pinar.",
  action: { label: "Contactanos", href: "#contacto" },
  image: {
    kind: "photo",
    src: "/lotes/lote-6/portada.jpg",
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
  eyebrow: "El estudio",
  title: ["Del proyecto", "a la llave"],
  paragraphs: [
    "Somos estudio de arquitectura y desarrolladora. Proyectamos, dirigimos la obra y entregamos la casa terminada: la cocina a medida, los placares y la climatización ya puestos.",
    "Cada proyecto parte de dos materiales. El hormigón armado sostiene y libera la planta, sin muros que obliguen a nada. El vidrio se abre o se cierra según la hora y la estación; cuando se abre del todo, el cerramiento lo termina haciendo el bosque.",
    "Con los encargos particulares trabajamos igual: del anteproyecto a la entrega, un solo equipo y un solo interlocutor.",
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
      src: "/lotes/lote-5/galeria.jpg",
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
      src: "/lotes/lote-5/cocina-comedor.jpg",
      alt: "Comedor diario integrado a la cocina: mesa y sillas de madera clara, respaldo de listones, isla de mármol y celosía negra que separa los ambientes",
    } satisfies MediaSource,
  },
  {
    title: "Arquitectura",
    description:
      "De la idea a la obra: proyectos residenciales que integran volumetría limpia, materiales nobles y una relación honesta con el paisaje boscoso.",
    image: {
      kind: "photo",
      src: "/lotes/lote-7/frente.jpg",
      alt: "Frente de una casa de dos plantas en hormigón visto al atardecer, con puerta de acceso en madera, garaje y terraza verde, rodeada de pinos",
      // El marco horizontal casi no recorta (4%), así que para sacar cielo hay
      // que acercar: se ancla abajo y algo a la izquierda para no comerse el
      // borde de la casa, y lo que sale por arriba es cielo.
      objectPosition: "35% bottom",
      zoom: 1.22,
    } satisfies MediaSource,
  },
];

/** Los tres lotes comparten ubicación, así que el mapa de zona es uno solo. */
export const mapaZona = {
  src: "/lotes/mapa-zona.jpg",
  alt: "Vista satelital de Pinamar señalando el centro comercial, el bosque, La Frontera y la ubicación de los proyectos",
};

/**
 * Superficies, programa y materiales salen de las fichas oficiales
 * (PDF de cada lote, julio 2026). No inventar datos: si falta uno, se pregunta.
 * `mapa` y `planos` se extrajeron de esos mismos PDF.
 */
export const projects = [
  {
    name: "Lote 5",
    slug: "lote-5",
    disponible: true,
    mapa: {
      src: "/lotes/lote-5/mapa-lote.jpg",
      alt: "Vista satelital con el Lote 5 marcado sobre la manzana",
    },
    planos: [
      { src: "/lotes/lote-5/plano-baja.png", titulo: "Planta baja" },
      { src: "/lotes/lote-5/plano-alta.png", titulo: "Planta alta" },
    ],
    superficies: { lote: "1.392 m²", cubierta: "279 m²", total: "335 m²" },
    dormitorios: "Master suite + 2",
    summary:
      "279 m² cubiertos sobre un lote de 1.392 m². Master suite con vestidor e hidromasaje, dos dormitorios, estudio y una galería con parrilla que se abre a la pileta de 40 m².",
    image: {
      kind: "photo",
      src: "/lotes/lote-5/contrafrente.jpg",
      alt: "Lote 5 al anochecer: volumen de dos plantas entre pinos altos, galería iluminada y pileta en primer plano",
    } satisfies MediaSource,
  },
  {
    name: "Lote 6",
    slug: "lote-6",
    disponible: true,
    mapa: {
      src: "/lotes/lote-6/mapa-lote.jpg",
      alt: "Vista satelital con el Lote 6 marcado sobre la manzana",
    },
    planos: [
      { src: "/lotes/lote-6/plano-baja.png", titulo: "Planta baja" },
      { src: "/lotes/lote-6/plano-alta.png", titulo: "Planta alta" },
    ],
    superficies: { lote: "1.087 m²", cubierta: "323 m²", total: "345 m²" },
    dormitorios: "Suite + huésped en suite + 2",
    summary:
      "La más versátil de las tres: suma dormitorio de huéspedes en suite y un espacio flexible para estudio, biblioteca o sala de juegos. 323 m² cubiertos y pileta de 40 m².",
    image: {
      kind: "photo",
      src: "/lotes/lote-6/contrafrente.jpg",
      alt: "Lote 6: planta baja vidriada con comedor y estar a la vista, volumen superior en voladizo y pileta en L rodeada de deck",
    } satisfies MediaSource,
  },
  {
    name: "Lote 7",
    slug: "lote-7",
    disponible: true,
    mapa: {
      src: "/lotes/lote-7/mapa-lote.jpg",
      alt: "Vista satelital con el Lote 7 marcado sobre la manzana",
    },
    planos: [
      { src: "/lotes/lote-7/plano-baja.png", titulo: "Planta baja" },
      { src: "/lotes/lote-7/plano-alta.png", titulo: "Planta alta" },
    ],
    superficies: { lote: "1.524 m²", cubierta: "337 m²", total: "399 m²" },
    dormitorios: "Master suite + 2",
    summary:
      "La mayor de las tres, sobre un lote de 1.524 m². Carpinterías Golden Oak, puertas enchapadas en roble y climatización central en planta baja, además del piso radiante.",
    image: {
      kind: "photo",
      src: "/lotes/lote-7/contrafrente.jpg",
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
    title: "Casas inteligentes: cómo integrar tecnología sin romper el diseño",
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

/**
 * Bloque de cierre de la home. El formulario atiende a los dos públicos —el
 * que quiere comprar una de las casas y el que quiere un proyecto propio— así
 * que la bifurcación la hace el primer campo, no el título.
 */
export const contacto = {
  titleLines: ["Vení a ver", "el bosque"],
  intro:
    "Coordinamos un recorrido por Pinamar y recorremos las tres casas. Si lo tuyo es un proyecto propio, también empezamos por acá.",
  /** `PROYECTO_PROPIO` es el valor que preselecciona el botón de Estudio. */
  consultas: [
    ...projects.map((project) => ({
      value: project.name,
      label: project.name,
    })),
    { value: "Proyecto propio", label: "Quiero un proyecto propio" },
    { value: "Otra consulta", label: "Otra consulta" },
  ],
};

export const PROYECTO_PROPIO = "Proyecto propio";

export const footer = {
  email: "estudio.pinarrosa@gmail.com",
  instagram: "https://instagram.com/pinarrosagroup",
  whatsapp: "https://wa.me/5491138074412",
};
