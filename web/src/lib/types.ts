/** Modelo de torneo tal como lo usan las pantallas (data/mock/torneos.csv + joins). */
export type EstadoTorneo =
  | "borrador"
  | "abierto"
  | "checkin"
  | "en_curso"
  | "finalizado"
  | "cancelado";

export type Juego = {
  id: string;
  nombre: string;
  color1: string;
  color2: string;
  abreviatura: string;
  imagen: string;
};

export type Organizador = {
  id: string;
  alias: string;
  verificado: boolean;
  imagen: string;
};

export type Torneo = {
  id: string;
  nombre: string;
  juego: Juego;
  organizador: Organizador;
  imagen: string;
  /** Jugadores por equipo; 1 = individual (1 vs 1). */
  jugadoresPorEquipo: number;
  cupos: number;
  /** Confirmadas + pendientes (design: «24/32»). */
  inscritos: number;
  fechaInicio: string;
  estado: EstadoTorneo;
  ciudad: string;
};

export type Jugador = {
  id: string;
  nombreUsuario: string;
  nivel: number;
  puntosRanking: number;
  color1: string;
  color2: string;
  imagen: string;
};

/** Lo que muestra la tarjeta «Tu próximo torneo» de Inicio. */
export type ProximoTorneo = {
  torneo: Torneo;
  /** Segundos que faltan para el inicio, al momento de calcularlo. */
  faltanSegundos: number;
  checkinAbierto: boolean;
};

export type Formato =
  | "eliminacion_directa"
  | "doble_eliminacion"
  | "liga"
  | "rondas_suizas"
  | "partidas_acumuladas"
  | "clasificacion_lobbies"
  | "record_puntos";

/** Un torneo con todo lo que muestra el Detalle (J09 y J12). */
export type TorneoDetalle = Torneo & {
  formato: Formato;
  cierreInscripciones: string;
  /** Texto del premio del 1.er puesto («Trofeo + 300 pts»); vacío si no hay. */
  premio: string;
  puntos: [number, number, number];
  reglas: string[];
  /** Torneos que ha organizado el organizador (incluye este). */
  torneosDelOrganizador: number;
  /** Jugadores en lista de espera. */
  enEspera: number;
};

export type EstadoInscripcion = "confirmada" | "pendiente" | "espera" | "cancelada";

/** Inscripción del jugador actual en un torneo. */
export type InscripcionPropia = {
  estado: EstadoInscripcion;
  seed: number | null;
  posicionEspera: number | null;
};
