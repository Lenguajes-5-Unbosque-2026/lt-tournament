"use server";

import { cookies } from "next/headers";
import { getUsuarioPorCorreo } from "@/lib/mock";
import { COOKIE_USUARIO } from "@/lib/sesion";
import { getSupabase } from "@/lib/supabase";

export type ResultadoIngreso =
  | { error: string; campo: "correo" | "contrasena" }
  | { destino: string };

type Cuenta = { id: string; modo: "jugador" | "organizador" };

/**
 * Busca la cuenta por correo: primero en los datos de prueba y, si no está,
 * en Supabase (las cuentas que se crean en la app, J03, viven ahí).
 */
async function buscarCuenta(correo: string): Promise<Cuenta | undefined | "error"> {
  const prueba = getUsuarioPorCorreo(correo);
  if (prueba) return prueba;

  try {
    const { data, error } = await getSupabase()
      .from("usuarios")
      .select("id, modo_actual")
      .ilike("correo", correo.trim())
      .maybeSingle();
    if (error) return "error";
    return data ? { id: data.id, modo: data.modo_actual } : undefined;
  } catch {
    return "error";
  }
}

/**
 * Ingresar (J04). Comprueba que el correo tenga cuenta; la contraseña todavía
 * no se verifica, porque no se guarda en ningún sitio hasta que el login pase a
 * Supabase Auth. Guarda la cuenta en una cookie (lib/sesion.ts) y entra al modo
 * con el que quedó la última vez (`modo_actual`).
 */
export async function iniciarSesion(
  correo: string,
  contrasena: string,
): Promise<ResultadoIngreso> {
  if (contrasena === "") return { error: "Escribe tu contraseña.", campo: "contrasena" };

  const cuenta = await buscarCuenta(correo);
  if (cuenta === "error") {
    return { error: "No pudimos conectar con el servidor. Intenta de nuevo.", campo: "correo" };
  }
  if (!cuenta) {
    return { error: "No encontramos una cuenta con ese correo.", campo: "correo" };
  }

  (await cookies()).set(COOKIE_USUARIO, cuenta.id, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });
  return { destino: cuenta.modo === "organizador" ? "/org/panel" : "/inicio" };
}
