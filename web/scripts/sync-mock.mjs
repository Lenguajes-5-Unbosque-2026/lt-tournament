// Copia los datos de prueba de data/mock/ a web/ para que el deploy
// (Root Directory = web) los tenga. data/mock/ sigue siendo la fuente.
import { cpSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const origen = join(import.meta.dirname, "..", "..", "data", "mock");
const csvDestino = join(import.meta.dirname, "..", "src", "data", "mock");
const imgDestino = join(import.meta.dirname, "..", "public", "mock");

rmSync(csvDestino, { recursive: true, force: true });
rmSync(imgDestino, { recursive: true, force: true });
mkdirSync(csvDestino, { recursive: true });
mkdirSync(imgDestino, { recursive: true });

// Se saltan las copias de descarga («torneos (1).csv»).
for (const f of readdirSync(origen).filter((f) => f.endsWith(".csv") && !f.includes(" ("))) {
  cpSync(join(origen, f), join(csvDestino, f));
}
// Las pruebas y capturas de partidos 1 vs 1 todavía no se usan; las de
// battle royale sí (BR · J3 y BR · O3).
for (const f of readdirSync(join(origen, "imagenes"))) {
  if (/^(prueba|captura)-(par|rep)_/.test(f)) continue;
  cpSync(join(origen, "imagenes", f), join(imgDestino, f));
}
