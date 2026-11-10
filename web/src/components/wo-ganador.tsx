import Link from "next/link";
import { Calendar, GitFork, MessageCircle, Ticket } from "lucide-react";
import { KeyValueList } from "@/components/key-value-list";
import { Render3D } from "@/components/render-3d";
import { Topbar } from "@/components/topbar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { formatDia, formatFechaUtc, formatHora } from "@/lib/format";
import { ausente, type PartidoIncidencia } from "@/lib/incidencia";

const DOS_HORAS_MS = 2 * 3600_000;

/** ¡Avanzas por W.O.! (W2): el ganador pasa a la siguiente ronda sin jugar. */
export function WoGanador({ partido }: { partido: PartidoIncidencia }) {
  const bracket = `/torneo/${partido.torneoId}/bracket`;
  const falta = ausente(partido);
  const siguiente = partido.siguienteRonda;
  const proximo = partido.siguienteFechaHora;
  const inicio = new Date(proximo ?? partido.fechaHora).getTime();

  const calendario = new URLSearchParams({
    action: "TEMPLATE",
    text: `${partido.torneoNombre} · ${siguiente ?? partido.ronda}`,
    dates: `${formatFechaUtc(new Date(inicio).toISOString())}/${formatFechaUtc(new Date(inicio + DOS_HORAS_MS).toISOString())}`,
  });

  return (
    <>
      <Topbar
        title={partido.torneoNombre}
        leading="close"
        fallbackHref={bracket}
      />

      <Render3D icon={Ticket} className="mt-8" />

      <h2 className="mt-8 text-center font-display text-display-l text-ink uppercase italic">
        ¡Avanzas por W.O.!
      </h2>
      <p className="mt-3 text-center text-body text-ink-2">
        {falta.nombre} no hizo check-in a tiempo.{" "}
        {siguiente ? `Pasas a ${siguiente} sin jugar` : "Ganas este partido sin jugar"}
        {proximo
          ? `; tu siguiente partido es a las ${formatHora(proximo)}.`
          : "; te avisaremos cuando se programe tu siguiente partido."}
      </p>

      <KeyValueList
        className="mt-6"
        rows={[
          { label: "Fecha", value: formatDia(partido.fechaHora) },
          { label: "Hora", value: formatHora(partido.fechaHora) },
          { label: "Ronda", value: siguiente ?? partido.ronda },
          { label: "Estado", value: <Badge variant="success">Confirmada</Badge> },
        ]}
      />

      <div className="mt-4 flex flex-col gap-3">
        <Link href={bracket} className={`${buttonVariants()} w-full`}>
          <GitFork />
          Ver bracket
        </Link>
        <Link
          href={`/torneo/${partido.torneoId}/chat`}
          className={`${buttonVariants({ variant: "secondary" })} w-full`}
        >
          <MessageCircle />
          Ir al chat del torneo
        </Link>
        <a
          href={`https://calendar.google.com/calendar/render?${calendario}`}
          target="_blank"
          rel="noreferrer"
          className={`${buttonVariants({ variant: "ghost", size: "sm" })} self-center`}
        >
          <Calendar />
          Agregar al calendario
        </a>
      </div>
    </>
  );
}
