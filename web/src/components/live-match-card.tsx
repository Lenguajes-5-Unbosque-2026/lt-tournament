import { Badge } from "@/components/ui/badge";

/**
 * Tarjeta de acento de la partida o el partido en juego (BR · J1 «Tu
 * partida», BR · O2, PTS · J1 «Tu partido», PTS · O2): título, etiqueta de
 * estado, texto y la acción principal. `etiqueta` reemplaza a EN VIVO
 * (PENDIENTE, EN DISPUTA…).
 */
export function LiveMatchCard({
  titulo,
  enVivo = true,
  etiqueta,
  children,
  accion,
}: {
  titulo: string;
  enVivo?: boolean;
  etiqueta?: React.ReactNode;
  children: React.ReactNode;
  accion?: React.ReactNode;
}) {
  return (
    <section
      aria-label={titulo}
      className="rounded-lg border border-primary-line bg-linear-to-b from-primary/10 to-primary/2 p-4"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-h2 text-ink">{titulo}</h2>
        {etiqueta ?? (enVivo && (
          <Badge variant="danger" live>
            En vivo
          </Badge>
        ))}
      </div>
      <div className="mt-2 text-small text-ink-2">{children}</div>
      {accion && <div className="mt-4">{accion}</div>}
    </section>
  );
}
