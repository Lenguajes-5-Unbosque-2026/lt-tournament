import { Badge } from "@/components/ui/badge";
import type { EtiquetaEstado } from "@/lib/torneo";

const ETIQUETAS: Record<
  EtiquetaEstado,
  { texto: string; variant: "success" | "accent" | "info" }
> = {
  abierto: { texto: "Abierto", variant: "success" },
  en_curso: { texto: "En curso", variant: "accent" },
  lleno: { texto: "Lleno", variant: "info" },
  checkin: { texto: "Check-in", variant: "info" },
};

/** Etiqueta de estado del torneo (design/ui kit.md §6). */
export function StatusTag({
  estado,
  className,
}: {
  estado: EtiquetaEstado;
  className?: string;
}) {
  const { texto, variant } = ETIQUETAS[estado];
  return (
    <Badge variant={variant} className={className}>
      {texto}
    </Badge>
  );
}
