import { Check } from "lucide-react";

/** Lista con check verde (reglas del torneo, resumen de cierre). */
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-body text-ink">
          <Check className="mt-0.5 size-icon-btn shrink-0 text-success" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}
