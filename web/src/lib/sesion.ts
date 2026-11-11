import "server-only";
import { cookies } from "next/headers";
import {
  JUGADOR_ACTUAL_ID,
  ORGANIZADOR_ACTUAL_ID,
  existePerfilJugador,
  existePerfilOrganizador,
} from "./mock";

/** Cookie con el id de la cuenta que ingresó en J04 (sesión de prueba, sin Supabase Auth). */
export const COOKIE_USUARIO = "lt_usuario";

async function usuarioDeSesion() {
  return (await cookies()).get(COOKIE_USUARIO)?.value;
}

/**
 * Jugador cuya sesión está abierta: la cuenta que ingresó en J04 o, sin
 * sesión, Johitan. Con `rex@ejemplo.co` (cuenta nueva, 0 pts) se ven los
 * estados vacíos de V1, J24, V3 y V4.
 */
export async function jugadorActualId() {
  const id = await usuarioDeSesion();
  return id && existePerfilJugador(id) ? id : JUGADOR_ACTUAL_ID;
}

/**
 * Organizador cuya sesión está abierta: lo mismo para el modo Organizador.
 * Con `nuevaorgcol@ejemplo.co` (sin torneos) se ve el estado vacío de V5.
 */
export async function organizadorActualId() {
  const id = await usuarioDeSesion();
  return id && existePerfilOrganizador(id) ? id : ORGANIZADOR_ACTUAL_ID;
}
