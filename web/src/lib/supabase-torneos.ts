import "server-only";
import { portadaDeJuego } from "./imagen";
import { getSupabase } from "./supabase";
import type { EstadoTorneo, MisTorneos, TipoJuego, Torneo } from "./types";

/** Torneos que se muestran en Explorar (igual que en lib/mock.ts). */
const ESTADOS_VISIBLES: EstadoTorneo[] = ["abierto", "checkin", "en_curso"];

/** Estados de inscripción que ocupan cupo: «24/32» (data/mock/README.md). */
const OCUPAN_CUPO = ["confirmada", "pendiente"];

/**
 * Forma de cada fila que devuelve la consulta (columnas de supabase/schema.sql).
 * juego y organizador son un objeto porque torneos tiene una sola FK a cada uno.
 */
export type FilaTorneo = {
  id: string;
  nombre: string;
  imagen: string | null;
  tipo_juego: string;
  jugadores_por_equipo: number;
  cupos: number;
  fecha_inicio: string;
  estado: string;
  ciudad: string | null;
  juego: {
    id: string;
    nombre: string;
    color_1: string;
    color_2: string;
    abreviatura: string;
    imagen: string | null;
  };
  organizador: { id: string; alias: string; verificado: boolean; imagen: string | null };
  inscripciones: { estado: string }[];
};

export const SELECT_TORNEO = `id, nombre, imagen, tipo_juego, jugadores_por_equipo, cupos, fecha_inicio, estado, ciudad,
       juego:juegos!inner (id, nombre, color_1, color_2, abreviatura, imagen),
       organizador:perfiles_organizador!inner (id, alias, verificado, imagen),
       inscripciones (estado)`;

export function aTorneo(t: FilaTorneo): Torneo {
  // La portada del torneo es la de su juego (la imagen real, no una ilustración).
  const portada = portadaDeJuego(t.juego.id, t.juego.imagen);
  return {
    id: t.id,
    nombre: t.nombre,
    imagen: portada,
    tipoJuego: t.tipo_juego as TipoJuego,
    jugadoresPorEquipo: t.jugadores_por_equipo,
    cupos: t.cupos,
    inscritos: t.inscripciones.filter((i) => OCUPAN_CUPO.includes(i.estado)).length,
    fechaInicio: t.fecha_inicio,
    estado: t.estado as EstadoTorneo,
    ciudad: t.ciudad ?? "",
    juego: {
      id: t.juego.id,
      nombre: t.juego.nombre,
      color1: t.juego.color_1,
      color2: t.juego.color_2,
      abreviatura: t.juego.abreviatura,
      imagen: portada,
    },
    organizador: {
      id: t.organizador.id,
      alias: t.organizador.alias,
      verificado: t.organizador.verificado,
      imagen: t.organizador.imagen ?? "",
    },
  };
}

/**
 * Torneos visibles para el jugador, del más próximo al más lejano, con su
 * juego, su organizador y el conteo de inscritos. Lee de Supabase; si la
 * consulta falla lanza un error para que lo atrape el error.tsx de la ruta.
 */
export async function getTorneosVisibles(): Promise<Torneo[]> {
  const { data, error } = await getSupabase()
    .from("torneos")
    .select(SELECT_TORNEO)
    .in("estado", ESTADOS_VISIBLES)
    .order("fecha_inicio")
    .overrideTypes<FilaTorneo[], { merge: false }>();

  if (error) throw new Error(`No se pudieron cargar los torneos: ${error.message}`);
  return data.map(aTorneo);
}

/**
 * Torneos del organizador en cualquier estado (con borradores), del más
 * próximo al más lejano. Incluye los que creó desde la app.
 */
export async function getTorneosDelOrganizadorSupabase(organizadorId: string): Promise<Torneo[]> {
  const { data, error } = await getSupabase()
    .from("torneos")
    .select(SELECT_TORNEO)
    .eq("organizador_id", organizadorId)
    .order("fecha_inicio")
    .overrideTypes<FilaTorneo[], { merge: false }>();

  if (error) throw new Error(`No se pudieron cargar tus torneos: ${error.message}`);
  return data.map(aTorneo);
}

/**
 * Torneos en los que el jugador está inscrito, por pestaña de Mis torneos.
 * Lee las inscripciones de Supabase, así que aparecen las que se acaban de
 * hacer. Las canceladas no cuentan; las de lista de espera van aparte.
 */
export async function getMisTorneosSupabase(jugadorId: string): Promise<MisTorneos> {
  const supabase = getSupabase();
  const { data: mias, error } = await supabase
    .from("inscripciones")
    .select("torneo_id, estado")
    .eq("jugador_id", jugadorId);
  if (error) throw new Error(`No se pudieron cargar tus inscripciones: ${error.message}`);

  const estados: MisTorneos["estados"] = {};
  const enEspera = new Set<string>();
  for (const i of mias) {
    if (i.estado === "confirmada" || i.estado === "pendiente") estados[i.torneo_id] = i.estado;
    else if (i.estado === "espera") enEspera.add(i.torneo_id);
  }

  const ids = [...Object.keys(estados), ...enEspera];
  if (ids.length === 0) {
    return { estados, espera: [], proximos: [], enCurso: [], finalizados: [] };
  }

  const { data, error: errorTorneos } = await supabase
    .from("torneos")
    .select(SELECT_TORNEO)
    .in("id", ids)
    .order("fecha_inicio")
    .overrideTypes<FilaTorneo[], { merge: false }>();
  if (errorTorneos) throw new Error(`No se pudieron cargar tus torneos: ${errorTorneos.message}`);

  const todos = data.map(aTorneo);
  const torneos = todos.filter((t) => t.id in estados);
  return {
    estados,
    espera: todos.filter((t) => enEspera.has(t.id)),
    proximos: torneos.filter((t) => t.estado === "abierto" || t.estado === "checkin"),
    enCurso: torneos.filter((t) => t.estado === "en_curso"),
    finalizados: torneos.filter((t) => t.estado === "finalizado").reverse(),
  };
}
