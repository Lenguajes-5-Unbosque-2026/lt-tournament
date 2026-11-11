/** Tipos de la gestión del torneo del organizador (specs/organizador-gestion-del-torneo). */
import type { Participante } from "./types";

/** Pasos del estado del torneo en el Resumen (O07). */
export const ETAPAS = [
  "Publicado",
  "Inscripciones abiertas",
  "Check-in",
  "En curso",
  "Finalizado",
] as const;

/** Índice de la etapa en que está un torneo según su estado, o `null` si no aplica (borrador, cancelado). */
export function etapaActual(estado: string): number | null {
  switch (estado) {
    case "abierto":
      return 1;
    case "checkin":
      return 2;
    case "en_curso":
      return 3;
    case "finalizado":
      return 4;
    default:
      return null;
  }
}

export type ResumenGestion = {
  torneoId: string;
  nombre: string;
  estado: string;
  fechaInicio: string;
  cupos: number;
  inscritos: number;
  checkins: number;
  enEspera: number;
  /** Minutos antes del inicio en que se recomienda abrir el check-in. */
  minutosAntes: number;
  /** El torneo tiene pantalla de bracket. */
  conBracket: boolean;
};

export type EstadoInscrito = "confirmada" | "pendiente" | "espera";

export type Inscrito = Participante & {
  estado: EstadoInscrito;
  /** Cuándo se inscribió (ISO). */
  inscritoEn: string;
  /** Hizo check-in. */
  checkin: boolean;
  /** Hora del check-in (ISO), si lo hizo. */
  checkinEn: string | null;
};

export type ListaInscritos = {
  torneoId: string;
  torneoNombre: string;
  cupos: number;
  inscritos: Inscrito[];
};
