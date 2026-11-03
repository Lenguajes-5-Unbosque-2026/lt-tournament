import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { AHORA } from "./ahora";
import type { EstadoPartida, ResultadoBR, TorneoBR } from "./battle-royale";
import { parseCsv } from "./csv";
import type {
  EstadoInscripcion,
  EstadoTorneo,
  Formato,
  InscripcionPropia,
  Jugador,
  Juego,
  OrganizadorActual,
  ResumenPanel,
  TipoJuego,
  Organizador,
  ProximoTorneo,
  TorneoDetalle,
  Torneo,
} from "./types";

/**
 * Datos de prueba (data/mock → `npm run sync-mock`). Hasta conectar
 * Supabase (sesión 5) las pantallas leen de aquí.
 */

/** Jugador con la sesión iniciada en los datos de prueba: Johitan. */
export const JUGADOR_ACTUAL_ID = "usr_001";

/** Torneos que se muestran en Inicio y Explorar. */
const ESTADOS_VISIBLES: EstadoTorneo[] = ["abierto", "checkin", "en_curso"];

function leer(archivo: string) {
  const ruta = join(process.cwd(), "src", "data", "mock", `${archivo}.csv`);
  return parseCsv(readFileSync(ruta, "utf8"));
}

function juegos(): Map<string, Juego> {
  return new Map(
    leer("juegos").map((r) => [
      r.id,
      {
        id: r.id,
        nombre: r.nombre,
        color1: r.color_1,
        color2: r.color_2,
        abreviatura: r.abreviatura,
        imagen: r.imagen,
      },
    ]),
  );
}

function organizadores(): Map<string, Organizador> {
  return new Map(
    leer("perfiles_organizador").map((r) => [
      r.id,
      {
        id: r.id,
        alias: r.alias,
        verificado: r.verificado === "true",
        imagen: r.imagen,
      },
    ]),
  );
}

function todosLosTorneos(): Torneo[] {
  const catalogo = juegos();
  const orgs = organizadores();

  // «24/32»: confirmadas + pendientes (data/mock/README.md).
  const inscritos = new Map<string, number>();
  for (const i of leer("inscripciones")) {
    if (i.estado !== "confirmada" && i.estado !== "pendiente") continue;
    inscritos.set(i.torneo_id, (inscritos.get(i.torneo_id) ?? 0) + 1);
  }

  return leer("torneos").map((r) => ({
    id: r.id,
    nombre: r.nombre,
    juego: catalogo.get(r.juego_id)!,
    organizador: orgs.get(r.organizador_id)!,
    imagen: r.imagen,
    tipoJuego: r.tipo_juego as TipoJuego,
    jugadoresPorEquipo: Number(r.jugadores_por_equipo),
    cupos: Number(r.cupos),
    inscritos: inscritos.get(r.id) ?? 0,
    fechaInicio: r.fecha_inicio,
    estado: r.estado as EstadoTorneo,
    ciudad: r.ciudad,
  }));
}

/** Torneos visibles para el jugador, del más próximo al más lejano. */
export function getTorneosVisibles(): Torneo[] {
  return todosLosTorneos()
    .filter((t) => ESTADOS_VISIBLES.includes(t.estado))
    .sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio));
}

export function getJugadorActual(): Jugador {
  const perfil = leer("perfiles_jugador").find((r) => r.id === JUGADOR_ACTUAL_ID)!;
  return {
    id: perfil.id,
    nombreUsuario: perfil.nombre_usuario,
    nivel: Number(perfil.nivel),
    puntosRanking: Number(perfil.puntos_ranking),
    color1: perfil.color_1,
    color2: perfil.color_2,
    imagen: perfil.imagen,
  };
}

/** Torneo destacado de Inicio: el abierto con más inscritos que aún tiene cupos. */
export function getTorneoDestacado(torneos: Torneo[]): Torneo | undefined {
  return torneos
    .filter((t) => t.estado === "abierto" && t.inscritos < t.cupos)
    .sort((a, b) => b.inscritos / b.cupos - a.inscritos / a.cupos)[0];
}

