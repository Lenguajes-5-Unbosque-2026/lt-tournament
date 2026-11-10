import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Etapas del torneo (Publicado → Finalizado): lista vertical con cada paso
 * hecho (check verde), actual (punto de acento y «Ahora») o pendiente.
 * `actual` es el índice del paso en curso.
 */
export function StageList({ etapas, actual }: { etapas: readonly string[]; actual: number }) {
  return (
    <ol className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-5">
      {etapas.map((etapa, i) => {
        const hecho = i < actual;
        const ahora = i === actual;
        return (
          <li
            key={etapa}
            aria-current={ahora ? "step" : undefined}
            className="flex items-center gap-4"
          >
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full border-2",
                hecho && "border-success bg-success text-bg",
                ahora && "border-primary bg-primary",
                !hecho && !ahora && "border-line-strong",
              )}
            >
              {hecho && <Check className="size-icon-chip" strokeWidth={3} aria-hidden />}
              {ahora && <span className="size-2 rounded-full bg-on-primary" />}
            </span>
            <span
              className={cn(
                "flex-1 text-strong",
                ahora ? "text-ink" : hecho ? "text-ink" : "text-ink-3",
              )}
            >
              {etapa}
            </span>
            {ahora && <span className="text-caption text-primary">Ahora</span>}
          </li>
        );
      })}
    </ol>
  );
}
