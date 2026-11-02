import { diasHasta } from "./format";
import type { Formato, Torneo } from "./types";

export type EtiquetaEstado = "abierto" | "en_curso" | "lleno" | "checkin";

/** «Lleno» no es un estado guardado: se muestra cuando inscritos = cupos. */
export function estaLleno(t: Torneo) {
  return t.inscritos >= t.cupos;
}

/** Estado que se pinta en la etiqueta (design/ui kit.md §6). */
export function etiquetaEstado(t: Torneo): EtiquetaEstado {
  if (t.estado === "en_curso") return "en_curso";
  if (t.estado === "checkin") return "checkin";
  return estaLleno(t) ? "lleno" : "abierto";
}

export function modalidad(t: Torneo) {
  return `${t.jugadoresPorEquipo} vs ${t.jugadoresPorEquipo}`;
}

export type FiltroFecha = "hoy" | "semana" | "mes";

export type Filtros = {
  juegos: string[];
  modalidades: number[];
  fecha: FiltroFecha | null;
  soloConCupos: boolean;
  cercaDeMi: boolean;
};

export const SIN_FILTROS: Filtros = {
  juegos: [],
  modalidades: [],
  fecha: null,
  soloConCupos: false,
  cercaDeMi: false,
};

/** Ciudad del jugador: lo que significa «Cerca de mí» sin geolocalización. */
export const CIUDAD_JUGADOR = "Bogotá";

function sinTildes(texto: string) {
  return texto.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export function coincideBusqueda(t: Torneo, busqueda: string) {
  const q = sinTildes(busqueda.trim());
  if (!q) return true;
  return [t.nombre, t.juego.nombre, t.organizador.alias].some((campo) =>
    sinTildes(campo).includes(q),
  );
}

export function aplicarFiltros(t: Torneo, f: Filtros, ahora: string) {
  if (f.juegos.length > 0 && !f.juegos.includes(t.juego.id)) return false;
  if (f.modalidades.length > 0 && !f.modalidades.includes(t.jugadoresPorEquipo)) return false;
  if (f.soloConCupos && estaLleno(t)) return false;
  if (f.cercaDeMi && t.ciudad !== CIUDAD_JUGADOR) return false;
  // Un torneo en curso está activo hoy y toda la semana: pasa cualquier filtro de fecha.
  if (f.fecha && t.estado !== "en_curso") {
    const dias = diasHasta(t.fechaInicio, ahora);
    const limite = { hoy: 0, semana: 7, mes: 30 }[f.fecha];
    if (dias < 0 || dias > limite) return false;
  }
  return true;
}

const FORMATOS: Record<Formato, string> = {
  eliminacion_directa: "Eliminación directa",
  doble_eliminacion: "Doble eliminación",
  liga: "Liga",
  rondas_suizas: "Rondas suizas",
  partidas_acumuladas: "Partidas acumuladas",
  clasificacion_lobbies: "Clasificación por lobbies",
  record_puntos: "Récord de puntos",
};

export function nombreFormato(formato: Formato) {
  return FORMATOS[formato];
}
