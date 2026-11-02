"use client";

import { RANGO_PUNTOS_RESULTADO } from "@/lib/crear-config";
import { cn } from "@/lib/utils";

type Valores = { victoria: number; empate: number; derrota: number };

const CASILLAS: { clave: keyof Valores; label: string }[] = [
  { clave: "victoria", label: "Victoria" },
  { clave: "empate", label: "Empate" },
  { clave: "derrota", label: "Derrota" },
];

/**
 * Editor de puntos por resultado (Victoria · Empate · Derrota): tres casillas
 * con un número editable. Son puntos de la tabla del torneo, no de ranking.
 */
export function ResultPointsEditor({
  value,
  onChange,
}: {
  value: Valores;
  onChange: (value: Valores) => void;
}) {
  return (
    <section className="rounded-lg border border-line bg-surface p-4">
      <h3 className="text-strong text-ink">Puntos por resultado</h3>
      <p className="mt-0.5 text-caption text-ink-3">
        Editables · se suman en la tabla de posiciones
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {CASILLAS.map(({ clave, label }) => (
          <label
            key={clave}
            className="flex flex-col items-center gap-1 rounded-md bg-surface-2 py-3 focus-within:ring-2 focus-within:ring-primary"
          >
            <input
              type="number"
              inputMode="numeric"
              min={RANGO_PUNTOS_RESULTADO.min}
              max={RANGO_PUNTOS_RESULTADO.max}
              value={value[clave]}
              aria-label={`Puntos por ${label.toLowerCase()}`}
              onChange={(e) => {
                const n = Math.trunc(Number(e.target.value));
                if (
                  e.target.value !== "" &&
                  n >= RANGO_PUNTOS_RESULTADO.min &&
                  n <= RANGO_PUNTOS_RESULTADO.max
                ) {
                  onChange({ ...value, [clave]: n });
                }
              }}
              className={cn(
                "w-full bg-transparent text-center font-display text-display-l italic outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none",
                clave === "victoria" ? "text-primary" : "text-ink",
              )}
            />
            <span className="text-caption text-ink-2">{label}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
