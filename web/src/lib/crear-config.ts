/** Configuración del asistente «Crear torneo» (specs/organizador-panel-y-creacion). */

export type TipoTorneo = "uno_vs_uno" | "battle_royale" | "por_puntos";

export type TipoOpcion = {
  value: TipoTorneo;
  titulo: string;
  descripcion: string;
  /** Aún sin pantalla de formato construida. */
  pronto?: boolean;
};

export const TIPOS: TipoOpcion[] = [
  { value: "uno_vs_uno", titulo: "1 vs 1", descripcion: "Duelo individual" },
  { value: "battle_royale", titulo: "Battle royale", descripcion: "Hasta 100 jugadores" },
  { value: "por_puntos", titulo: "Por puntos", descripcion: "Liga, rondas o récord" },
];

export type FormatoOpcion = {
  value: string;
  titulo: string;
  descripcion: string;
  recomendado?: boolean;
  /** Fuera del MVP: se ve pero no se puede elegir (spec, pregunta 1). */
  fueraDelMvp?: boolean;
};

export const FORMATOS_UNO_VS_UNO: FormatoOpcion[] = [
  {
    value: "eliminacion_directa",
    titulo: "Eliminación directa",
    descripcion: "Quien pierde queda fuera",
    recomendado: true,
  },
  {
    value: "doble_eliminacion",
    titulo: "Doble eliminación",
    descripcion: "Segunda oportunidad por llave inferior",
    fueraDelMvp: true,
  },
  {
    value: "fase_de_grupos",
    titulo: "Fase de grupos",
    descripcion: "Todos contra todos y luego llaves",
    fueraDelMvp: true,
  },
];

export const FORMATOS_BATTLE_ROYALE: FormatoOpcion[] = [
  {
    value: "partidas_acumuladas",
    titulo: "Partidas acumuladas",
    descripcion: "Los puntos se suman entre varias partidas",
    recomendado: true,
  },
  {
    value: "clasificacion_lobbies",
    titulo: "Clasificación por lobbies",
    descripcion: "Los mejores de cada lobby pasan a la final",
  },
  {
    value: "partida_unica",
    titulo: "Partida única",
    descripcion: "Una sola partida define al campeón",
  },
];

export const FORMATOS_POR_PUNTOS: FormatoOpcion[] = [
  {
    value: "liga",
    titulo: "Liga",
    descripcion: "Todos contra todos, gana quien sume más",
    recomendado: true,
  },
  {
    value: "rondas_suizas",
    titulo: "Rondas suizas",
    descripcion: "Emparejamientos entre puntajes similares",
  },
  {
    value: "record_puntos",
    titulo: "Récord de puntos",
    descripcion: "Gana el mejor puntaje en sus intentos",
  },
];

/** Atajos de cada campo numérico (chips); «Otro» abre la cantidad personalizada. */
export const ATAJOS = {
  cupos: [8, 16, 32, 64],
  minutosUnoVsUno: [15, 30, 45, 60],
  jugadoresBr: [25, 50, 75, 100],
  partidasBr: [1, 3, 5, 6],
  minutosBr: [15, 20, 25, 30],
  participantes: [8, 16, 32, 64],
  rondas: [3, 5, 7, 10],
  minutosPorPuntos: [10, 15, 20, 30],
} as const;

/**
 * Rangos de cantidad personalizada. Jugadores y cupos vienen de la spec
 * (1 vs 1: 2–128, Battle royale: 2–100); partidas y minutos no están
 * definidos y son provisionales.
 */
export const RANGOS = {
  cuposUnoVsUno: { min: 2, max: 128 },
  jugadoresBr: { min: 2, max: 100 },
  participantesPorPuntos: { min: 2, max: 128 },
  rondas: { min: 1, max: 20 },
  partidasBr: { min: 1, max: 20 },
  minutos: { min: 5, max: 180 },
} as const;

/**
 * Máximo de jugadores por torneo según el nivel del organizador. El Nivel 1
 * llega a 32 en los tres tipos (spec); la escala de niveles superiores
 * está pendiente (pregunta 13) y aquí es provisional.
 */
