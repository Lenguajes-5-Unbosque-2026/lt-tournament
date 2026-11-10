/**
 * «Ahora» fijo: los datos de prueba son de octubre de 2026 y con el
 * reloj real todos los torneos aparecerían como pasados. Se quita al
 * conectar Supabase.
 *
 * Son las 5:47 pm del 24 de octubre: faltan 42 min 18 s para que cierre el
 * check-in de la Copa Relámpago Bogotá (6:30 pm), como en J14.
 */
export const AHORA = "2026-10-24T17:47:42-05:00";
