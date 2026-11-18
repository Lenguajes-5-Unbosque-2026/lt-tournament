import "server-only";
import type { Chat, Sala } from "./competir";
import type { EstadoInscrito, ListaInscritos, ResumenGestion } from "./gestion";
import {
  getInscripcionPropia as mockInscripcion,
  getTorneoDetalle as mockDetalle,
  tipoDeBracket,
} from "./mock";
import { getChat as mockChat, getSala as mockSala } from "./mock-competir";
import { getInscritosGestion as mockInscritos, getResumenGestion as mockResumen } from "./mock-gestion";
import { getSupabase } from "./supabase";
import { aTorneo, SELECT_TORNEO, type FilaTorneo } from "./supabase-torneos";
import type { EstadoInscripcion, Formato, InscripcionPropia, TorneoDetalle } from "./types";

/**
 * Lectura de un torneo, de su inscripción y de su Sala: primero de Supabase
 * (ahí viven los torneos y las inscripciones que se crean en la app) y, si no
 * está o falla la consulta, de los datos de prueba.
 */

type FilaDetalle = FilaTorneo & {
  organizador_id: string;
  formato: string;
  cierre_inscripciones: string | null;
  premio: string | null;
  reglas: string[] | null;
  puntos_1: number;
  puntos_2: number;
  puntos_3: number;
  checkin_obligatorio: boolean;
  checkin_minutos_antes: number | null;
  minutos_por_partida: number | null;
};

async function filaDetalle(id: string): Promise<FilaDetalle | null> {
  const { data, error } = await getSupabase()
    .from("torneos")
    .select(
      `${SELECT_TORNEO}, organizador_id, formato, cierre_inscripciones, premio, reglas,
       puntos_1, puntos_2, puntos_3, checkin_obligatorio, checkin_minutos_antes, minutos_por_partida`,
    )
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<FilaDetalle, { merge: false }>();
  if (error) throw new Error(error.message);
  return data;
}

async function detalleSupabase(id: string): Promise<TorneoDetalle | undefined> {
  const t = await filaDetalle(id);
  if (!t) return undefined;
  const supabase = getSupabase();
  const [propios, espera] = await Promise.all([
    supabase
      .from("torneos")
      .select("id", { count: "exact", head: true })
      .eq("organizador_id", t.organizador_id),
    supabase
      .from("inscripciones")
      .select("id", { count: "exact", head: true })
      .eq("torneo_id", id)
      .eq("estado", "espera"),
  ]);
  return {
    ...aTorneo(t),
    formato: t.formato as Formato,
    cierreInscripciones: t.cierre_inscripciones ?? t.fecha_inicio,
    premio: t.premio ?? "",
    puntos: [t.puntos_1, t.puntos_2, t.puntos_3],
    reglas: t.reglas ?? [],
    torneosDelOrganizador: propios.count ?? 1,
    enEspera: espera.count ?? 0,
  };
}

export async function torneoDetalle(id: string): Promise<TorneoDetalle | undefined> {
  try {
    const t = await detalleSupabase(id);
    if (t) return t;
  } catch {
    // Sin conexión con Supabase: caen los datos de prueba.
  }
  return mockDetalle(id);
}

