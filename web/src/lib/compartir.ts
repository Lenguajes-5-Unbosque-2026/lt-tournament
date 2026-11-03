import { toast } from "sonner";

/** Copia el enlace al portapapeles y avisa con un toast. */
export async function copiarEnlace(url: string) {
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Enlace copiado");
  } catch {
    toast.error("No se pudo copiar el enlace");
  }
}

/** Compartir: la hoja nativa del celular y, si no existe, copia el enlace. */
export async function compartirEnlace(titulo: string, url: string) {
  try {
    if (navigator.share) await navigator.share({ title: titulo, url });
    else await copiarEnlace(url);
  } catch {
    // El usuario cerró la hoja de compartir: no es un error.
  }
}
