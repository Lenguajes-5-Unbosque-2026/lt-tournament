/**
 * Battle royale de partidas acumuladas (specs/battle-royale-bracket).
 * Tipos y cálculos puros: los usan el servidor y los componentes cliente.
 */

import type { Participante } from "./types";

export type JugadorBR = Participante;

export type EstadoPartida = "pendiente" | "en_curso" | "finalizada";

export type PartidaBR = {
  id: string;
  numero: number;
  estado: EstadoPartida;
  /** ISO; vacío si la partida no ha empezado. */
  inicio: string;
  vivos: number | null;
  ganadorId: string | null;
  /** Prueba oficial: nombre del archivo en /mock o URL local recién subida. */
  prueba: string | null;
};

/** `confirmado` = registrado por el organizador; `reportado` = solo lo reportó el jugador. */
export type ResultadoBR = {
  partidaId: string;
  jugadorId: string;
  puesto: number;
  kills: number;
  puntos: number;
  estado: "confirmado" | "reportado";
  captura: string | null;
};

export type TorneoBR = {
  id: string;
  nombre: string;
  enlace: string;
  /** Hoy solo hay pantallas de «partidas_acumuladas» (lobby único). */
  formato: string;
  minutosPorPartida: number;
  puntosPorKill: number;
  /** Puntos de ranking del 1.°, 2.° y 3.° (configuración del torneo). */
  premios: [number, number, number];
  jugadores: JugadorBR[];
  partidas: PartidaBR[];
  resultados: ResultadoBR[];
};

export type FilaGeneral = {
  jugador: JugadorBR;
  posicion: number;
  kills: number;
  /** Mejor puesto entre las partidas confirmadas (spec, pregunta 17). */
  mejor: number | null;
  puntos: number;
};

/**
 * Puntos por posición. La spec no tiene la fórmula (pregunta 4); esta tabla
 * es la que cuadra con data/mock/resultados_battle_royale.csv
 * (puntos = posición + kills): 1.° 12, 2.° 9, 3.° 7… 9.° 1 y del 10.° en adelante 0.
 */
const PUNTOS_POR_PUESTO = [12, 9, 7, 6, 5, 4, 3, 2, 1];

export function puntosPartida(puesto: number, kills: number, puntosPorKill: number) {
  return (PUNTOS_POR_PUESTO[puesto - 1] ?? 0) + kills * puntosPorKill;
}

export function jugadorPorId(t: TorneoBR, id: string | null) {
  return t.jugadores.find((j) => j.id === id);
}

export function partidaEnCurso(t: TorneoBR) {
  return t.partidas.find((p) => p.estado === "en_curso");
}

export function confirmados(t: TorneoBR, partidaId?: string) {
  return t.resultados.filter(
    (r) => r.estado === "confirmado" && (!partidaId || r.partidaId === partidaId),
  );
}

/**
 * Tabla general: suma lo confirmado de todas las partidas. Desempate (no
 * definido en la spec): más kills, mejor puesto y, al final, el nombre.
 */
export function tablaGeneral(t: TorneoBR): FilaGeneral[] {
  const filas = t.jugadores.map((jugador) => {
    const propios = confirmados(t).filter((r) => r.jugadorId === jugador.id);
    return {
      jugador,
      posicion: 0,
      kills: propios.reduce((s, r) => s + r.kills, 0),
      mejor: propios.length ? Math.min(...propios.map((r) => r.puesto)) : null,
      puntos: propios.reduce((s, r) => s + r.puntos, 0),
    };
  });
  filas.sort(
    (a, b) =>
      b.puntos - a.puntos ||
      b.kills - a.kills ||
      (a.mejor ?? Infinity) - (b.mejor ?? Infinity) ||
      a.jugador.nombre.localeCompare(b.jugador.nombre),
  );
  return filas.map((f, i) => ({ ...f, posicion: i + 1 }));
}

/** «Lobby único» en partidas acumuladas: juegan todos a la vez. */
export function nombreLobby(t: TorneoBR) {
  return t.formato === "partidas_acumuladas" ? "Lobby único" : "Lobbies";
}

/** Segundos que le quedan a la partida en `ahora` (0 si ya se cumplió el tiempo). */
export function segundosRestantes(p: PartidaBR, minutos: number, ahora: string) {
  if (!p.inicio) return minutos * 60;
  const fin = new Date(p.inicio).getTime() + minutos * 60_000;
  return Math.max(0, Math.round((fin - new Date(ahora).getTime()) / 1000));
}

/** Lo que exige el cierre (BR · O4). */
export function estadoCierre(t: TorneoBR) {
  const registradas = t.partidas.every((p) => p.estado === "finalizada");
  const completa = t.partidas.every(
    (p) => confirmados(t, p.id).length === t.jugadores.length,
  );
  return { registradas, completa, listo: registradas && completa };
}

/** Ruta pública de una imagen del mock, o la URL local tal cual. */
export function rutaImagen(imagen: string) {
  return /^(blob:|https?:|\/)/.test(imagen) ? imagen : `/mock/${imagen}`;
}
