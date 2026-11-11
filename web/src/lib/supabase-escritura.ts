import "server-only";
import { randomUUID } from "node:crypto";
import type { Borrador } from "./crear-config";
import { slugDeNombre } from "./slug";
import { getSupabase } from "./supabase";

/**
 * Escritura en Supabase (INSERT y UPDATE con la llave pública). Las políticas
 * que lo permiten están en supabase/escritura.sql. Las funciones devuelven un
 * resultado en lugar de lanzar, para que la pantalla avise del error.
 */
export type Resultado<T = object> = ({ ok: true } & T) | { ok: false; error: string };

type ErrorSupabase = { code?: string; message: string; details?: string };

/** id legible, como los de los datos de prueba: ins_3fa9c1d2 */
function nuevoId(prefijo: string) {
  return `${prefijo}_${randomUUID().replace(/-/g, "").slice(0, 8)}`;
}

/** Cambia el mensaje técnico de Postgres por uno que entienda quien usa la app. */
function mensaje(error: ErrorSupabase, traducciones: Record<string, string> = {}) {
  const texto = `${error.message} ${error.details ?? ""}`;
  const clave = Object.keys(traducciones).find((k) => texto.includes(k));
  return clave ? traducciones[clave] : error.message;
}

async function envolver<T extends object>(fn: () => Promise<Resultado<T>>): Promise<Resultado<T>> {
  try {
    return await fn();
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "No se pudo conectar con Supabase." };
  }
}

/** 100 × (N − puesto + 1) / N, redondeado: el primer puesto da 100 como máximo. */
const puntosDelPuesto = (n: number, puesto: number) => Math.round((100 * (n - puesto + 1)) / n);

// ---------------------------------------------------------------- inscripciones

/** Inscribe al jugador (confirmada) o lo pone en la lista de espera. Si ya estaba inscrito, no falla. */
export function inscribir(torneoId: string, jugadorId: string, estado: "confirmada" | "espera") {
  return envolver<{ posicionEspera: number }>(async () => {
    const supabase = getSupabase();
    const { data: previas, error: errorLectura } = await supabase
      .from("inscripciones")
      .select("estado")
      .eq("torneo_id", torneoId);
    if (errorLectura) return { ok: false, error: errorLectura.message };

    const ocupan = previas.filter((i) => i.estado === "confirmada" || i.estado === "pendiente").length;
    const enEspera = previas.filter((i) => i.estado === "espera").length;

    const { error } = await supabase.from("inscripciones").insert({
      id: nuevoId("ins"),
      torneo_id: torneoId,
      jugador_id: jugadorId,
      estado,
      seed: estado === "confirmada" ? ocupan + 1 : null,
      posicion_espera: estado === "espera" ? enEspera + 1 : null,
      check_in_en: null,
      creado_en: new Date().toISOString(),
    });
    // 23505: ya tenía una inscripción en este torneo (único por torneo y jugador).
    if (error && error.code !== "23505") {
      return {
        ok: false,
        error: mensaje(error, { "foreign key": "Tu cuenta todavía no existe en Supabase." }),
      };
    }
    return { ok: true, posicionEspera: enEspera + 1 };
  });
}

/** Marca el check-in del jugador con la hora actual. */
export function registrarCheckin(torneoId: string, jugadorId: string) {
  return envolver(async () => {
    const { error } = await getSupabase()
      .from("inscripciones")
      .update({ check_in_en: new Date().toISOString() })
      .eq("torneo_id", torneoId)
      .eq("jugador_id", jugadorId);
    return error ? { ok: false, error: error.message } : { ok: true };
  });
}

// ---------------------------------------------------------------- cuentas

const COLORES_PERFIL = { color_1: "#ff7a29", color_2: "#7a2e05" };

export type DatosCuenta = {
  perfil: "jugador" | "organizador";
  nombre: string;
  idPublico: string;
  correo: string;
};

/** Crea el usuario y su perfil. La contraseña la gestiona Supabase Auth (aún no conectado). */
export function crearCuentaEnSupabase(d: DatosCuenta) {
  return envolver<{ id: string }>(async () => {
    const supabase = getSupabase();
    const id = nuevoId("usr");
    const creadoEn = new Date().toISOString();

    const usuario = await supabase.from("usuarios").insert({
      id,
      nombre: d.nombre,
      correo: d.correo.toLowerCase(),
      ciudad: null,
      modo_actual: d.perfil,
      creado_en: creadoEn,
    });
    if (usuario.error) {
      return {
        ok: false,
        error: mensaje(usuario.error, { usuarios_correo_key: "Ese correo ya tiene una cuenta." }),
      };
    }

    const perfil =
      d.perfil === "jugador"
        ? await supabase.from("perfiles_jugador").insert({
            id,
            nombre_usuario: d.idPublico,
            juego_principal_id: null,
            nivel: 1,
            puntos_ranking: 0,
            ...COLORES_PERFIL,
            imagen: null,
            creado_en: creadoEn,
          })
        : await supabase.from("perfiles_organizador").insert({
            id,
            alias: d.idPublico,
            nivel: 1,
            verificado: false,
            valoracion: 0,
            seguidores: 0,
            ...COLORES_PERFIL,
            imagen: null,
            creado_en: creadoEn,
          });
    if (perfil.error) {
      return {
        ok: false,
        error: mensaje(perfil.error, { nombre_usuario_key: "Ese ID ya está en uso. Prueba con otro." }),
      };
    }
    return { ok: true, id };
  });
}

