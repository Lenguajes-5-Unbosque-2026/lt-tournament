import { Badge } from "@/components/ui/badge";

/**
 * Tarjeta de acento de la partida en juego (BR · J1 «Tu partida», BR · O2):
 * título, etiqueta EN VIVO, texto y la acción principal.
 */
export function LiveMatchCard({
  titulo,
  enVivo = true,
  children,
  accion,
}: {
  titulo: string;
  enVivo?: boolean;
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
        {enVivo && (
          <Badge variant="danger" live>
            En vivo
          </Badge>
        )}
      </div>
      <div className="mt-2 text-small text-ink-2">{children}</div>
      {accion && <div className="mt-4">{accion}</div>}
    </section>
  );
}
