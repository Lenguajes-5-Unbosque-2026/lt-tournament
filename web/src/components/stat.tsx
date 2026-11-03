import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TONOS = {
  accent: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  info: "bg-info-soft text-info",
  warning: "bg-warning-soft text-warning",
} as const;

/**
 * Stat (.stat, design/ui kit.md §5.15): ícono en una ficha soft, valor y
 * etiqueta. Se agrupa en una rejilla de 2 o 3 columnas con 10 px de gap.
 */
export function Stat({
  icon: Icon,
  value,
  label,
  tone = "accent",
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  tone?: keyof typeof TONOS;
}) {
  return (
    <div className="rounded-lg border border-line bg-surface p-3">
      <span
        className={cn("flex size-7 items-center justify-center rounded-sm", TONOS[tone])}
      >
        <Icon className="size-icon-btn-s" aria-hidden />
      </span>
      <p className="mt-3 text-h1 whitespace-nowrap text-ink">{value}</p>
      <p className="text-caption text-ink-3">{label}</p>
    </div>
  );
}
