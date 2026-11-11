"use server";

import { cookies } from "next/headers";
import type { Borrador } from "@/lib/crear-config";
import { COOKIE_USUARIO, jugadorEscrituraId, organizadorEscrituraId } from "@/lib/sesion";
import {
  crearCuentaEnSupabase,
  guardarJuegos,
  guardarMensaje,
  guardarTorneo,
  inscribir,
  registrarCheckin,
  type DatosCuenta,
} from "@/lib/supabase-escritura";

/**
 * Acciones de escritura: cada una registra en Supabase lo que hace el
 * usuario en la app. Usan la cuenta de la cookie de sesión (lib/sesion.ts).
 */

export async function inscribirseEnTorneo(torneoId: string) {
  return inscribir(torneoId, await jugadorEscrituraId(), "confirmada");
}

export async function unirseAListaDeEspera(torneoId: string) {
  return inscribir(torneoId, await jugadorEscrituraId(), "espera");
}

export async function hacerCheckinEnTorneo(torneoId: string) {
  return registrarCheckin(torneoId, await jugadorEscrituraId());
}

/** Crea la cuenta en Supabase y deja la sesión abierta con ella. */
export async function crearCuenta(datos: DatosCuenta) {
  const r = await crearCuentaEnSupabase(datos);
  if (r.ok) {
    (await cookies()).set(COOKIE_USUARIO, r.id, { path: "/", httpOnly: true, sameSite: "lax" });
  }
  return r;
}

export async function guardarJuegosDelJugador(juegos: string[]) {
  return guardarJuegos(await jugadorEscrituraId(), juegos);
}

export async function guardarTorneoDelOrganizador(
  borrador: Borrador,
  estado: "abierto" | "borrador",
) {
  return guardarTorneo(borrador, await organizadorEscrituraId(), estado);
}

/** Publica en el chat: el mensaje de un jugador o un anuncio del organizador. */
export async function enviarMensajeAlChat(
  torneoId: string,
  contenido: string,
  opciones: { organizador?: boolean; anuncio?: boolean; fijado?: boolean } = {},
) {
  return guardarMensaje({
    torneoId,
    autorId: opciones.organizador ? await organizadorEscrituraId() : await jugadorEscrituraId(),
    contenido,
    esAnuncio: opciones.anuncio ?? false,
    fijado: opciones.fijado ?? false,
  });
}
