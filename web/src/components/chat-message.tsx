import { PlayerAvatar } from "@/components/player-avatar";
import { Badge } from "@/components/ui/badge";
import { formatHora } from "@/lib/format";
import type { MensajeChat } from "@/lib/competir";

/**
 * Mensaje del chat (.msg, design/componentes.md #43): ajeno (avatar, nombre y
 * burbuja gris), del organizador (con la etiqueta ORGANIZADOR) o propio
 * (burbuja de acento a la derecha, con la hora y «Leído»).
 */
export function ChatMessage({ mensaje }: { mensaje: MensajeChat }) {
  const { autor, contenido, creadoEn, esPropio } = mensaje;

  if (esPropio) {
    return (
      <li className="flex flex-col items-end">
        <p className="max-w-[80%] rounded-lg bg-primary px-4 py-3 text-body break-words text-on-primary">
          {contenido}
        </p>
        <p className="mt-1 text-caption text-ink-3">{formatHora(creadoEn)} · Leído</p>
      </li>
    );
  }

  return (
    <li className="flex items-end gap-2.5">
      <PlayerAvatar
        imagen={autor.imagen}
        color1={autor.color1}
        color2={autor.color2}
        className="mb-6 size-8"
      />
      <div className="min-w-0 max-w-[80%]">
        <p className="flex items-center gap-2 text-small text-ink-2">
          {autor.nombre}
          {autor.esOrganizador && (
            <Badge variant="accent" dot={false} className="h-5 rounded-sm">
              Organizador
            </Badge>
          )}
        </p>
        <p className="mt-1 rounded-lg bg-surface-2 px-4 py-3 text-body break-words text-ink">
          {contenido}
        </p>
        <p className="mt-1 text-caption text-ink-3">{formatHora(creadoEn)}</p>
      </div>
    </li>
  );
}
