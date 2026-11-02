/** «Copa Relámpago Bogotá» → «copa-relampago-bogota», cortado en una palabra completa. */
export function slugDeNombre(nombre: string, maximo = 28) {
  const slug = nombre
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (slug.length <= maximo) return slug;
  const corte = slug.slice(0, maximo);
  return corte.slice(0, Math.max(corte.lastIndexOf("-"), 1));
}
