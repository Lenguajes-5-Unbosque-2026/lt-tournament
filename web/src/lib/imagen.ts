/**
 * Fuente de una imagen: si ya es una URL (Supabase Storage) se usa tal cual;
 * si es un nombre de archivo (datos de prueba), sale de public/mock/.
 */
export function srcImagen(imagen: string): string {
  return /^https?:\/\//.test(imagen) ? imagen : `/mock/${imagen}`;
}

/** Juegos que tienen portada en public/mock/portada-<id>.jpg. */
const JUEGOS_CON_PORTADA = new Set([
  "clash",
  "cs2",
  "fc25",
  "fortnite",
  "freefire",
  "lol",
  "minecraft",
  "rocket",
  "smash",
  "valorant",
]);

/**
 * Portada de un juego. Si hay archivo local para ese id se usa siempre: no
 * depende de lo que haya guardado la columna juegos.imagen en Supabase (que
 * puede apuntar a una imagen vieja o equivocada). Sin archivo local, cae en lo
 * guardado en la base y, si tampoco hay, en el degradado con la abreviatura.
 */
export function portadaDeJuego(juegoId: string, imagenGuardada?: string | null): string {
  if (JUEGOS_CON_PORTADA.has(juegoId)) return `portada-${juegoId}.jpg`;
  return imagenGuardada ?? "";
}
