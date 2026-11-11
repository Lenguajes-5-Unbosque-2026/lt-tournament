"use server";

import { cookies } from "next/headers";
import { getUsuarioPorCorreo } from "@/lib/mock";
import { COOKIE_USUARIO } from "@/lib/sesion";

export type ResultadoIngreso =
  | { error: string; campo: "correo" | "contrasena" }
  | { destino: string };

/**
 * Ingresar (J04). Los datos de prueba no guardan contraseñas, así que por
 * ahora solo se comprueba que el correo tenga cuenta; la contraseña se
 * valida cuando el login pase a Supabase. Guarda la cuenta en una cookie
 * (lib/sesion.ts) y entra al modo con el que quedó la última vez
 * (data/mock/usuarios.csv, `modo_actual`).
 */
export async function iniciarSesion(
  correo: string,
  contrasena: string,
): Promise<ResultadoIngreso> {
  if (contrasena === "") return { error: "Escribe tu contraseña.", campo: "contrasena" };
  const usuario = getUsuarioPorCorreo(correo);
  if (!usuario) {
    return { error: "No encontramos una cuenta con ese correo.", campo: "correo" };
  }
  (await cookies()).set(COOKIE_USUARIO, usuario.id, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });
  return { destino: usuario.modo === "organizador" ? "/org/panel" : "/inicio" };
}
