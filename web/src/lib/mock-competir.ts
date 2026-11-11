import "server-only";
import type { Chat, PrimerPartido, ResultadoFinal, Sala } from "./competir";
import { cuadro, jugadorPorId } from "./eliminacion";
import { getRankingDeJuego, getTorneoDetalle, getTorneoEliminacion, leer } from "./mock";

/**
 * La Sala del torneo (J14) del jugador, o `undefined` si el torneo no existe o
 * el jugador no está inscrito (confirmada o pendiente).
 */
export function getSala(torneoId: string, jugadorId: string): Sala | undefined {
  const detalle = getTorneoDetalle(torneoId);
  const inscripcion = leer("inscripciones").find(
    (i) => i.torneo_id === torneoId && i.jugador_id === jugadorId,
  );
  if (!detalle || !inscripcion) return undefined;
  if (inscripcion.estado !== "confirmada" && inscripcion.estado !== "pendiente") return undefined;

  const fila = leer("torneos").find((t) => t.id === torneoId)!;

  // Primer partido: la llave de la 1.ª ronda donde juega, si es un cuadro 1 vs 1.
  let primerPartido: PrimerPartido | null = null;
  const eliminacion = getTorneoEliminacion(torneoId);
  if (eliminacion) {
    const llave = cuadro(eliminacion)[0]?.llaves.find(
      (l) => !l.pase && (l.aId === jugadorId || l.bId === jugadorId),
    );
    const yo = jugadorPorId(eliminacion, jugadorId);
    const rival = jugadorPorId(eliminacion, llave?.aId === jugadorId ? llave.bId : (llave?.aId ?? null));
    if (llave && yo && rival) {
      primerPartido = { yo, rival, ronda: cuadro(eliminacion)[0].nombre, fechaHora: llave.fechaHora };
    }
  }

  return {
    torneoId,
    torneoNombre: detalle.nombre,
    fechaInicio: detalle.fechaInicio,
    checkinObligatorio: fila.checkin_obligatorio === "true",
    minutosAntes: Number(fila.checkin_minutos_antes || 0),
    checkinEn: inscripcion.check_in_en || null,
    reglas: detalle.reglas,
    minutosPorPartida: fila.minutos_por_partida ? Number(fila.minutos_por_partida) : null,
    primerPartido,
  };
}

/** El chat público del torneo (J15): anuncio fijado y mensajes, del más viejo al más nuevo. */
export function getChat(torneoId: string, jugadorId: string): Chat | undefined {
  const detalle = getTorneoDetalle(torneoId);
  if (!detalle) return undefined;

  const perfiles = new Map(leer("perfiles_jugador").map((p) => [p.id, p]));
  const organizadores = new Map(leer("perfiles_organizador").map((o) => [o.id, o]));
  const autor = (id: string) => {
    const j = perfiles.get(id);
    const o = organizadores.get(id);
    return {
      id,
      nombre: j?.nombre_usuario ?? o?.alias ?? "Jugador",
      imagen: (j ?? o)?.imagen ?? "",
      color1: (j ?? o)?.color_1 ?? "",
      color2: (j ?? o)?.color_2 ?? "",
      esOrganizador: id === detalle.organizador.id,
    };
  };

  const filas = leer("mensajes_torneo").filter((m) => m.torneo_id === torneoId);
  const fijado = filas.find((m) => m.fijado === "true");

  const { esOrganizador: _, ...yo } = autor(jugadorId);
  void _;
  return {
    yo,
    torneoId,
    torneoNombre: detalle.nombre,
    inscritos: detalle.inscritos,
    anuncio: fijado ? { organizador: autor(fijado.autor_id).nombre, contenido: fijado.contenido } : null,
    mensajes: filas
      .filter((m) => m.fijado !== "true")
      .sort((a, b) => a.creado_en.localeCompare(b.creado_en))
      .map((m) => ({
        id: m.id,
        autor: autor(m.autor_id),
        contenido: m.contenido,
        creadoEn: m.creado_en,
        esPropio: m.autor_id === jugadorId,
      })),
  };
}

/**
 * Resultado final (F1) de un torneo finalizado, o `undefined` si el jugador
 * no está en el podio (solo los tres primeros lo ven).
 */
export function getResultadoFinal(torneoId: string, jugadorId: string): ResultadoFinal | undefined {
  const detalle = getTorneoDetalle(torneoId);
  if (!detalle || detalle.estado !== "finalizado") return undefined;

  const perfiles = new Map(leer("perfiles_jugador").map((p) => [p.id, p]));
  const filas = leer("posiciones_finales")
    .filter((f) => f.torneo_id === torneoId)
    .sort((a, b) => Number(a.posicion) - Number(b.posicion));

  const podio = filas.slice(0, 3).flatMap((f) => {
    const p = perfiles.get(f.jugador_id);
    return p
      ? [
          {
            id: p.id,
            nombre: p.nombre_usuario,
            imagen: p.imagen,
            color1: p.color_1,
            color2: p.color_2,
            puesto: Number(f.posicion),
            puntos: Number(f.puntos_ranking),
          },
        ]
      : [];
  });
  const mia = filas.find((f) => f.jugador_id === jugadorId);
  if (!mia || Number(mia.posicion) > 3) return undefined;

  // Puestos que subió: su lugar en el ranking del juego sin este torneo, menos con él.
  const lugar = (ranking: { id: string }[]) => {
    const i = ranking.findIndex((r) => r.id === jugadorId);
    return i < 0 ? ranking.length + 1 : i + 1;
  };
  const antes = lugar(getRankingDeJuego(detalle.juego.id, torneoId));
  const despues = lugar(getRankingDeJuego(detalle.juego.id));

  return {
    torneoId,
    torneoNombre: detalle.nombre,
    juegoNombre: detalle.juego.nombre,
    podio,
    puesto: Number(mia.posicion),
    puntos: Number(mia.puntos_ranking),
    victorias: Number(mia.victorias || 0),
    puestosSubidos: antes - despues,
  };
}
