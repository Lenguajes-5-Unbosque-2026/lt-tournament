import { Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Fila de «Resultados y pruebas» (BR · J1, PTS · J1): título, detalle y, a
 * la derecha, «Ver prueba» si hay prueba o un estado en texto («En curso»,
 * «Pendiente»).
 */
export function ResultRow({
  titulo,
  detalle,
  estado,
  onVerPrueba,
  etiquetaPrueba,
}: {
  titulo: string;
  detalle: string;
  /** Texto de la derecha cuando no hay prueba. */
  estado?: string;
  onVerPrueba?: () => void;
  /** Nombre accesible del botón: «Ver prueba de la partida 2». */
  etiquetaPrueba?: string;
}) {
  return (
    <li className="flex min-h-15 items-center gap-3 rounded-md border border-line bg-surface px-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="truncate text-h3 text-ink">{titulo}</p>
        <p className="truncate text-caption text-ink-3">{detalle}</p>
      </div>
      {onVerPrueba ? (
        <Button
          variant="ghost"
          size="xs"
          className="bg-primary-soft"
          onClick={onVerPrueba}
          aria-label={etiquetaPrueba}
        >
          <ImageIcon />
          Ver prueba
        </Button>
      ) : (
        estado && <span className="shrink-0 text-caption text-ink-3">{estado}</span>
      )}
    </li>
  );
}
