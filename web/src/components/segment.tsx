"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { cn } from "@/lib/utils";

export type SegmentOption = { value: string; label: string };

/**
 * Segmento (.segment, design/ui kit.md §5.5): una sola opción activa,
 * o ninguna si se vuelve a tocar la activa.
 */
export function Segment({
  options,
  value,
  onValueChange,
  label,
  className,
}: {
  options: SegmentOption[];
  value: string | null;
  onValueChange: (value: string | null) => void;
  label: string;
  className?: string;
}) {
  return (
    <ToggleGroup
      aria-label={label}
      value={value ? [value] : []}
      onValueChange={(v) => onValueChange(v[0] ?? null)}
      className={cn(
        "grid auto-cols-fr grid-flow-col rounded-md border border-line bg-surface p-1.25",
        className,
      )}
    >
      {options.map((o) => (
        <Toggle
          key={o.value}
          value={o.value}
          className="h-9 rounded-sm text-label text-ink-2 transition-colors duration-(--dur-fast) ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring data-pressed:bg-primary data-pressed:font-semibold data-pressed:text-on-primary"
        >
          {o.label}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
