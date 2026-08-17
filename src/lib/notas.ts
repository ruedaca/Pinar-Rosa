import type { Foto } from "@/lib/propiedades";

/**
 * Notas del blog. Todo lo que se afirma acá sale de la memoria descriptiva y
 * de la ficha de materiales de los tres proyectos, o de las fotos de obra.
 * No agregar datos que no estén en esas fuentes.
 */

export type Bloque = { titulo: string; parrafos: string[] };

export type Nota = {
  slug: string;
  categoria: string;
  titulo: string;
  bajada: string;
  fecha: string;
  fechaTexto: string;
  lectura: string;
  portada: Foto;
  bloques: Bloque[];
  /** Se intercala entre el segundo y el tercer bloque. */
  imagenInterior: Foto;
  relacionada: { nombre: string; slug: string; texto: string };
};

export const notas: Nota[] = [
  {
    slug: "materia-y-estructura",
    categoria: "Arquitectura",
    titulo: "Materia y estructura: por qué hormigón y vidrio",
    bajada:
      "Las tres casas se proyectaron con dos materiales y una sola idea: que la estructura sostenga y que el cerramiento decida cuánto abrir.",
    fecha: "2026-08-16",
    fechaTexto: "Agosto de 2026",
    lectura: "3 min",
    portada: {
      src: "/lotes/lote-7/obra/01.jpg",
      alt: "Frente en construcción con el hormigón visto y la textura del encofrado a la vista",
      // Foto vertical en un marco apaisado: sube el encuadre para que se lea
      // el volumen en voladizo y no una franja de pared.
      objectPosition: "center 32%",
    },
    bloques: [
      {
        titulo: "Dos materiales, ninguna decoración",
        parrafos: [
          "Cuando empezamos los tres proyectos nos pusimos una restricción: hormigón armado y vidrio. Nada más. No como capricho estético, sino como una manera de que cada decisión tuviera que justificarse sola, sin revestimientos que tapen.",
          "Es lo que llamamos materia y estructura. El material no cubre a la estructura: es la estructura. Lo que se ve del hormigón es exactamente lo que sostiene la casa.",
        ],
      },
      {
        titulo: "El hormigón libera la planta",
        parrafos: [
          "Al trabajar con hormigón armado, las cargas van a unos pocos apoyos y las plantas quedan libres. No hay muros que obliguen a que el living esté donde está. Los espacios pueden reorganizarse con el tiempo sin tocar la estructura.",
          "La textura no se disimula. Las tablas del encofrado quedan marcadas en la superficie, y esa huella —que en otra obra sería un defecto a corregir— acá es la terminación.",
        ],
      },
      {
        titulo: "El vidrio corre el límite",
        parrafos: [
          "El vidrio funciona como cerramiento horizontal: se abre o se cierra según la hora, la estación y quién esté en la casa. Cuando se abre del todo, el living y la galería pasan a ser un solo espacio semicubierto.",
          "Ahí ocurre lo que buscábamos desde el principio: la casa deja de tener un límite propio y el cierre lo termina poniendo el bosque.",
        ],
      },
    ],
    imagenInterior: {
      src: "/lotes/lote-7/pileta.jpg",
      alt: "Planta baja abierta al parque: los paños de vidrio corridos dejan el estar y la cocina a la vista",
    },
    relacionada: {
      nombre: "Lote 7",
      slug: "lote-7",
      texto:
        "La casa donde este criterio se ve más claro, con 337 m² cubiertos.",
    },
  },
  {
    slug: "construir-sin-talar",
    categoria: "Obra",
    titulo: "Construir sin talar: cómo se implanta una casa en el pinar",
    bajada:
      "En los tres lotes la casa se acomodó a los pinos que ya estaban. Entre el 70 y el 80% del terreno sigue siendo bosque.",
    fecha: "2026-08-16",
    fechaTexto: "Agosto de 2026",
    lectura: "3 min",
    portada: {
      src: "/obra/frente/01.jpg",
      alt: "Las tres casas en construcción entre los pinos, con el cartel de obra de Pinar Rosa",
    },
    bloques: [
      {
        titulo: "Primero el bosque",
        parrafos: [
          "Lo más rápido, en un lote de Pinamar, es despejarlo entero, construir cómodo y después plantar algo. Nosotros hicimos al revés: relevamos los pinos que ya estaban y el proyecto se acomodó a ellos.",
          "Por eso ninguna de las tres casas es un rectángulo apoyado en el medio del terreno. Las plantas se quiebran, se corren y se estiran para pasar entre los ejemplares que valía la pena conservar.",
        ],
      },
      {
        titulo: "Los números lo confirman",
        parrafos: [
          "El Lote 5 tiene 1.392 m² de terreno y 279 m² cubiertos. El Lote 6, 1.087 y 323. El Lote 7, 1.524 y 337. Aun en el más ocupado, la casa toma menos del 30% de la superficie.",
          "El resto no es jardín a estrenar: es el pinar que ya estaba, con árboles de treinta años que ninguna parquización nueva puede igualar.",
        ],
      },
      {
        titulo: "Lo que se gana adentro",
        parrafos: [
          "Conservar el bosque no es solo una decisión ambiental, es lo que hace que las casas se sientan como se sienten. Los ventanales dan contra troncos, no contra el terreno del vecino, y en verano la copa de los pinos hace la mitad del trabajo del aire acondicionado.",
          "Se ve en las fotos de obra: hay pinos parados a un metro de la estructura terminada. Estuvieron ahí durante toda la construcción, y ese fue el punto.",
        ],
      },
    ],
    imagenInterior: {
      src: "/lotes/lote-5/obra/02.jpg",
      alt: "Estructura de hormigón visto levantada entre los pinos existentes",
    },
    relacionada: {
      nombre: "Lote 5",
      slug: "lote-5",
      texto: "1.392 m² de terreno, de los que la casa ocupa apenas el 20%.",
    },
  },
];

export function buscarNota(slug: string) {
  return notas.find((nota) => nota.slug === slug);
}
