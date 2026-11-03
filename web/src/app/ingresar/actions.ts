"use server";

import { getUsuarioPorCorreo } from "@/lib/mock";

export type ResultadoIngreso =
  | { error: string; campo: "correo" | "contrasena" }
  | { destino: string };

/**
 * Ingresar (J04). Los datos de prueba no guardan contraseñas, así que por
 * ahora solo se comprueba que el correo tenga cuenta; la contraseña se
 * valida cuando el login pase a Supabase. Entra al modo con el que la cuenta
 * quedó la última vez (data/mock/usuarios.csv, `modo_actual`).
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
  return { destino: usuario.modo === "organizador" ? "/org/panel" : "/inicio" };
}
