"use client";

import { Switch } from "@/components/ui/switch";

/** Fila con título, descripción e interruptor (filtros, check-in, puntos por eliminación). */
export function SwitchRow({
  titulo,
  descripcion,
  checked,
  onCheckedChange,
}: {
  titulo: string;
  descripcion: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-md border border-line bg-surface px-4 py-3.5">
      <span>
        <span className="block text-strong text-ink">{titulo}</span>
        <span className="block text-caption text-ink-3">{descripcion}</span>
      </span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} aria-label={titulo} />
    </label>
  );
}
