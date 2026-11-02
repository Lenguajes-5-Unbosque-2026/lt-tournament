import { cn } from "@/lib/utils";

/**
 * Pasos de un flujo (.progress-steps, design/ui kit.md §5.29): N barras de
 * 4 px; las hechas y la actual en acento.
 */
export function StepProgress({
  total = 4,
  current,
}: {
  total?: number;
  /** Paso actual, desde 1. */
  current: number;
}) {
  return (
    <div
      role="progressbar"
      aria-label="Progreso"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
      className="grid auto-cols-fr grid-flow-col gap-2"
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn("h-1 rounded-full", i < current ? "bg-primary" : "bg-surface-3")}
        />
      ))}
    </div>
  );
}
