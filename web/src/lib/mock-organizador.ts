import "server-only";
import { BORRADOR_INICIAL, type Borrador, type TipoTorneo } from "./crear-config";
import { formatDiaSemana } from "./format";
import { getOrganizadorActual, getTorneosDelOrganizador, leer } from "./mock";
import {
  TORNEOS_POR_NIVEL,
  type EstadisticasTorneo,
  type PerfilOrganizador,
} from "./organizador";

/** Perfil del organizador (O17): reputación, nivel, progreso y torneos organizados. */
export function getPerfilOrganizador(organizadorId: string): PerfilOrganizador {
  const org = getOrganizadorActual(organizadorId);
  const fila = leer("perfiles_organizador").find((o) => o.id === organizadorId)!;
  const torneos = getTorneosDelOrganizador(organizadorId);
  const contados = torneos.filter((t) => t.estado !== "borrador" && t.estado !== "cancelado");

  const meta = org.nivel * TORNEOS_POR_NIVEL;
  return {
    alias: org.alias,
    imagen: org.imagen,
    color1: org.color1,
    color2: org.color2,
    verificado: org.verificado,
    nivel: org.nivel,
    torneos: contados.length,
    jugadores: contados.reduce((s, t) => s + t.inscritos, 0),
    valoracion: Number(fila.valoracion),
    faltan: Math.max(0, meta - contados.length),
    progreso: Math.min(1, contados.length / meta),
    // Del más reciente al más antiguo; los borradores y cancelados no se muestran.
    organizados: [...contados].reverse(),
  };
}

/** Estadísticas de un torneo finalizado (O16), o `undefined` si no existe o no terminó. */
export function getEstadisticasTorneo(torneoId: string): EstadisticasTorneo | undefined {
  const torneo = leer("torneos").find((t) => t.id === torneoId);
  if (!torneo || torneo.estado !== "finalizado") return undefined;

  const inscripciones = leer("inscripciones").filter(
    (i) => i.torneo_id === torneoId && (i.estado === "confirmada" || i.estado === "pendiente"),
  );
  const conCheckin = inscripciones.filter((i) => i.check_in_en).length;

  const partidos = leer("partidos").filter((p) => p.torneo_id === torneoId);
  const inicio = new Date(torneo.fecha_inicio).getTime();
  const ultimo = Math.max(...partidos.map((p) => new Date(p.fecha_hora).getTime()), 0);

  // Minutos entre la hora del partido y cada reporte (los anteriores al partido no cuentan).
  const horaPartido = new Map(partidos.map((p) => [p.id, new Date(p.fecha_hora).getTime()]));
  const demoras = leer("reportes_resultado")
    .filter((r) => horaPartido.has(r.partido_id))
    .map((r) => (new Date(r.creado_en).getTime() - horaPartido.get(r.partido_id)!) / 60_000)
    .filter((m) => m >= 0);

  // Inscripciones por día, en orden de fecha.
  const porFecha = new Map<string, number>();
  for (const i of inscripciones) {
    const dia = i.creado_en.slice(0, 10);
    porFecha.set(dia, (porFecha.get(dia) ?? 0) + 1);
  }
  const porDia = [...porFecha.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dia, n]) => ({ dia: formatDiaSemana(`${dia}T12:00:00-05:00`), inscripciones: n }));

  const org = leer("perfiles_organizador").find((o) => o.id === torneo.organizador_id);
  return {
    torneoId,
    torneoNombre: torneo.nombre,
    inscritos: inscripciones.length,
    asistencia: inscripciones.length ? Math.round((conCheckin / inscripciones.length) * 100) : 0,
    duracionMin: ultimo > inicio ? Math.round((ultimo - inicio) / 60_000) : null,
    valoracion: Number(org?.valoracion ?? 0),
    porDia,
    partidos: partidos.length,
    conDisputa: partidos.filter((p) => p.resuelto_por === "organizador_disputa").length,
    reporteMedioMin: demoras.length ? Math.round(demoras.reduce((s, m) => s + m, 0) / demoras.length) : null,
  };
}

/**
 * Los datos de un torneo como borrador nuevo («Crear torneo similar»). Copia
 * todo menos la fecha, que el organizador elige otra vez.
 */
export function getBorradorDeTorneo(torneoId: string): Partial<Borrador> | undefined {
  const t = leer("torneos").find((x) => x.id === torneoId);
  if (!t) return undefined;

  const tipo: TipoTorneo =
    t.tipo_juego === "battle_royale" ? "battle_royale" : t.tipo_juego === "por_puntos" ? "por_puntos" : "uno_vs_uno";
  const num = (v: string, def: number) => (v ? Number(v) : def);
  const base = BORRADOR_INICIAL;

  return {
    juegoId: t.juego_id,
    nombre: t.nombre,
    descripcion: t.descripcion,
    tipo,
    unoVsUno: {
      formato: t.formato === "eliminacion_directa" ? t.formato : base.unoVsUno.formato,
      cupos: num(t.cupos, base.unoVsUno.cupos),
      minutos: num(t.minutos_por_partida, base.unoVsUno.minutos),
    },
    battleRoyale: {
      formato: t.formato === "clasificacion_lobbies" || t.formato === "partidas_acumuladas" ? t.formato : base.battleRoyale.formato,
      jugadores: num(t.cupos, base.battleRoyale.jugadores),
      partidas: num(t.partidas_o_rondas, base.battleRoyale.partidas),
      minutos: num(t.minutos_por_partida, base.battleRoyale.minutos),
      puntosPorEliminacion: t.puntos_por_kill === "true",
    },
    porPuntos: {
      formato: t.formato === "liga" || t.formato === "rondas_suizas" || t.formato === "record_puntos" ? t.formato : base.porPuntos.formato,
      participantes: num(t.cupos, base.porPuntos.participantes),
      rondas: num(t.partidas_o_rondas, base.porPuntos.rondas),
      minutos: num(t.minutos_por_partida, base.porPuntos.minutos),
      puntosVictoria: num(t.puntos_victoria, base.porPuntos.puntosVictoria),
      puntosEmpate: num(t.puntos_empate, base.porPuntos.puntosEmpate),
      puntosDerrota: num(t.puntos_derrota, base.porPuntos.puntosDerrota),
    },
    fechaReglas: {
      ...base.fechaReglas,
      checkinObligatorio: t.checkin_obligatorio === "true",
      premios: t.premio,
    },
  };
}
