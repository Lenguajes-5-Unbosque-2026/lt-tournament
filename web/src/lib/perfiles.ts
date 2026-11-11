import "server-only";
import {
  JUGADOR_ACTUAL_ID,
  ORGANIZADOR_ACTUAL_ID,
  existePerfilJugador,
  existePerfilOrganizador,
  getJugadorActual,
  getOrganizadorActual,
} from "./mock";
import { getSupabase } from "./supabase";
import type { Jugador, OrganizadorActual } from "./types";

/**
 * Perfil de la cuenta con la sesión abierta. Las cuentas de los datos de
 * prueba salen de data/mock; las que se crean en la app (J03) no están ahí, y
 * se leen de Supabase. Si la cuenta no existe en ninguno, se usa la de
 * ejemplo (Johitan / StreamerNova) para que la app no se rompa.
 */

export async function jugadorPorId(id: string): Promise<Jugador> {
  if (existePerfilJugador(id)) return getJugadorActual(id);

  try {
    const { data } = await getSupabase()
      .from("perfiles_jugador")
      .select("id, nombre_usuario, nivel, puntos_ranking, color_1, color_2, imagen")
      .eq("id", id)
      .maybeSingle();
    if (data) {
      return {
        id: data.id,
        nombreUsuario: data.nombre_usuario,
        nivel: data.nivel,
        puntosRanking: data.puntos_ranking,
        color1: data.color_1,
        color2: data.color_2,
        imagen: data.imagen ?? "",
      };
    }
  } catch {
    // Sin conexión con Supabase: cae en el perfil de ejemplo.
  }
  return getJugadorActual(JUGADOR_ACTUAL_ID);
}

export async function organizadorPorId(id: string): Promise<OrganizadorActual> {
  if (existePerfilOrganizador(id)) return getOrganizadorActual(id);

  try {
    const { data } = await getSupabase()
      .from("perfiles_organizador")
      .select("id, alias, nivel, verificado, color_1, color_2, imagen")
      .eq("id", id)
      .maybeSingle();
    if (data) {
      return {
        id: data.id,
        alias: data.alias,
        verificado: data.verificado,
        nivel: data.nivel,
        color1: data.color_1,
        color2: data.color_2,
        imagen: data.imagen ?? "",
      };
    }
  } catch {
    // Sin conexión con Supabase: cae en el perfil de ejemplo.
  }
  return getOrganizadorActual(ORGANIZADOR_ACTUAL_ID);
}
