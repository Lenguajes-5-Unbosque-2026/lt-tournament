"use server";

import { cookies } from "next/headers";
import { COOKIE_USUARIO } from "@/lib/sesion";

/** Cerrar sesión: borra la cookie de la cuenta (lib/sesion.ts). */
export async function cerrarSesion() {
  (await cookies()).delete(COOKIE_USUARIO);
}
