/** Tipos de las pantallas de progreso y cuenta (specs/jugador-progreso-y-cuenta). */

/** Un torneo terminado en el historial (J19) y en «Últimos torneos» (J18). */
export type ItemHistorial = {
  torneoId: string;
  nombre: string;
  juegoId: string;
  juegoNombre: string;
  /** Jugadores que se inscribieron (confirmados). */
  jugadores: number;
  fechaInicio: string;
  puesto: number;
  puntos: number;
  victorias: number;
  partidos: number;
};

export type Historial = {
  items: ItemHistorial[];
  /** Juegos en los que ha jugado, para los chips. */
  juegos: { id: string; nombre: string }[];
};

export type TipoNotificacion =
  | "checkin"
  | "resultado"
  | "reto"
  | "inscripcion"
  | "recomendado"
  | "ranking"
  | "disputa"
  | "wo"
  | "espera"
  | "cancelado"
  | "bienvenida";

export type Notificacion = {
  id: string;
  tipo: TipoNotificacion;
  titulo: string;
  texto: string;
  torneoId: string | null;
  leida: boolean;
  creadoEn: string;
};

/** Una fila de «Rankings · Amigos» (J21): el jugador y sus amigos, por puntos. */
export type Amigo = {
  id: string;
  nombre: string;
  imagen: string;
  color1: string;
  color2: string;
  nivel: number;
  puntos: number;
  esYo: boolean;
};

/** Un logro del perfil (J18). */
export type Logro = {
  id: string;
  titulo: string;
  detalle: string;
};
