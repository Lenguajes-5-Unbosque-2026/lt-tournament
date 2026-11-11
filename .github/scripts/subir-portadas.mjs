// Sube las portadas de los juegos a Supabase Storage y pone su link público en public.juegos.
//
// Lo corre .github/workflows/portadas-supabase.yml al fusionar a main. Usa la llave de servicio
// (SUPABASE_SERVICE_ROLE_KEY), que se salta RLS: vive solo como secreto de GitHub y nunca va en
// la app. Se puede correr a mano:
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node .github/scripts/subir-portadas.mjs
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
const llave = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_BUCKET ?? "imagenes";

if (!url || !llave) {
  console.error("Faltan los secretos SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const carpeta = join(import.meta.dirname, "..", "..", "data", "mock", "imagenes");
const archivos = readdirSync(carpeta).filter((f) => /^portada-[a-z0-9]+\.jpg$/.test(f));
if (archivos.length === 0) {
  console.error(`No hay portadas en ${carpeta}.`);
  process.exit(1);
}

const cabeceras = { apikey: llave, Authorization: `Bearer ${llave}` };
let fallos = 0;

for (const archivo of archivos) {
  const juegoId = archivo.replace(/^portada-/, "").replace(/\.jpg$/, "");

  // 1. Sube (o reemplaza) la imagen en el bucket público.
  const subida = await fetch(`${url}/storage/v1/object/${BUCKET}/${archivo}`, {
    method: "POST",
    headers: { ...cabeceras, "Content-Type": "image/jpeg", "x-upsert": "true" },
    body: readFileSync(join(carpeta, archivo)),
  });
  if (!subida.ok) {
    console.error(`✗ ${archivo}: no se pudo subir (${subida.status}) ${await subida.text()}`);
    fallos++;
    continue;
  }

  // 2. Guarda el link público en el juego.
  const enlace = `${url}/storage/v1/object/public/${BUCKET}/${archivo}`;
  const cambio = await fetch(`${url}/rest/v1/juegos?id=eq.${juegoId}`, {
    method: "PATCH",
    headers: { ...cabeceras, "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify({ imagen: enlace }),
  });
  const filas = cambio.ok ? await cambio.json() : [];
  if (!cambio.ok || filas.length === 0) {
    console.error(`✗ ${archivo}: subida, pero no se actualizó el juego «${juegoId}» (${cambio.status}).`);
    fallos++;
    continue;
  }
  console.log(`✓ ${archivo} → ${enlace}`);
}

if (fallos > 0) {
  console.error(`${fallos} de ${archivos.length} portadas fallaron.`);
  process.exit(1);
}
console.log(`Listo: ${archivos.length} portadas en Supabase.`);
