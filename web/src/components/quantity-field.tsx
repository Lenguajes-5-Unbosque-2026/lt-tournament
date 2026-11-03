"use client";

import { useState } from "react";
import { ChipGroup } from "@/components/chip";
import { Stepper } from "@/components/stepper";
import { cn } from "@/lib/utils";

const OTRO = "otro";

/**
 * Campo de cantidad del paso 2 (O03, O03b, EvE · O1b, BR · O1b): título y
 * ayuda, stepper − / +, chips de cantidades rápidas y «Otro», que abre el
 * campo «Cantidad personalizada» con su rango.
 *
 * `limite` es el tope del nivel del organizador: los atajos por encima quedan
 * bloqueados y el rango se recorta.
 */
export function QuantityField({
  titulo,
  ayuda,
  value,
  onChange,
  min,
  max,
  limite = max,
  atajos,
  sufijoAtajo = "",
  unidad,
  pista,
}: {
  titulo: string;
  ayuda: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  limite?: number;
  atajos: readonly number[];
  /** Texto después de cada atajo: «’» en los minutos. */
  sufijoAtajo?: string;
  /** Unidad que acompaña la cantidad personalizada («jugadores»). */
  unidad?: string;
  /** Explicación del rango bajo el campo personalizado. */
  pista?: string;
}) {
  const tope = Math.min(max, limite);
  const [otroForzado, setOtroForzado] = useState(false);
  // Texto mientras se escribe: puede estar vacío o fuera de rango sin tocar el valor.
  const [escrito, setEscrito] = useState<string | null>(null);

  const otro = otroForzado || !atajos.includes(value);
  const activo = otro ? OTRO : String(value);
  const fueraDeRango = escrito !== null && !esValido(escrito, min, tope);

  function elegir(v: string[]) {
    const elegido = v.find((x) => x !== activo);
    if (!elegido) return;
    if (elegido === OTRO) {
      setOtroForzado(true);
    } else {
      setOtroForzado(false);
      setEscrito(null);
      onChange(Number(elegido));
    }
  }

  function escribir(texto: string) {
    setEscrito(texto);
    if (esValido(texto, min, tope)) onChange(Number(texto));
  }

  return (
    <section className="rounded-lg border border-line bg-surface p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-strong text-ink">{titulo}</h3>
          <p className="mt-0.5 text-caption text-ink-3">{ayuda}</p>
        </div>
        <Stepper
          label={titulo}
          value={value}
          min={min}
          max={tope}
          onChange={(v) => {
            setEscrito(null);
            onChange(v);
          }}
        />
      </div>

      <ChipGroup
        label={`${titulo}: cantidades rápidas`}
        className="mt-4"
        options={[
          ...atajos.map((a) => ({
            value: String(a),
            label: `${a}${sufijoAtajo}`,
            disabled: a > tope,
          })),
          { value: OTRO, label: "Otro" },
        ]}
        value={[activo]}
        onValueChange={elegir}
      />

      {otro && (
        <div className="mt-4">
          <label className="block text-label text-ink-2" htmlFor={`${titulo}-otro`}>
            Cantidad personalizada
          </label>
          <div
            className={cn(
              "mt-2 flex min-h-13 items-center gap-2 rounded-md border bg-surface-2 px-4 focus-within:ring-1",
              fueraDeRango
                ? "border-danger ring-danger"
                : "border-primary ring-primary",
            )}
          >
            <input
              id={`${titulo}-otro`}
              type="number"
              inputMode="numeric"
              min={min}
              max={tope}
              value={escrito ?? String(value)}
              aria-invalid={fueraDeRango}
              onChange={(e) => escribir(e.target.value)}
              onBlur={() => setEscrito(null)}
              className="w-full min-w-0 bg-transparent text-body text-ink outline-none"
            />
            {unidad && <span className="shrink-0 text-body text-ink-2">{unidad}</span>}
          </div>
          {pista && (
            <p className={cn("mt-2 text-caption", fueraDeRango ? "text-danger" : "text-ink-3")}>
              {pista}
              {limite < max && ` En tu nivel, hasta ${limite}.`}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function esValido(texto: string, min: number, max: number) {
  const n = Number(texto);
  return texto.trim() !== "" && Number.isInteger(n) && n >= min && n <= max;
}
