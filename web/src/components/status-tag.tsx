import { Badge } from "@/components/ui/badge";
import type { EtiquetaEstado } from "@/lib/torneo";

/** Etiquetas del torneo (§6) más las de una inscripción propia (J13). */
export type EtiquetaTarjeta = EtiquetaEstado | "confirmada" | "pendiente" | "finalizado" | "espera";

const ETIQUETAS: Record<
  EtiquetaTarjeta,
  { texto: string; variant: "success" | "accent" | "info" | "warning" | "neutral" }
> = {
  abierto: { texto: "Abierto", variant: "success" },
  en_curso: { texto: "En curso", variant: "accent" },
  lleno: { texto: "Lleno", variant: "info" },
  checkin: { texto: "Check-in", variant: "info" },
  borrador: { texto: "Borrador", variant: "warning" },
  confirmada: { texto: "Confirmada", variant: "success" },
  pendiente: { texto: "Pendiente", variant: "warning" },
  finalizado: { texto: "Finalizado", variant: "neutral" },
  espera: { texto: "En espera", variant: "info" },
};

/** Etiqueta de estado del torneo (design/ui kit.md §6). */
export function StatusTag({
  estado,
  className,
}: {
  estado: EtiquetaTarjeta;
  className?: string;
}) {
  const { texto, variant } = ETIQUETAS[estado];
  return (
    <Badge variant={variant} className={className}>
      {texto}
    </Badge>
  );
}