/**
 * «Tu próximo torneo»: la inscripción confirmada del jugador con el
 * inicio más cercano a `AHORA`.
 */
export function getProximoTorneo(torneos: Torneo[]): ProximoTorneo | undefined {
  const propios = new Set(
    leer("inscripciones")
      .filter((i) => i.jugador_id === JUGADOR_ACTUAL_ID && i.estado === "confirmada")
      .map((i) => i.torneo_id),
  );
  const ahora = new Date(AHORA).getTime();
  const torneo = torneos
    .filter((t) => propios.has(t.id) && new Date(t.fechaInicio).getTime() > ahora)
    .sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio))[0];
  if (!torneo) return undefined;

  const filaTorneo = leer("torneos").find((r) => r.id === torneo.id)!;
  const minutosAntes = Number(filaTorneo.checkin_minutos_antes || 0);
  const faltanSegundos = (new Date(torneo.fechaInicio).getTime() - ahora) / 1000;

  return {
    torneo,
    faltanSegundos,
    checkinAbierto:
      filaTorneo.checkin_obligatorio === "true" && faltanSegundos <= minutosAntes * 60,
  };
}

export function getTorneoDetalle(id: string): TorneoDetalle | undefined {
  const torneo = todosLosTorneos().find((t) => t.id === id);
  if (!torneo) return undefined;
  const fila = leer("torneos").find((r) => r.id === id)!;

  return {
    ...torneo,
    formato: fila.formato as Formato,
    cierreInscripciones: fila.cierre_inscripciones,
    premio: fila.premio,
    puntos: [Number(fila.puntos_1), Number(fila.puntos_2), Number(fila.puntos_3)],
    reglas: fila.reglas ? fila.reglas.split("|") : [],
    torneosDelOrganizador: leer("torneos").filter(
      (r) => r.organizador_id === fila.organizador_id,
    ).length,
    enEspera: leer("inscripciones").filter(
      (i) => i.torneo_id === id && i.estado === "espera",
    ).length,
  };
}

/** Inscripción del jugador actual en el torneo, o `undefined` si no tiene (o la canceló). */
export function getInscripcionPropia(torneoId: string): InscripcionPropia | undefined {
  const fila = leer("inscripciones").find(
    (i) => i.torneo_id === torneoId && i.jugador_id === JUGADOR_ACTUAL_ID,
  );
  if (!fila || fila.estado === "cancelada") return undefined;
  return {
    estado: fila.estado as EstadoInscripcion,
    seed: fila.seed ? Number(fila.seed) : null,
    posicionEspera: fila.posicion_espera ? Number(fila.posicion_espera) : null,
  };
}

/** Otros torneos del mismo juego (enlace «Ver torneos similares» de J12). */
export function getTorneosSimilares(torneo: Torneo): Torneo[] {
  return getTorneosVisibles().filter(
    (t) => t.id !== torneo.id && t.juego.id === torneo.juego.id,
  );
}

/** Organizador con la sesión iniciada en los datos de prueba: StreamerNova. */
export const ORGANIZADOR_ACTUAL_ID = "usr_031";

export function getOrganizadorActual(): OrganizadorActual {
  const r = leer("perfiles_organizador").find((o) => o.id === ORGANIZADOR_ACTUAL_ID)!;
  return {
    id: r.id,
    alias: r.alias,
    verificado: r.verificado === "true",
    imagen: r.imagen,
    nivel: Number(r.nivel),
    color1: r.color_1,
    color2: r.color_2,
  };
}

/** Torneos del organizador actual, con borradores, del más próximo al más lejano. */
export function getTorneosDelOrganizador(): Torneo[] {
  return todosLosTorneos()
    .filter((t) => t.organizador.id === ORGANIZADOR_ACTUAL_ID)
    .sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio));
}

const EN_CURSO: EstadoTorneo[] = ["en_curso", "checkin"];

