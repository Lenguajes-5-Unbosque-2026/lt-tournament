"use client";

import { Checkbox } from "@/components/ui/checkbox";

/** Fila de check (.checkrow): casilla con su texto; todo el renglón es tocable. */
export function CheckRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex min-h-touch cursor-pointer items-center gap-3.5">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <span className="text-body text-ink">{label}</span>
    </label>
  );
}
