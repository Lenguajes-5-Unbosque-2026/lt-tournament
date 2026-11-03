"use client";

import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export type OptionItem = {
  value: string;
  titulo: string;
  descripcion: string;
  recomendado?: boolean;
  /** Se ve pero no se puede elegir (formatos fuera del MVP). */
  deshabilitado?: boolean;
};

/**
 * Filas de opción (.optrow, design/ui kit.md §5.8): radio a la izquierda,
 * título, descripción y, si aplica, la pill RECOMENDADO. La elegida lleva
 * borde de acento y fondo soft.
 */
export function OptionGroup({
  options,
  value,
  onValueChange,
  label,
}: {
  options: OptionItem[];
  value: string;
  onValueChange: (value: string) => void;
  label: string;
}) {
  return (
    <RadioGroup aria-label={label} value={value} onValueChange={(v) => onValueChange(v as string)}>
      {options.map((o) => (
        <label
          key={o.value}
          className={cn(
            "flex cursor-pointer items-center gap-3.5 rounded-md border border-line bg-surface px-4 py-3.5 transition-colors duration-(--dur-fast) ease-out has-data-checked:border-primary has-data-checked:bg-primary-soft",
            o.deshabilitado && "cursor-not-allowed opacity-60",
          )}
        >
          <RadioGroupItem value={o.value} disabled={o.deshabilitado} />
          <span className="min-w-0 flex-1">
            <span className="block text-strong text-ink">{o.titulo}</span>
            <span className="block text-caption text-ink-3">{o.descripcion}</span>
          </span>
          {o.recomendado && (
            <Badge variant="success" dot={false} className="rounded-sm">
              Recomendado
            </Badge>
          )}
          {o.deshabilitado && (
            <Badge variant="neutral" dot={false} className="rounded-sm">
              Pronto
            </Badge>
          )}
        </label>
      ))}
    </RadioGroup>
  );
}