export function getResumenPanel(torneos: Torneo[]): ResumenPanel {
  const activos = torneos.filter((t) => t.estado === "abierto" || EN_CURSO.includes(t.estado));
  return {
    enCurso: torneos.filter((t) => EN_CURSO.includes(t.estado)).length,
    inscritos: activos.reduce((suma, t) => suma + t.inscritos, 0),
    finalizados: torneos.filter((t) => t.estado === "finalizado").length,
  };
}

/** Juegos del selector del paso 1 (O02), en el orden dado. */
export function getJuegos(ids: string[]): Juego[] {
  const catalogo = juegos();
  return ids.flatMap((id) => (catalogo.has(id) ? [catalogo.get(id)!] : []));
}

/** IDs públicos ya tomados (jugadores y organizadores), en minúsculas: el ID es único. */
export function getIdsOcupados(): string[] {
  return [
    ...leer("perfiles_jugador").map((r) => r.nombre_usuario),
    ...leer("perfiles_organizador").map((r) => r.alias),
  ].map((id) => id.toLowerCase());
}

/** Cuenta con ese correo (sin importar mayúsculas), o `undefined` si no existe. */
export function getUsuarioPorCorreo(correo: string) {
  const fila = leer("usuarios").find(
    (u) => u.correo.toLowerCase() === correo.trim().toLowerCase(),
  );
  return fila && { id: fila.id, modo: fila.modo_actual as "jugador" | "organizador" };
}

/**
 * Torneo battle royale con sus jugadores, partidas y resultados (BR · J1 a
 * BR · O4), o `undefined` si no existe o es de otro tipo de juego. Las
 * partidas que aún no tienen fila en el CSV salen como «pendiente».
 */
export function getTorneoBR(id: string): TorneoBR | undefined {
  const fila = leer("torneos").find((r) => r.id === id);
  if (!fila || fila.tipo_juego !== "battle_royale") return undefined;

  const perfiles = new Map(leer("perfiles_jugador").map((r) => [r.id, r]));
  const jugadores = leer("inscripciones")
    .filter((i) => i.torneo_id === id && i.estado === "confirmada")
    .map((i) => {
      const p = perfiles.get(i.jugador_id)!;
      return {
        id: p.id,
        nombre: p.nombre_usuario,
        imagen: p.imagen,
        color1: p.color_1,
        color2: p.color_2,
      };
    });

  const guardadas = leer("partidas_battle_royale").filter((p) => p.torneo_id === id);
  const total = Math.max(Number(fila.partidas_o_rondas) || 0, guardadas.length);
  const partidas = Array.from({ length: total }, (_, i) => {
    const p = guardadas.find((g) => Number(g.numero) === i + 1);
    return {
      id: p?.id ?? `${id}_partida_${i + 1}`,
      numero: i + 1,
      estado: (p?.estado ?? "pendiente") as EstadoPartida,
      inicio: p?.inicio ?? "",
      vivos: p?.jugadores_vivos ? Number(p.jugadores_vivos) : null,
      ganadorId: p?.ganador_id || null,
      prueba: p?.prueba_imagen || null,
    };
  });

  const ids = new Set(partidas.map((p) => p.id));
  const resultados = leer("resultados_battle_royale")
    .filter((r) => ids.has(r.partida_br_id))
    .map((r) => ({
      partidaId: r.partida_br_id,
      jugadorId: r.jugador_id,
      puesto: Number(r.puesto),
      kills: Number(r.kills),
      puntos: Number(r.puntos),
      estado: r.estado as ResultadoBR["estado"],
      captura: r.captura_imagen || null,
    }));

  return {
    id,
    nombre: fila.nombre,
    enlace: fila.enlace,
    formato: fila.formato,
    minutosPorPartida: Number(fila.minutos_por_partida),
    // En battle royale la columna es un sí/no: 1 punto por kill.
    puntosPorKill: fila.puntos_por_kill === "true" ? 1 : 0,
    premios: [Number(fila.puntos_1), Number(fila.puntos_2), Number(fila.puntos_3)],
    jugadores,
    partidas,
    resultados,
  };
}
