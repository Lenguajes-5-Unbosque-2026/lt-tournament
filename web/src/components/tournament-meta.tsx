import { Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatFechaHora } from "@/lib/format";
import type { Torneo } from "@/lib/types";

/** Metadatos de una tarjeta de torneo: fecha y cupos (.meta, 12/16 en text-3). */
export function TournamentMeta({
  torneo,
  ahora,
  className,
}: {
  torneo: Torneo;
  ahora: string;
  className?: string;
}) {
  return (
    <p className={cn("flex items-center gap-4 text-caption text-ink-3", className)}>
      <span className="flex items-center gap-1.5">
        <Calendar className="size-icon-meta" aria-hidden />
        {formatFechaHora(torneo.fechaInicio, ahora)}
      </span>
      <span className="flex items-center gap-1.5">
        <Users className="size-icon-meta" aria-hidden />
        {torneo.inscritos}/{torneo.cupos}
      </span>
    </p>
  );
}
