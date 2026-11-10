import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase reutilizable. Usa la llave pública (publishable/anon):
 * solo puede hacer lo que permitan las políticas RLS (hoy, solo leer).
 * Las variables viven en web/.env.local y, en Vercel, en Environment Variables
 * (marcadas para Production, Preview y Development).
 *
 * El cliente se crea la primera vez que se usa, no al importar el módulo:
 * si las variables faltan, el `next build` no debe caerse al recolectar las
 * páginas. El error aparece al consultar y lo atrapa el error.tsx de la ruta.
 */
let cliente: SupabaseClient | undefined;

export function getSupabase(): SupabaseClient {
  if (cliente) return cliente;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const llave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !llave) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY (web/.env.local o Environment Variables de Vercel)",
    );
  }

  cliente = createClient(url, llave, {
    // Sin login todavía: no guardar ni refrescar sesión.
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cliente;
}
