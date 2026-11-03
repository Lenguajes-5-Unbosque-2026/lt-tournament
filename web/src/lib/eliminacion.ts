/**
 * Eliminación directa 1 vs 1 (specs/1v1-bracket). El cuadro completo se
 * calcula: la primera ronda sale de los seeds y cada ronda siguiente de los
 * ganadores de la anterior; los partidos guardados (CSV o registrados por el
 * organizador) mandan sobre lo calculado. Cálculos puros, para servidor y
 * cliente.
 */
import type { ReportePartido } from "./partido";
import type { Participante } from "./types";

export type JugadorSeed = Participante & { seed: number };

export type EstadoLlave = "pendiente" | "reportado" | "en_disputa" | "finalizado" | "wo";

/** Partido guardado: `partidos.csv` o lo que registra el organizador. */
export type PartidoGuardado = {
  id: string;
  ronda: number;
  orden: number;
  tercerPuesto: boolean;
  aId: string;
  bId: string;
  marcadorA: number | null;
  marcadorB: number | null;
  ganadorId: string | null;
  estado: EstadoLlave;
  fechaHora: string;
  prueba: string | null;
};

/** Un partido del cuadro; `null` en un lado = «Por definir» (o pase directo en la 1.ª ronda). */
export type Llave = {
  id: string;
  ronda: number;
  orden: number;
  tercerPuesto: boolean;
  aId: string | null;
  bId: string | null;
  marcadorA: number | null;
  marcadorB: number | null;
  ganadorId: string | null;
  estado: EstadoLlave;
  fechaHora: string;
  prueba: string | null;
  /** Ya tiene ganador (registrado, W.O. o pase directo por falta de rival). */
  cerrada: boolean;
  /** Pase directo: en la 1.ª ronda no hubo rival. */
  pase: boolean;
};

export type RondaCuadro = { numero: number; nombre: string; llaves: Llave[] };

export type TorneoEliminacion = {
  id: string;
  nombre: string;
  enlace: string;
  fechaInicio: string;
  estado: string;
  premios: [number, number, number];
  jugadores: JugadorSeed[];
  partidos: PartidoGuardado[];
  reportes: ReportePartido[];
  /** Ronda que se está jugando; «Avanzar a …» la sube. */
  rondaActiva: number;
};

const NOMBRES = ["Final", "Semis", "Cuartos", "Octavos", "Dieciseisavos"];

export function totalRondas(t: TorneoEliminacion) {
  return Math.max(1, Math.ceil(Math.log2(Math.max(2, t.jugadores.length))));
}

export function nombreRonda(ronda: number, total: number) {
  return NOMBRES[total - ronda] ?? `Ronda ${ronda}`;
}

/** Orden de los seeds en la 1.ª ronda: 1 vs N, y los mejores no se cruzan antes de tiempo. */
function ordenDeSeeds(tamano: number) {
  let orden = [1, 2];
  while (orden.length < tamano) {
    const n = orden.length * 2;
    orden = orden.flatMap((s) => [s, n + 1 - s]);
  }
  return orden;
}

const CERRADOS: EstadoLlave[] = ["finalizado", "wo"];

function perdedor(l: Llave) {
  if (!l.cerrada || l.pase || !l.ganadorId) return null;
  return l.ganadorId === l.aId ? l.bId : l.aId;
}

/** El cuadro completo, ronda por ronda; la última ronda incluye el partido por el 3.er puesto. */
export function cuadro(t: TorneoEliminacion): RondaCuadro[] {
  const total = totalRondas(t);
  const porSeed = new Map(t.jugadores.map((j) => [j.seed, j.id]));
  const guardado = (ronda: number, orden: number, tercerPuesto: boolean) =>
    t.partidos.find((p) => p.ronda === ronda && p.orden === orden && p.tercerPuesto === tercerPuesto);

  function llave(
    ronda: number,
    orden: number,
    tercerPuesto: boolean,
    aId: string | null,
    bId: string | null,
  ): Llave {
    const g = guardado(ronda, orden, tercerPuesto);
    const a = g?.aId ?? aId;
    const b = g?.bId ?? bId;
    // Pase directo: en la 1.ª ronda, un lado sin jugador porque no hubo seed.
    const pase = !g && ronda === 1 && !tercerPuesto && (a === null) !== (b === null);
    const cerrada = pase || (!!g && CERRADOS.includes(g.estado));
    return {
      id: g?.id ?? `${t.id}_r${ronda}_${tercerPuesto ? "tercer" : orden}`,
      ronda,
      orden,
      tercerPuesto,
      aId: a,
      bId: b,
      marcadorA: g?.marcadorA ?? null,
      marcadorB: g?.marcadorB ?? null,
      ganadorId: pase ? (a ?? b) : (g?.ganadorId ?? null),
      estado: pase ? "wo" : (g?.estado ?? "pendiente"),
      fechaHora: g?.fechaHora ?? t.fechaInicio,
      prueba: g?.prueba ?? null,
      cerrada,
      pase,
    };
  }

  const rondas: RondaCuadro[] = [];
  const seeds = ordenDeSeeds(2 ** total);
  for (let r = 1; r <= total; r++) {
    const llaves: Llave[] = [];
    const cantidad = 2 ** (total - r);
    for (let o = 1; o <= cantidad; o++) {
      if (r === 1) {
        llaves.push(
          llave(r, o, false, porSeed.get(seeds[2 * o - 2]) ?? null, porSeed.get(seeds[2 * o - 1]) ?? null),
        );
      } else {
        const previa = rondas[r - 2].llaves;
        const x = previa[2 * o - 2];
        const y = previa[2 * o - 1];
        llaves.push(llave(r, o, false, x.cerrada ? x.ganadorId : null, y.cerrada ? y.ganadorId : null));
      }
    }
    // El 3.er puesto se juega con la final, entre los perdedores de semis.
    if (r === total && total >= 2) {
      const semis = rondas[r - 2].llaves;
      llaves.push(llave(r, 1, true, perdedor(semis[0]), perdedor(semis[1])));
    }
    rondas.push({ numero: r, nombre: nombreRonda(r, total), llaves });
  }
  return rondas;
}

export function jugadorPorId(t: TorneoEliminacion, id: string | null) {
  return t.jugadores.find((j) => j.id === id);
}

/** Se puede jugar: tiene a los dos jugadores y aún no tiene ganador. */
export function porJugar(l: Llave) {
  return !!l.aId && !!l.bId && !l.cerrada;
}

/** Podio: campeón, finalista y ganador del partido por el 3.er puesto. */
export function podio(t: TorneoEliminacion) {
  const ultima = cuadro(t).at(-1)!.llaves;
  const final = ultima.find((l) => !l.tercerPuesto)!;
  const tercer = ultima.find((l) => l.tercerPuesto);
  const ids = final.cerrada
    ? [final.ganadorId, final.ganadorId === final.aId ? final.bId : final.aId, tercer?.cerrada ? tercer.ganadorId : null]
    : [];
  return ids.flatMap((id) => {
    const j = jugadorPorId(t, id ?? null);
    return j ? [j] : [];
  });
}

/** Lo que exige el cierre (O15). */
export function estadoCierreEliminacion(t: TorneoEliminacion) {
  const rondas = cuadro(t);
  const llaves = rondas.flatMap((r) => r.llaves);
  const registrados = llaves.every((l) => l.cerrada);
  const completo = t.rondaActiva >= rondas.length && registrados;
  return { registrados, completo, listo: completo, partidos: llaves.filter((l) => !l.pase).length };
}
