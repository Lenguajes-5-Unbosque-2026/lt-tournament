/** Tipos de las pantallas de competir (specs/jugador-competir): Sala, Chat y Resultado final. */
import type { Participante } from "./types";

/** Primer partido del jugador en el cuadro (J14, «Tu primer partido»). */
export type PrimerPartido = {
  yo: Participante & { seed: number };
  rival: Participante & { seed: number };
  /** «Octavos» */
  ronda: string;
  /** Hora del partido (ISO). */
  fechaHora: string;
};

export type Sala = {
  torneoId: string;
  torneoNombre: string;
  fechaInicio: string;
  /** El torneo exige check-in. */
  checkinObligatorio: boolean;
  /** Minutos antes del inicio en que cierra el check-in. */
  minutosAntes: number;
  /** Hora en que el jugador hizo su check-in, o `null`. */
  checkinEn: string | null;
  reglas: string[];
  minutosPorPartida: number | null;
  /** `null` si el bracket aún no se publicó o el torneo no es 1 vs 1. */
  primerPartido: PrimerPartido | null;
};

export type MensajeChat = {
  id: string;
  autor: Participante & { esOrganizador: boolean };
  contenido: string;
  creadoEn: string;
  esPropio: boolean;
};

export type Chat = {
  /** Quien escribe: el jugador de la sesión. */
  yo: Participante;
  torneoId: string;
  torneoNombre: string;
  inscritos: number;
  /** Anuncio fijado por el organizador, si hay. */
  anuncio: { organizador: string; contenido: string } | null;
  mensajes: MensajeChat[];
};

export type PuestoFinal = Participante & { puesto: number; puntos: number };

export type ResultadoFinal = {
  torneoId: string;
  torneoNombre: string;
  juegoNombre: string;
  /** 1.º, 2.º y 3.º. */
  podio: PuestoFinal[];
  /** Puesto, puntos de ranking y victorias del jugador. */
  puesto: number;
  puntos: number;
  victorias: number;
  /** Puestos que subió en el ranking del juego (negativo si bajó). */
  puestosSubidos: number;
};
