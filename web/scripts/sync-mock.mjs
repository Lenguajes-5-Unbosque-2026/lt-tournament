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

for (const f of readdirSync(origen).filter((f) => f.endsWith(".csv"))) {
  cpSync(join(origen, f), join(csvDestino, f));
}
// Las pruebas y capturas de resultado no se usan en estas pantallas.
for (const f of readdirSync(join(origen, "imagenes"))) {
  if (/^(prueba|captura)-/.test(f)) continue;
  cpSync(join(origen, "imagenes", f), join(imgDestino, f));
}
