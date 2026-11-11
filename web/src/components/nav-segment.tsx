import Link from "next/link";
import { cn } from "@/lib/utils";

export type NavSegmentItem = {
  label: string;
  /** Sin destino, la pestaña se ve apagada. */
  href?: string;
  active?: boolean;
};

/**
 * Segmento de navegación (.segment, design/ui kit.md §5.5) hecho de enlaces:
 * las pestañas de gestión del torneo (Resumen · Inscritos · Bracket · Result.)
 * llevan cada una a su pantalla.
 */
export function NavSegment({ items, label }: { items: NavSegmentItem[]; label: string }) {
  return (
    <nav
      aria-label={label}
      className="grid auto-cols-fr grid-flow-col rounded-md border border-line bg-surface p-1.25"
    >
      {items.map((i) => {
        const clases = cn(
          "flex h-9 items-center justify-center rounded-sm text-label transition-colors duration-(--dur-fast) ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring",
          i.active ? "bg-primary font-semibold text-on-primary" : "text-ink-2",
          !i.href && !i.active && "text-disabled-text",
        );
        return i.href && !i.active ? (
          <Link key={i.label} href={i.href} className={clases}>
            {i.label}
          </Link>
        ) : (
          <span key={i.label} aria-current={i.active ? "page" : undefined} className={clases}>
            {i.label}
          </span>
        );
      })}
    </nav>
  );
}
