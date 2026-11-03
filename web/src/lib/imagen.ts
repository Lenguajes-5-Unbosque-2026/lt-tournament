/**
 * Fuente de una imagen: si ya es una URL (Supabase Storage) se usa tal cual;
 * si es un nombre de archivo (datos de prueba), sale de public/mock/.
 */
export function srcImagen(imagen: string): string {
  return /^https?:\/\//.test(imagen) ? imagen : `/mock/${imagen}`;
}
