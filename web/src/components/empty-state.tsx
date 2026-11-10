import Link from "next/link";
import { Search, type LucideIcon } from "lucide-react";
import { Render3D } from "@/components/render-3d";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Estado vacío (.empty, design/ui kit.md §5.25). Dos variantes:
 * - `card`: recuadro de borde punteado dentro de una pantalla con contenido
 *   (ícono en ficha, título, texto y CTA opcional).
 * - `page`: pantalla entera (render 3D de unos 130 px, título, texto y CTA).
 */
export function EmptyState({
  icon: Icon,
  titulo,
  texto,
  cta,
  variant = "card",
  className,
}: {
  icon: LucideIcon;
  titulo: string;
  texto: string;
  /** Botón principal; sin él, el recuadro solo informa (V5). */
  cta?: { label: string; href: string };
  variant?: "card" | "page";
  className?: string;
}) {
  const boton = cta && (
    <Link
      href={cta.href}
      className={cn(buttonVariants(), "mt-5 w-full")}
    >
      <Search />
      {cta.label}
    </Link>
  );

  if (variant === "page") {
    return (
      <section className={cn("flex flex-col items-center text-center", className)}>
        <Render3D icon={Icon} className="size-40" />
        <h2 className="mt-8 text-h1 text-ink">{titulo}</h2>
        <p className="mt-2 text-body text-ink-2">{texto}</p>
        {boton}
      </section>
    );
  }

  return (
    <section
      className={cn(
        "flex flex-col items-center rounded-lg border-2 border-dashed border-line-strong bg-surface/60 px-5 py-6 text-center",
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-md bg-primary-soft text-primary">
        <Icon className="size-icon-nav" aria-hidden />
      </span>
      <h3 className="mt-4 text-h2 text-ink">{titulo}</h3>
      <p className="mt-2 text-small text-ink-2">{texto}</p>
      {boton}
    </section>
  );
}