export async function inscripcionPropia(
  torneoId: string,
  jugadorId: string,
): Promise<InscripcionPropia | undefined> {
  try {
    const { data, error } = await getSupabase()
      .from("inscripciones")
      .select("estado, seed, posicion_espera")
      .eq("torneo_id", torneoId)
      .eq("jugador_id", jugadorId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (data) {
      if (data.estado === "cancelada") return undefined;
      return {
        estado: data.estado as EstadoInscripcion,
        seed: data.seed ?? null,
        posicionEspera: data.posicion_espera ?? null,
      };
    }
  } catch {
    // cae en los datos de prueba
  }
  return mockInscripcion(torneoId, jugadorId);
}

/** ¿Tiene pantalla de bracket? Los torneos nuevos aún no generan cuadro. */
export const conBracket = (id: string) => tipoDeBracket(id) !== undefined;

export async function salaDelJugador(torneoId: string, jugadorId: string): Promise<Sala | undefined> {
  try {
    const t = await filaDetalle(torneoId);
    if (t) {
      const { data: ins, error } = await getSupabase()
        .from("inscripciones")
        .select("estado, check_in_en")
        .eq("torneo_id", torneoId)
        .eq("jugador_id", jugadorId)
        .maybeSingle();
      if (error) throw new Error(error.message);
      if (!ins || (ins.estado !== "confirmada" && ins.estado !== "pendiente")) return undefined;
      return {
        torneoId,
        torneoNombre: t.nombre,
        fechaInicio: t.fecha_inicio,
        checkinObligatorio: t.checkin_obligatorio,
        minutosAntes: t.checkin_minutos_antes ?? 0,
        checkinEn: ins.check_in_en ?? null,
        reglas: t.reglas ?? [],
        minutosPorPartida: t.minutos_por_partida,
        // Los datos de prueba pueden traer un cuadro; en Supabase aún no se genera.
        primerPartido: mockSala(torneoId, jugadorId)?.primerPartido ?? null,
      };
    }
  } catch {
    // cae en los datos de prueba
  }
  return mockSala(torneoId, jugadorId);
}

export async function resumenGestion(torneoId: string): Promise<ResumenGestion | undefined> {
  try {
    const t = await filaDetalle(torneoId);
    if (t) {
      const { data, error } = await getSupabase()
        .from("inscripciones")
        .select("estado, check_in_en")
        .eq("torneo_id", torneoId);
      if (error) throw new Error(error.message);
      const ocupan = data.filter((i) => i.estado === "confirmada" || i.estado === "pendiente");
      return {
        torneoId,
        nombre: t.nombre,
        estado: t.estado,
        fechaInicio: t.fecha_inicio,
        cupos: t.cupos,
        inscritos: ocupan.length,
        checkins: ocupan.filter((i) => i.check_in_en).length,
        enEspera: data.filter((i) => i.estado === "espera").length,
        minutosAntes: t.checkin_minutos_antes ?? 30,
        conBracket: conBracket(torneoId),
      };
    }
  } catch {
    // cae en los datos de prueba
  }
  return mockResumen(torneoId);
}

// ---------------------------------------------------------------- inscritos

type FilaPerfil = {
  id: string;
  nombre_usuario?: string;
  alias?: string;
  imagen: string | null;
  color_1: string;
  color_2: string;
};

/** Perfiles de jugador y de organizador por id (los autores y los inscritos). */
async function perfilesPorId(ids: string[]) {
  const mapa = new Map<string, { nombre: string; imagen: string; color1: string; color2: string }>();
  if (ids.length === 0) return mapa;
  const supabase = getSupabase();
  const [jugadores, organizadores] = await Promise.all([
    supabase
      .from("perfiles_jugador")
      .select("id, nombre_usuario, imagen, color_1, color_2")
      .in("id", ids)
      .overrideTypes<FilaPerfil[], { merge: false }>(),
    supabase
      .from("perfiles_organizador")
      .select("id, alias, imagen, color_1, color_2")
      .in("id", ids)
      .overrideTypes<FilaPerfil[], { merge: false }>(),
  ]);
  if (jugadores.error) throw new Error(jugadores.error.message);
  if (organizadores.error) throw new Error(organizadores.error.message);
  for (const p of [...(organizadores.data ?? []), ...(jugadores.data ?? [])]) {
    mapa.set(p.id, {
      nombre: p.nombre_usuario ?? p.alias ?? "Jugador",
      imagen: p.imagen ?? "",
      color1: p.color_1,
      color2: p.color_2,
    });
  }
  return mapa;
}

/** Inscritos del torneo (confirmados, pendientes y en espera), del más reciente al más antiguo. */
export async function inscritosGestion(torneoId: string): Promise<ListaInscritos | undefined> {
  try {
    const t = await filaDetalle(torneoId);
    if (t) {
      const { data, error } = await getSupabase()
        .from("inscripciones")
        .select("jugador_id, estado, creado_en, check_in_en")
        .eq("torneo_id", torneoId)
        .in("estado", ["confirmada", "pendiente", "espera"]);
      if (error) throw new Error(error.message);
      const perfiles = await perfilesPorId(data.map((i) => i.jugador_id));
      const inscritos = data
        .flatMap((i) => {
          const p = perfiles.get(i.jugador_id);
          return p
            ? [
                {
                  id: i.jugador_id,
                  nombre: p.nombre,
                  imagen: p.imagen,
                  color1: p.color1,
                  color2: p.color2,
                  estado: i.estado as EstadoInscrito,
                  inscritoEn: i.creado_en as string,
                  checkin: !!i.check_in_en,
                  checkinEn: (i.check_in_en as string | null) ?? null,
                },
              ]
            : [];
        })
        .sort((a, b) => b.inscritoEn.localeCompare(a.inscritoEn));
      return { torneoId, torneoNombre: t.nombre, cupos: t.cupos, inscritos };
    }
  } catch {
    // cae en los datos de prueba
  }
  return mockInscritos(torneoId);
}

// ---------------------------------------------------------------- chat

/** Chat público del torneo: anuncio fijado y mensajes, del más viejo al más nuevo. */
export async function chatDelTorneo(torneoId: string, usuarioId: string): Promise<Chat | undefined> {
  try {
    const t = await torneoDetalle(torneoId);
    if (t) {
      const { data, error } = await getSupabase()
        .from("mensajes_torneo")
        .select("id, autor_id, contenido, fijado, creado_en")
        .eq("torneo_id", torneoId)
        .order("creado_en");
      if (error) throw new Error(error.message);
      const perfiles = await perfilesPorId([usuarioId, ...data.map((m) => m.autor_id)]);
      const autor = (id: string) => {
        const p = perfiles.get(id);
        return {
          id,
          nombre: p?.nombre ?? "Jugador",
          imagen: p?.imagen ?? "",
          color1: p?.color1 ?? "",
          color2: p?.color2 ?? "",
        };
      };
      const fijado = [...data].reverse().find((m) => m.fijado);
      return {
        yo: autor(usuarioId),
        torneoId,
        torneoNombre: t.nombre,
        inscritos: t.inscritos,
        anuncio: fijado ? { organizador: autor(fijado.autor_id).nombre, contenido: fijado.contenido } : null,
        mensajes: data
          .filter((m) => !m.fijado)
          .map((m) => ({
            id: m.id,
            autor: { ...autor(m.autor_id), esOrganizador: m.autor_id === t.organizador.id },
            contenido: m.contenido,
            creadoEn: m.creado_en,
            esPropio: m.autor_id === usuarioId,
          })),
      };
    }
  } catch {
    // cae en los datos de prueba
  }
  return mockChat(torneoId, usuarioId);
}
