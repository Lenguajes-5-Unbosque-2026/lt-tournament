"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Stepper (− valor +, design/ui kit.md §5.9): botones de 44 px (conflicto Z1
 * de tokens.md) y el valor en display. El «+» va relleno de acento.
 */
export function Stepper({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
}: {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  /** Nombre de lo que se cuenta, para los lectores de pantalla. */
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="secondary"
        size="icon"
        aria-label={`Disminuir ${label}`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - step))}
      >
        <Minus />
      </Button>
      <output
        aria-label={label}
        className="min-w-14 text-center font-display text-numeric-xl text-ink italic"
      >
        {value}
      </output>
      <Button
        size="icon"
        aria-label={`Aumentar ${label}`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + step))}
      >
        <Plus />
      </Button>
    </div>
  );
}
