/** Tipos de las pantallas de cierre, datos y perfil del organizador (specs/organizador-cierre-datos-y-perfil). */
import type { Torneo } from "./types";

/** Torneos que cuentan para subir de nivel por cada nivel (provisional: la spec no lo define). */
export const TORNEOS_POR_NIVEL = 10;

export type PerfilOrganizador = {
  alias: string;
  imagen: string;
  color1: string;
  color2: string;
  verificado: boolean;
  nivel: number;
  /** Torneos organizados (sin borradores ni cancelados). */
  torneos: number;
  /** Jugadores que reunió en todos sus torneos. */
  jugadores: number;
  valoracion: number;
  /** Torneos que le faltan para el siguiente nivel. */
  faltan: number;
  /** Avance hacia el siguiente nivel, de 0 a 1. */
  progreso: number;
  organizados: Torneo[];
};

export type EstadisticasTorneo = {
  torneoId: string;
  torneoNombre: string;
  inscritos: number;
  /** Porcentaje de inscritos que hizo check-in. */
  asistencia: number;
  /** Minutos entre el inicio y el último partido; `null` sin partidos. */
  duracionMin: number | null;
  valoracion: number;
  /** Inscripciones por día, en orden cronológico. */
  porDia: { dia: string; inscripciones: number }[];
  partidos: number;
  conDisputa: number;
  /** Minutos que tardan los jugadores en reportar; `null` sin reportes. */
  reporteMedioMin: number | null;
};

/** 160 → «2 h 40»; 45 → «45 min». */
export function formatDuracion(minutos: number) {
  const h = Math.floor(minutos / 60);
  const m = Math.round(minutos % 60);
  return h === 0 ? `${m} min` : `${h} h ${String(m).padStart(2, "0")}`;
}
