import { createClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase reutilizable. Usa la llave pública (publishable/anon):
 * solo puede hacer lo que permitan las políticas RLS (hoy, solo leer).
 * Las variables viven en web/.env.local y, en Vercel, en Environment Variables.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const llave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !llave) {
  throw new Error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en web/.env.local",
  );
}

export const supabase = createClient(url, llave, {
  // Sin login todavía: no guardar ni refrescar sesión.
  auth: { persistSession: false, autoRefreshToken: false },
});
