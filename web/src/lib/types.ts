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
