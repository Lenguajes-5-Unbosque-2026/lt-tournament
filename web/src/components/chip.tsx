"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { cn } from "@/lib/utils";

export type ChipOption = { value: string; label: string };

/**
 * Chips de filtro (.chip, design/ui kit.md §5.4). Con `multiple` se
 * pueden marcar varios; si no, uno solo y, al desmarcarlo, ninguno.
 * `value` es siempre un arreglo de las opciones marcadas.
 */
export function ChipGroup({
  options,
  value,
  onValueChange,
  multiple = false,
  label,
  className,
}: {
  options: ChipOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  multiple?: boolean;
  label: string;
  className?: string;
}) {
  return (
    <ToggleGroup
      aria-label={label}
      multiple={multiple}
      value={value}
      onValueChange={onValueChange}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {options.map((o) => (
        <Toggle
          key={o.value}
          value={o.value}
          className="h-9 rounded-full border border-line bg-surface-2 px-4 text-label text-ink-2 transition-colors duration-(--dur-fast) ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring data-pressed:border-primary data-pressed:bg-primary data-pressed:font-semibold data-pressed:text-on-primary"
        >
          {o.label}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