/** Guarda los juegos que eligió el jugador en «Tus juegos». */
export function guardarJuegos(jugadorId: string, juegos: string[]) {
  return envolver(async () => {
    if (juegos.length === 0) return { ok: true };
    const { error } = await getSupabase()
      .from("jugador_juegos")
      .upsert(
        juegos.map((juego_id) => ({ jugador_id: jugadorId, juego_id })),
        // Si ya estaba elegido no se toca: así solo hace falta el permiso de INSERT.
        { onConflict: "jugador_id,juego_id", ignoreDuplicates: true },
      );
    return error ? { ok: false, error: error.message } : { ok: true };
  });
}

// ---------------------------------------------------------------- torneos

const TIPO_GUARDADO = {
  uno_vs_uno: "equipo_vs_equipo", // nombre heredado de los datos de prueba para 1 vs 1
  battle_royale: "battle_royale",
  por_puntos: "por_puntos",
} as const;

/** Guarda el torneo del asistente: publicado (`abierto`) o como `borrador`. */
export function guardarTorneo(b: Borrador, organizadorId: string, estado: "abierto" | "borrador") {
  return envolver<{ id: string }>(async () => {
    const id = nuevoId("tor");
    const ahora = new Date().toISOString();
    const f = b.fechaReglas;

    const porTipo = <T>(uno: T, br: T, pp: T) =>
      b.tipo === "battle_royale" ? br : b.tipo === "por_puntos" ? pp : uno;
    const cupos = porTipo(b.unoVsUno.cupos, b.battleRoyale.jugadores, b.porPuntos.participantes);
    const minutos = porTipo(b.unoVsUno.minutos, b.battleRoyale.minutos, b.porPuntos.minutos);
    const formato = porTipo(b.unoVsUno.formato, b.battleRoyale.formato, b.porPuntos.formato);
    const rondas = porTipo<number | null>(null, b.battleRoyale.partidas, b.porPuntos.rondas);

    // Un borrador puede no tener fecha todavía: la base la pide, así que va la de hoy.
    const inicio = f.fecha && f.hora ? `${f.fecha}T${f.hora}:00-05:00` : ahora;
    const reglas = [
      f.checkinObligatorio && "Check-in 30 min antes en la app",
      f.capturaMarcador && "Reporte con captura del marcador",
      f.desconexion && "Desconexión: se repite el partido una vez",
      f.suplentes && "Se permiten suplentes",
    ].filter((r): r is string => Boolean(r));

    const puntos = [1, 2, 3].map((p) => puntosDelPuesto(cupos, p));
    const { error } = await getSupabase()
      .from("torneos")
      .insert({
        id,
        organizador_id: organizadorId,
        juego_id: b.juegoId,
        nombre: b.nombre.trim(),
        descripcion: b.descripcion.trim() || null,
        imagen: null,
        tipo_juego: TIPO_GUARDADO[b.tipo],
        formato,
        jugadores_por_equipo: 1,
        cupos,
        partidas_o_rondas: rondas,
        minutos_por_partida: minutos,
        fecha_inicio: inicio,
        cierre_inscripciones: f.cierre ? `${f.cierre}:00-05:00` : null,
        checkin_obligatorio: f.checkinObligatorio,
        checkin_minutos_antes: f.checkinObligatorio ? 30 : null,
        puntos_victoria: b.tipo === "por_puntos" ? b.porPuntos.puntosVictoria : null,
        puntos_empate: b.tipo === "por_puntos" ? b.porPuntos.puntosEmpate : null,
        puntos_derrota: b.tipo === "por_puntos" ? b.porPuntos.puntosDerrota : null,
        puntos_por_kill: b.tipo === "battle_royale" ? b.battleRoyale.puntosPorEliminacion : null,
        puntos_1: puntos[0],
        puntos_2: puntos[1],
        puntos_3: puntos[2],
        puntos_participacion: 10,
        premio: f.premios.trim() || null,
        reglas: reglas.length ? reglas : null,
        estado,
        precio_cop: 0,
        ciudad: "Bogotá",
        enlace: `lt.gg/${slugDeNombre(b.nombre)}`,
        creado_en: ahora,
      });
    return error ? { ok: false, error: error.message } : { ok: true, id };
  });
}

// ---------------------------------------------------------------- chat

export function guardarMensaje(m: {
  torneoId: string;
  autorId: string;
  contenido: string;
  esAnuncio: boolean;
  fijado: boolean;
}) {
  return envolver(async () => {
    const { error } = await getSupabase().from("mensajes_torneo").insert({
      id: nuevoId("msg"),
      torneo_id: m.torneoId,
      autor_id: m.autorId,
      contenido: m.contenido,
      es_anuncio: m.esAnuncio,
      fijado: m.fijado,
      creado_en: new Date().toISOString(),
    });
    return error ? { ok: false, error: error.message } : { ok: true };
  });
}
