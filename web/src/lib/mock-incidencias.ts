import "server-only";
import type { PartidoIncidencia } from "./incidencia";
import { leer } from "./mock";
import type { Participante } from "./types";

/**
 * Un partido de dos jugadores con todo lo que necesitan las pantallas de
 * incidencias: sus jugadores, los reportes, el check-in de cada uno y la
 * ronda siguiente. Disputa de ejemplo: `par_028`; W.O. de ejemplo: `par_003`.
 */
export function getPartidoIncidencia(partidoId: string): PartidoIncidencia | undefined {
  const partidos = leer("partidos");
  const p = partidos.find((x) => x.id === partidoId);
  if (!p) return undefined;

  const torneo = leer("torneos").find((t) => t.id === p.torneo_id);
  if (!torneo) return undefined;

  const perfiles = new Map(leer("perfiles_jugador").map((j) => [j.id, j]));
  const participante = (id: string): Participante | undefined => {
    const j = perfiles.get(id);
    return j && { id, nombre: j.nombre_usuario, imagen: j.imagen, color1: j.color_1, color2: j.color_2 };
  };
  const a = participante(p.jugador_a_id);
  const b = participante(p.jugador_b_id);
  if (!a || !b) return undefined;

  const checkin = (jugadorId: string) =>
    leer("inscripciones").find((i) => i.torneo_id === p.torneo_id && i.jugador_id === jugadorId)
      ?.check_in_en || null;

  const reportes = leer("reportes_resultado")
    .filter((r) => r.partido_id === partidoId)
    .flatMap((r) => {
      const jugador = participante(r.jugador_id);
      return jugador
        ? [
            {
              jugador,
              marcadorA: Number(r.marcador_a),
              marcadorB: Number(r.marcador_b),
              captura: r.captura_imagen || null,
              creadoEn: r.creado_en,
            },
          ]
        : [];
    })
    .sort((x, y) => x.creadoEn.localeCompare(y.creadoEn));

  // La ronda siguiente: el primer partido de la ronda + 1 que no sea el tercer puesto.
  const siguiente = partidos.find(
    (x) =>
      x.torneo_id === p.torneo_id &&
      Number(x.ronda) === Number(p.ronda) + 1 &&
      x.nombre_ronda !== "Tercer puesto",
  );

  return {
    id: p.id,
    torneoId: p.torneo_id,
    torneoNombre: torneo.nombre,
    torneoFechaInicio: torneo.fecha_inicio,
    ronda: p.nombre_ronda,
    orden: Number(p.orden),
    subtitulo: `${p.nombre_ronda} · Partido ${p.orden}`,
    a,
    b,
    estado: p.estado as PartidoIncidencia["estado"],
    ganadorId: p.ganador_id || null,
    fechaHora: p.fecha_hora,
    reportes,
    checkinA: checkin(p.jugador_a_id),
    checkinB: checkin(p.jugador_b_id),
    siguienteRonda: siguiente?.nombre_ronda ?? null,
    siguienteFechaHora: siguiente?.fecha_hora ?? null,
  };
}
