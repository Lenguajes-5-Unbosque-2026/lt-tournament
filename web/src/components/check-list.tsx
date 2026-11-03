import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export type CheckItem = string | { texto: string; hecho: boolean };

/**
 * Lista con check verde (reglas del torneo, resumen de cierre). Un ítem con
 * `hecho: false` se pinta pendiente: círculo vacío y texto secundario.
 */
export function CheckList({ items }: { items: CheckItem[] }) {
  return (
    <ul className="flex flex-col gap-3.5">
      {items.map((item) => {
        const { texto, hecho } = typeof item === "string" ? { texto: item, hecho: true } : item;
        const Icon = hecho ? Check : Circle;
        return (
          <li
            key={texto}
            className={cn("flex items-start gap-3 text-body", hecho ? "text-ink" : "text-ink-3")}
          >
            <Icon
              className={cn("mt-0.5 size-icon-btn shrink-0", hecho ? "text-success" : "text-ink-3")}
              aria-hidden
            />
            <span>
              {texto}
              {!hecho && <span className="sr-only"> (pendiente)</span>}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
