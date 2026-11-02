/** Lector mínimo de CSV: comillas dobles, comas y saltos de línea dentro de comillas. */
export function parseCsv(texto: string): Record<string, string>[] {
  const filas: string[][] = [];
  let fila: string[] = [];
  let campo = "";
  let entrecomillado = false;

  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (entrecomillado) {
      if (c === '"' && texto[i + 1] === '"') {
        campo += '"';
        i++;
      } else if (c === '"') {
        entrecomillado = false;
      } else {
        campo += c;
      }
    } else if (c === '"') {
      entrecomillado = true;
    } else if (c === ",") {
      fila.push(campo);
      campo = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && texto[i + 1] === "\n") i++;
      fila.push(campo);
      campo = "";
      filas.push(fila);
      fila = [];
    } else {
      campo += c;
    }
  }
  if (campo !== "" || fila.length > 0) {
    fila.push(campo);
    filas.push(fila);
  }

  const [cabecera, ...datos] = filas;
  return datos
    .filter((f) => f.some((v) => v !== ""))
    .map((f) => Object.fromEntries(cabecera.map((h, i) => [h, f[i] ?? ""])));
}
