import type { MediaSource } from "@/components/ui/Media";

/**
 * Fuente de verdad de las tres casas. Superficies, programa y materiales salen
 * de las fichas oficiales (PDF de cada lote, julio 2026); las fotos, de las
 * carpetas de renders y de obra. No inventar datos: si falta uno, se pregunta.
 */

export type Foto = {
  src: string;
  alt: string;
  /** Reencuadre cuando el marco recorta la foto (CSS object-position). */
  objectPosition?: string;
};

export type Propiedad = {
  name: string;
  slug: string;
  direccion: string;
  disponible: boolean;
  resumen: string;
  descripcion: string[];
  /** Todo lo que va en la ficha técnica, en el orden en que se muestra. */
  superficies: {
    lote: string;
    cubierta: string;
    semicubierta: string;
    total: string;
    dormitorios: string;
    pileta: string;
  };
  programa: string[];
  materiales: { titulo: string; detalle: string }[];
  /** Siempre foto real: se usa además como imagen de Open Graph. */
  portada: Extract<MediaSource, { kind: "photo" }>;
  galeria: Foto[];
  obra: Foto[];
  planos: { src: string; titulo: string }[];
  mapa: Foto;
};

/** Los tres comparten memoria descriptiva: es un mismo criterio de proyecto. */
const DESCRIPCION = [
  "El proyecto se implanta en medio de los bosques de Pinamar. Respetando su entorno y aprovechando las visuales, la casa intenta preservar y hacer propia la atmósfera del lugar.",
  "Partimos de una problemática: materia y estructura. El hormigón armado define los límites espaciales y potencia las plantas, de modo que los espacios queden libres y flexibles. El vidrio funciona como cerramiento: se abre o se cierra según la necesidad, y al abrirse del todo genera espacios semicubiertos donde el límite es el bosque.",
];

const MATERIALES_COMUNES = [
  { titulo: "Pisos", detalle: "Porcelanatos de primera calidad." },
  {
    titulo: "Mesadas",
    detalle: "Tipo Silestone gris en baños, cocina y lavadero.",
  },
  {
    titulo: "Cocina",
    detalle:
      "Bajo mesadas y alacenas completas, frentes laqueados con detalles de madera y herrajes exclusivos. Anafe a gas, horno eléctrico y campana de acero con salida al exterior.",
  },
  {
    titulo: "Sanitarios",
    detalle:
      "Bacha de acero inoxidable Johnson, sanitarios FERRUM línea Bari o Marina y griferías Peirano con cierre cerámico. Accesorios completos.",
  },
  { titulo: "Agua caliente", detalle: "Caldera dual de tiro forzado a gas." },
  {
    titulo: "Entrega",
    detalle:
      "Con todos los placares y vestidores completos y el mobiliario de cocina a medida.",
  },
];