export function limitePorNivel(nivel: number) {
  if (nivel <= 1) return 32;
  if (nivel === 2) return 64;
  return 128;
}

export const MAX_NOMBRE = 60;
export const MAX_DESCRIPCION = 280;

/** Rango de los puntos por resultado (Victoria, Empate, Derrota); provisional. */
export const RANGO_PUNTOS_RESULTADO = { min: 0, max: 99 } as const;

export type Borrador = {
  portadaUrl: string | null;
  juegoId: string;
  nombre: string;
  descripcion: string;
  tipo: TipoTorneo;
  unoVsUno: { formato: string; cupos: number; minutos: number };
  battleRoyale: {
    formato: string;
    jugadores: number;
    partidas: number;
    minutos: number;
    puntosPorEliminacion: boolean;
  };
  porPuntos: {
    formato: string;
    participantes: number;
    rondas: number;
    minutos: number;
    puntosVictoria: number;
    puntosEmpate: number;
    puntosDerrota: number;
  };
  /** Paso 3: fecha y reglas. Fecha, hora y cierre vacíos hasta que se eligen. */
  fechaReglas: {
    /** AAAA-MM-DD */
    fecha: string;
    /** HH:mm */
    hora: string;
    /** AAAA-MM-DDTHH:mm */
    cierre: string;
    checkinObligatorio: boolean;
    capturaMarcador: boolean;
    desconexion: boolean;
    suplentes: boolean;
    premios: string;
  };
};

export const MAX_PREMIOS = 120;

/** Minutos antes del inicio en que abre el check-in (fijo en el MVP). */
export const CHECKIN_MINUTOS = 30;

export const BORRADOR_INICIAL: Borrador = {
  portadaUrl: null,
  juegoId: "fc25",
  nombre: "",
  descripcion: "",
  tipo: "uno_vs_uno",
  unoVsUno: { formato: "eliminacion_directa", cupos: 16, minutos: 30 },
  battleRoyale: {
    formato: "partidas_acumuladas",
    jugadores: 32,
    partidas: 3,
    minutos: 25,
    puntosPorEliminacion: true,
  },
  porPuntos: {
    formato: "liga",
    participantes: 16,
    rondas: 5,
    minutos: 20,
    puntosVictoria: 3,
    puntosEmpate: 1,
    puntosDerrota: 0,
  },
  fechaReglas: {
    fecha: "",
    hora: "",
    cierre: "",
    checkinObligatorio: true,
    capturaMarcador: true,
    desconexion: true,
    suplentes: false,
    premios: "",
  },
};

/** Juegos del selector del paso 1 y de la vista previa del paso 4. */
export const JUEGOS_SELECTOR = ["fc25", "valorant", "cs2", "lol", "fortnite", "rocket"];

const TODOS_LOS_FORMATOS = [
  ...FORMATOS_UNO_VS_UNO,
  ...FORMATOS_BATTLE_ROYALE,
  ...FORMATOS_POR_PUNTOS,
];

export function nombreFormatoBorrador(formato: string) {
  return TODOS_LOS_FORMATOS.find((f) => f.value === formato)?.titulo ?? formato;
}

/** Cupos, jugadores o participantes del torneo, según su tipo. */
export function cuposDelBorrador(b: Borrador) {
  if (b.tipo === "battle_royale") return b.battleRoyale.jugadores;
  if (b.tipo === "por_puntos") return b.porPuntos.participantes;
  return b.unoVsUno.cupos;
}

export function minutosDelBorrador(b: Borrador) {
  if (b.tipo === "battle_royale") return b.battleRoyale.minutos;
  if (b.tipo === "por_puntos") return b.porPuntos.minutos;
  return b.unoVsUno.minutos;
}

/** Instante de inicio (ISO, hora de Bogotá), o `null` si falta fecha u hora. */
export function inicioDelBorrador(b: Borrador) {
  const { fecha, hora } = b.fechaReglas;
  return fecha && hora ? `${fecha}T${hora}:00-05:00` : null;
}
