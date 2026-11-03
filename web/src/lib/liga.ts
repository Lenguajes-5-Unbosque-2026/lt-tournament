/**
 * Torneo por puntos de partidos 1 vs 1: Liga y Rondas suizas
 * (specs/bracket-por-puntos). Tipos y cálculos puros: los usan el servidor
 * y los componentes cliente.
 */
import type { Participante } from "./types";

export type EstadoPartido = "pendiente" | "reportado" | "en_disputa" | "finalizado" | "wo";

export type PartidoLiga = {
  id: string;
  ronda: number;
  orden: number;
  aId: string;
  bId: string;
  marcadorA: number | null;
  marcadorB: number | null;
  /** `null` en un partido finalizado = empate. */
  ganadorId: string | null;
  estado: EstadoPartido;
  fechaHora: string;
  /** Prueba oficial: archivo del mock o URL local recién subida. */
  prueba: string | null;
};

/** Marcador que reporta un jugador, siempre en el orden A – B del partido. */
export type ReporteLiga = {
  partidoId: string;
  jugadorId: string;
  marcadorA: number;
  marcadorB: number;
  captura: string | null;
  creadoEn: string;
};

export type PuntosLiga = { victoria: number; empate: number; derrota: number };

export type TorneoLiga = {
  id: string;
  nombre: string;
  enlace: string;
  formato: "liga" | "rondas_suizas";
  minutosPorPartido: number;
  totalRondas: number;
  puntos: PuntosLiga;
  premios: [number, number, number];
  jugadores: Participante[];
  partidos: PartidoLiga[];
  reportes: ReporteLiga[];
};

export type Resultado = "victoria" | "empate" | "derrota";

export type FilaLiga = {
  jugador: Participante;
  posicion: number;
  pj: number;
  g: number;
  e: number;
  p: number;
  /** Diferencia de marcador: segundo criterio de desempate. */
  dif: number;
  puntos: number;
};

const CERRADOS: EstadoPartido[] = ["finalizado", "wo"];

export function cerrado(p: PartidoLiga) {
  return CERRADOS.includes(p.estado);
}

export function rival(p: PartidoLiga, jugadorId: string) {
  return p.aId === jugadorId ? p.bId : p.aId;
}

/** Resultado del partido para un jugador, o `null` si todavía no se registra. */
export function resultadoPara(p: PartidoLiga, jugadorId: string): Resultado | null {
  if (!cerrado(p)) return null;
  if (!p.ganadorId) return "empate";
  return p.ganadorId === jugadorId ? "victoria" : "derrota";
}

export function puntosDe(r: Resultado, puntos: PuntosLiga) {
  return puntos[r];
}

/**
 * Tabla de posiciones: suma lo registrado. Desempate (spec, pregunta 10, sin
 * definir): más victorias, mejor diferencia de marcador y, al final, el nombre.
 */
export function tablaLiga(t: TorneoLiga): FilaLiga[] {
  const filas = t.jugadores.map((jugador) => {
    const fila = { jugador, posicion: 0, pj: 0, g: 0, e: 0, p: 0, dif: 0, puntos: 0 };
    for (const partido of t.partidos) {
      if (partido.aId !== jugador.id && partido.bId !== jugador.id) continue;
      const r = resultadoPara(partido, jugador.id);
      if (!r) continue;
      fila.pj++;
      fila[r === "victoria" ? "g" : r === "empate" ? "e" : "p"]++;
      fila.puntos += puntosDe(r, t.puntos);
      const propio = partido.aId === jugador.id ? partido.marcadorA : partido.marcadorB;
      const ajeno = partido.aId === jugador.id ? partido.marcadorB : partido.marcadorA;
      fila.dif += (propio ?? 0) - (ajeno ?? 0);
    }
    return fila;
  });
  filas.sort(
    (x, y) =>
      y.puntos - x.puntos ||
      y.g - x.g ||
      y.dif - x.dif ||
      x.jugador.nombre.localeCompare(y.jugador.nombre),
  );
  return filas.map((f, i) => ({ ...f, posicion: i + 1 }));
}

/** Última ronda con emparejamientos (0 si aún no hay). */
export function rondaActual(t: TorneoLiga) {
  return t.partidos.reduce((max, p) => Math.max(max, p.ronda), 0);
}

export function partidosDeRonda(t: TorneoLiga, ronda: number) {
  return t.partidos.filter((p) => p.ronda === ronda).sort((a, b) => a.orden - b.orden);
}

export function jugadorPorId(t: TorneoLiga, id: string | null) {
  return t.jugadores.find((j) => j.id === id);
}

/** «2 – 1» */
export function marcador(a: number | null, b: number | null) {
  return `${a ?? 0} – ${b ?? 0}`;
}

/**
 * Emparejamientos de una ronda: por posición en la tabla (o al azar con
 * `aleatorio`), juntando a cada jugador con el siguiente que no haya
 * enfrentado. Con número impar, el último descansa (PTS · O1b).
 */
export function emparejar(t: TorneoLiga, aleatorio = false): [string, string][] {
  const ya = new Set(
    t.partidos.flatMap((p) => [`${p.aId}|${p.bId}`, `${p.bId}|${p.aId}`]),
  );
  const orden = tablaLiga(t).map((f) => f.jugador.id);
  if (aleatorio) {
    for (let i = orden.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [orden[i], orden[j]] = [orden[j], orden[i]];
    }
  }
  const libres = [...orden];
  const pares: [string, string][] = [];
  while (libres.length > 1) {
    const a = libres.shift()!;
    // Si ya jugó con todos los que quedan, se repite el cruce con el primero.
    const i = Math.max(0, libres.findIndex((b) => !ya.has(`${a}|${b}`)));
    pares.push([a, libres.splice(i, 1)[0]]);
  }
  return pares;
}

/** Lo que exige el cierre (PTS · O4). */
export function estadoCierreLiga(t: TorneoLiga) {
  const todasLasRondas = rondaActual(t) >= t.totalRondas;
  const registrados = t.partidos.length > 0 && t.partidos.every(cerrado);
  return { registrados, tablaCompleta: todasLasRondas, listo: todasLasRondas && registrados };
}