export const propiedades: Propiedad[] = [
  {
    name: "Lote 5",
    slug: "lote-5",
    direccion: "Florentino Ameghino 466, Pinamar",
    disponible: true,
    resumen:
      "279 m² cubiertos sobre un lote de 1.392 m². Master suite con vestidor e hidromasaje, dos dormitorios, estudio y una galería con parrilla que se abre a la pileta de 40 m².",
    descripcion: DESCRIPCION,
    superficies: {
      lote: "1.392 m²",
      cubierta: "279,25 m²",
      semicubierta: "15,32 m²",
      total: "334,57 m²",
      dormitorios: "3",
      pileta: "40 m²",
    },
    programa: [
      "Garage para 2 autos",
      "Living comedor",
      "Cocina integrada con barra desayunadora",
      "Galería con parrilla",
      "Lavadero",
      "Toilette de recepción y toilette de uso exterior",
      "Master suite con vestidor e hidromasaje",
      "Dos dormitorios y baño general",
      "Estudio",
      "Pileta de 40 m²",
    ],
    materiales: [
      ...MATERIALES_COMUNES.slice(0, 1),
      {
        titulo: "Aberturas",
        detalle: "Carpinterías de PVC con DVH, color negro.",
      },
      {
        titulo: "Puertas",
        detalle:
          "A medida de 2,70 m con contramarcos pintados, bisagras escondidas y cerraduras magnéticas.",
      },
      ...MATERIALES_COMUNES.slice(1, 5),
      {
        titulo: "Climatización",
        detalle: "Split en dormitorios y piso radiante.",
      },
      ...MATERIALES_COMUNES.slice(5),
    ],
    portada: {
      kind: "photo",
      src: "/lotes/lote-5/contrafrente.jpg",
      alt: "Lote 5 al anochecer: volumen de dos plantas entre pinos altos, galería iluminada y pileta en primer plano",
      // El marco recorta a lo ancho: se corre a la derecha, que es donde
      // sigue la casa, y no se acerca para que se aprecie entera.
      objectPosition: "62% bottom",
      zoom: 1.2,
    },
    galeria: [
      {
        src: "/lotes/lote-5/frente.jpg",
        alt: "Frente sobre la calle, con el garage y el acceso",
      },
      {
        src: "/lotes/lote-5/galeria.jpg",
        alt: "Galería con parrilla abierta al parque",
      },
      {
        src: "/lotes/lote-5/pileta.jpg",
        alt: "Pileta de 40 m² con el deck y el bosque de fondo",
      },
      {
        src: "/lotes/lote-5/estar.jpg",
        alt: "Living con ventanales de piso a techo al parque",
      },
      {
        src: "/lotes/lote-5/cocina-comedor.jpg",
        alt: "Cocina integrada al comedor, con barra desayunadora",
      },
      {
        src: "/lotes/lote-5/dormitorio.jpg",
        alt: "Dormitorio con vista al pinar",
      },
      { src: "/lotes/lote-5/escritorio.jpg", alt: "Estudio en planta alta" },
      {
        src: "/lotes/lote-5/bano-suite-bacha.jpg",
        alt: "Baño de la master suite, con doble bacha",
      },
      {
        src: "/lotes/lote-5/vestidor-1.jpg",
        alt: "Vestidor de la master suite",
      },
    ],
    obra: [
      { src: "/lotes/lote-5/obra/01.jpg", alt: "Avance de obra del Lote 5" },
      {
        src: "/lotes/lote-5/obra/02.jpg",
        alt: "Estructura de hormigón visto entre los pinos",
      },
      {
        src: "/lotes/lote-5/obra/03.jpg",
        alt: "Interior de la casa en construcción",
      },
      {
        src: "/lotes/lote-5/obra/04.jpg",
        alt: "Frente de la casa en construcción",
      },
      {
        src: "/lotes/lote-5/obra/05.jpg",
        alt: "Detalle del encofrado del hormigón",
      },
      {
        src: "/lotes/lote-5/obra/06.jpg",
        alt: "Vista del lote durante la obra",
      },
    ],
    planos: [
      { src: "/lotes/lote-5/plano-baja.png", titulo: "Planta baja" },
      { src: "/lotes/lote-5/plano-alta.png", titulo: "Planta alta" },
    ],
    mapa: {
      src: "/lotes/lote-5/mapa-lote.jpg",
      alt: "Vista satelital con el Lote 5 marcado sobre la manzana",
    },
  },
  {
    name: "Lote 6",
    slug: "lote-6",
    direccion: "Florentino Ameghino 466, Pinamar",
    disponible: true,
    resumen:
      "La más versátil de las tres: suma dormitorio de huéspedes en suite y un espacio flexible para estudio, biblioteca o sala de juegos. 323 m² cubiertos y pileta de 40 m².",
    descripcion: DESCRIPCION,
    superficies: {
      lote: "1.087 m²",
      cubierta: "322,67 m²",
      semicubierta: "22,19 m²",
      total: "344,86 m²",
      dormitorios: "4",
      pileta: "40 m²",
    },
    programa: [
      "Garage para 2 autos",
      "Living, comedor y cocina integrada con barra desayunadora",
      "Galería con parrilla",
      "Lavadero",
      "Toilette de recepción y toilette de uso exterior",
      "Dormitorio de huéspedes con baño en suite",
      "Habitación en suite con vestidor",
      "Dos dormitorios y baño general",
      "Espacio flexible para estudio, biblioteca y sala de juegos",
      "Pileta de 40 m²",
    ],
    materiales: [
      ...MATERIALES_COMUNES.slice(0, 1),
      {
        titulo: "Aberturas",
        detalle: "Carpinterías de PVC con DVH, color negro.",
      },
      {
        titulo: "Puertas",
        detalle:
          "A medida de 2,70 m filo muro, con bisagras escondidas y cerraduras magnéticas.",
      },
      ...MATERIALES_COMUNES.slice(1, 5),
      {
        titulo: "Climatización",
        detalle: "Split en dormitorios y piso radiante.",
      },
      ...MATERIALES_COMUNES.slice(5),
    ],
    portada: {
      kind: "photo",
      src: "/lotes/lote-6/contrafrente.jpg",
      alt: "Lote 6: planta baja vidriada con comedor y estar a la vista, volumen superior en voladizo y pileta en L rodeada de deck",
      // Se corre a la izquierda: a la derecha de la foto solo queda bosque.
      objectPosition: "42% bottom",
      zoom: 1.2,
    },
    galeria: [
      { src: "/lotes/lote-6/frente.jpg", alt: "Frente sobre la calle" },
      { src: "/lotes/lote-6/acceso.jpg", alt: "Acceso principal a la casa" },
      { src: "/lotes/lote-6/pileta.jpg", alt: "Pileta de 40 m² sobre el deck" },
      { src: "/lotes/lote-6/parrilla-1.jpg", alt: "Galería con parrilla" },
      { src: "/lotes/lote-6/estar.jpg", alt: "Living abierto al parque" },
      {
        src: "/lotes/lote-6/cocina-comedor.jpg",
        alt: "Cocina integrada al comedor",
      },
      {
        src: "/lotes/lote-6/suit.jpg",
        alt: "Habitación en suite con vestidor",
      },
      {
        src: "/lotes/lote-6/escritorio.jpg",
        alt: "Espacio flexible para estudio o biblioteca",
      },
      { src: "/lotes/lote-6/bano-suit-bacha.jpg", alt: "Baño en suite" },
    ],
    obra: [
      { src: "/lotes/lote-6/obra/01.jpg", alt: "Avance de obra del Lote 6" },
      { src: "/lotes/lote-6/obra/02.jpg", alt: "Estructura de hormigón visto" },
      { src: "/lotes/lote-6/obra/03.jpg", alt: "Frente en construcción" },
      {
        src: "/lotes/lote-6/obra/04.jpg",
        alt: "Detalle del hormigón encofrado",
      },
      {
        src: "/lotes/lote-6/obra/05.jpg",
        alt: "Vista del lote durante la obra",
      },
      { src: "/lotes/lote-6/obra/06.jpg", alt: "Terreno y entorno de la obra" },
    ],
    planos: [
      { src: "/lotes/lote-6/plano-baja.png", titulo: "Planta baja" },
      { src: "/lotes/lote-6/plano-alta.png", titulo: "Planta alta" },
    ],
    mapa: {
      src: "/lotes/lote-6/mapa-lote.jpg",
      alt: "Vista satelital con el Lote 6 marcado sobre la manzana",
    },
  },
  {
    name: "Lote 7",
    slug: "lote-7",
    direccion: "Florentino Ameghino 466, Pinamar",
    disponible: true,
    resumen:
      "La mayor de las tres, sobre un lote de 1.524 m². Carpinterías Golden Oak, puertas enchapadas en roble y climatización central en planta baja, además del piso radiante.",
    descripcion: DESCRIPCION,
    superficies: {
      lote: "1.524 m²",
      cubierta: "336,51 m²",
      semicubierta: "24,01 m²",
      total: "399,22 m²",
      dormitorios: "3",
      pileta: "38,70 m²",
    },
    programa: [
      "Garage para 2 autos",
      "Living comedor",
      "Cocina integrada con barra desayunadora",
      "Galería con parrilla",
      "Lavadero",
      "Toilette de recepción y toilette de uso exterior",
      "Master suite con vestidor e hidromasaje",
      "Dos dormitorios y dos baños",
      "Estudio",
      "Pileta de 38,70 m²",
    ],
    materiales: [
      ...MATERIALES_COMUNES.slice(0, 1),
      {
        titulo: "Aberturas",
        detalle: "Carpinterías de PVC con DVH, color Golden Oak.",
      },
      {
        titulo: "Puertas",
        detalle:
          "A medida de 2,70 m enchapadas en roble, con bisagras escondidas y cerraduras magnéticas.",
      },
      ...MATERIALES_COMUNES.slice(1, 5),
      {
        titulo: "Climatización",
        detalle:
          "Sistema central en planta baja, split en dormitorios y piso radiante.",
      },
      ...MATERIALES_COMUNES.slice(5),
    ],
    portada: {
      kind: "photo",
      src: "/lotes/lote-7/contrafrente.jpg",
      alt: "Lote 7: frente longitudinal en hormigón con carpinterías de madera, terraza verde y pileta larga",
      // La casa ocupa la mitad izquierda de la foto.
      objectPosition: "22% bottom",
      zoom: 1.18,
    },
    galeria: [
      {
        src: "/lotes/lote-7/frente.jpg",
        alt: "Frente sobre la calle, con el acceso en madera",
      },
      { src: "/lotes/lote-7/patio.jpg", alt: "Patio interior" },
      { src: "/lotes/lote-7/pileta.jpg", alt: "Pileta de 38,70 m²" },
      { src: "/lotes/lote-7/parrilla-1.jpg", alt: "Galería con parrilla" },
      { src: "/lotes/lote-7/sala-de-estar.jpg", alt: "Sala de estar" },
      { src: "/lotes/lote-7/cocina.jpg", alt: "Cocina con isla" },
      {
        src: "/lotes/lote-7/dormitorio-suit.jpg",
        alt: "Dormitorio en master suite",
      },
      { src: "/lotes/lote-7/escritorio.jpg", alt: "Estudio" },
      {
        src: "/lotes/lote-7/bano-suit-bachas.jpg",
        alt: "Baño de la master suite, con doble bacha sobre mármol y ducha",
      },
    ],
    obra: [
      {
        src: "/lotes/lote-7/obra/01.jpg",
        alt: "Frente del Lote 7 en construcción, con el hormigón a la vista",
      },
      { src: "/lotes/lote-7/obra/02.jpg", alt: "Interior en construcción" },
      { src: "/lotes/lote-7/obra/03.jpg", alt: "Detalle del encofrado" },
      {
        src: "/lotes/lote-7/obra/04.jpg",
        alt: "Vista del terreno durante la obra",
      },
      { src: "/lotes/lote-7/obra/05.jpg", alt: "Carpinterías colocadas" },
      {
        src: "/lotes/lote-7/obra/06.jpg",
        alt: "Contrafrente en construcción",
      },
    ],
    planos: [
      { src: "/lotes/lote-7/plano-baja.png", titulo: "Planta baja" },
      { src: "/lotes/lote-7/plano-alta.png", titulo: "Planta alta" },
    ],
    mapa: {
      src: "/lotes/lote-7/mapa-lote.jpg",
      alt: "Vista satelital con el Lote 7 marcado sobre la manzana",
    },
  },
];

export function buscarPropiedad(slug: string) {
  return propiedades.find((propiedad) => propiedad.slug === slug);
}
