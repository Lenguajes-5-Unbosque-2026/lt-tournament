import "server-only";
import type { Amigo, Historial, Logro, Notificacion, TipoNotificacion } from "./progreso";
import { getAmigosIds, getRankingDeJuego, leer } from "./mock";

/** Torneos terminados del jugador, del más reciente al más antiguo, con su resultado. */
export function getHistorial(jugadorId: string): Historial {
  const torneos = new Map(leer("torneos").map((t) => [t.id, t]));
  const juegos = new Map(leer("juegos").map((j) => [j.id, j]));
  const inscritos = (torneoId: string) =>
    leer("inscripciones").filter((i) => i.torneo_id === torneoId && i.estado === "confirmada").length;

  const items = leer("posiciones_finales")
    .filter((f) => f.jugador_id === jugadorId && torneos.has(f.torneo_id))
    .map((f) => {
      const t = torneos.get(f.torneo_id)!;
      const j = juegos.get(t.juego_id);
      return {
        torneoId: t.id,
        nombre: t.nombre,
        juegoId: t.juego_id,
        juegoNombre: j?.nombre ?? t.juego_id,
        jugadores: inscritos(t.id),
        fechaInicio: t.fecha_inicio,
        puesto: Number(f.posicion),
        puntos: Number(f.puntos_ranking),
        victorias: Number(f.victorias || 0),
        partidos: Number(f.partidos_jugados || 0),
      };
    })
    .sort((a, b) => b.fechaInicio.localeCompare(a.fechaInicio));

  const vistos = new Map(items.map((i) => [i.juegoId, i.juegoNombre]));
  return { items, juegos: [...vistos].map(([id, nombre]) => ({ id, nombre })) };
}

/** Avisos del usuario, del más reciente al más antiguo. */
export function getNotificaciones(usuarioId: string): Notificacion[] {
  return leer("notificaciones")
    .filter((n) => n.usuario_id === usuarioId)
    .map((n) => ({
      id: n.id,
      tipo: n.tipo as TipoNotificacion,
      titulo: n.titulo,
      texto: n.texto,
      torneoId: n.torneo_id || null,
      leida: n.leida === "true",
      creadoEn: n.creado_en,
    }))
    .sort((a, b) => b.creadoEn.localeCompare(a.creadoEn));
}

/** El jugador y sus amigos aceptados, de más a menos puntos (J21). */
export function getAmigosRanking(jugadorId: string): Amigo[] {
  const ids = new Set([jugadorId, ...getAmigosIds(jugadorId)]);
  return leer("perfiles_jugador")
    .filter((p) => ids.has(p.id))
    .map((p) => ({
      id: p.id,
      nombre: p.nombre_usuario,
      imagen: p.imagen,
      color1: p.color_1,
      color2: p.color_2,
      nivel: Number(p.nivel),
      puntos: Number(p.puntos_ranking),
      esYo: p.id === jugadorId,
    }))
    .sort((a, b) => b.puntos - a.puntos);
}

/**
 * Logros del perfil (J18), calculados con lo que ya jugó: primer título,
 * victorias acumuladas y un lugar en el top 10 de su juego principal.
 */
export function getLogros(jugadorId: string): Logro[] {
  const historial = getHistorial(jugadorId).items;
  const logros: Logro[] = [];

  const titulo = [...historial].reverse().find((h) => h.puesto === 1);
  if (titulo) logros.push({ id: "titulo", titulo: "Primer título", detalle: titulo.nombre });

  const victorias = historial.reduce((s, h) => s + h.victorias, 0);
  if (victorias > 0) {
    logros.push({ id: "victorias", titulo: `Victorias x${victorias}`, detalle: "En todos los torneos" });
  }

  const principal = leer("perfiles_jugador").find((p) => p.id === jugadorId)?.juego_principal_id;
  if (principal) {
    const lugar = getRankingDeJuego(principal).findIndex((r) => r.id === jugadorId);
    const nombre = leer("juegos").find((j) => j.id === principal)?.nombre ?? principal;
    if (lugar >= 0 && lugar < 10) logros.push({ id: "top", titulo: "Top 10", detalle: nombre });
  }
  return logros;
}
