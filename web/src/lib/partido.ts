/**
 * Partidos de dos jugadores (1 vs 1 y por puntos): reportes y su resumen.
 * Cálculos puros, para servidor y cliente.
 */
import { AHORA } from "./ahora";
import { formatFechaHora } from "./format";

/** Marcador que reporta un jugador, siempre en el orden A – B del partido. */
export type ReportePartido = {
  partidoId: string;
  jugadorId: string;
  marcadorA: number;
  marcadorB: number;
  captura: string | null;
  creadoEn: string;
};

/** «2 – 1» */
export function marcador(a: number | null, b: number | null) {
  return `${a ?? 0} – ${b ?? 0}`;
}

/**
 * Qué falta en un partido sin registrar, según sus reportes (tarjetas de
 * O12 y PTS · O2). `siCoinciden` cierra la frase: «Confirma para avanzar.».
 */
export function resumenReportes({
  reportes,
  aId,
  bId,
  nombre,
  fechaHora,
  siCoinciden,
}: {
  reportes: ReportePartido[];
  aId: string;
  bId: string;
  nombre: (id: string) => string;
  fechaHora: string;
  siCoinciden: string;
}) {
  if (reportes.length >= 2) {
    const [x, y] = reportes;
    if (x.marcadorA === y.marcadorA && x.marcadorB === y.marcadorB) {
      return `Ambos reportaron ${marcador(x.marcadorA, x.marcadorB)}. ${siCoinciden}`;
    }
    return `Los reportes no coinciden (${marcador(x.marcadorA, x.marcadorB)} y ${marcador(y.marcadorA, y.marcadorB)}). Revisa la prueba y decide el resultado.`;
  }
  if (reportes.length === 1) {
    const r = reportes[0];
    const falta = r.jugadorId === aId ? bId : aId;
    return `${nombre(r.jugadorId)} reportó ${marcador(r.marcadorA, r.marcadorB)}. Falta el reporte de ${nombre(falta)}.`;
  }
  return `Programado ${formatFechaHora(fechaHora, AHORA)}. Aún no hay reportes.`;
}
