import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, GitFork, MessageCircle, Ticket } from "lucide-react";
import { KeyValueList } from "@/components/key-value-list";
import { Render3D } from "@/components/render-3d";
import { Topbar } from "@/components/topbar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { formatDia, formatFechaUtc, formatHora } from "@/lib/format";
import { getInscripcionPropia, getTorneoDetalle } from "@/lib/mock";

const DOS_HORAS_MS = 2 * 3600_000;

/** Inscripción confirmada (J11): «¡ESTÁS DENTRO!» y los accesos a chat y bracket. */
async function InscripcionConfirmada({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const torneo = getTorneoDetalle(id);
  if (!torneo) notFound();

  const propia = getInscripcionPropia(id);
  // Sin inscripción previa, el seed es el orden de llegada: el siguiente cupo.
  const seed = propia?.seed ?? torneo.inscritos + 1;

  const inicio = new Date(torneo.fechaInicio).getTime();
  const calendario = new URLSearchParams({
    action: "TEMPLATE",
    text: torneo.nombre,
    dates: `${formatFechaUtc(torneo.fechaInicio)}/${formatFechaUtc(new Date(inicio + DOS_HORAS_MS).toISOString())}`,
    location: torneo.ciudad,
  });

  return (
    <>
      <Topbar title="Inscripción" leading="close" fallbackHref={`/torneo/${id}`} />

      <Render3D icon={Ticket} className="mt-8" />

      <h2 className="mt-8 text-center font-display text-display-l text-ink uppercase italic">
        ¡Estás dentro!
      </h2>
      <p className="mt-3 text-center text-body text-ink-2">
        Tu cupo en la {torneo.nombre} quedó confirmado. Te avisaremos cuando abra el
        check-in.
      </p>

      <KeyValueList
        className="mt-6"
        rows={[
          { label: "Fecha", value: formatDia(torneo.fechaInicio) },
          { label: "Hora", value: formatHora(torneo.fechaInicio) },
          { label: "Seed", value: `#${seed}` },
          { label: "Estado", value: <Badge variant="success">Confirmada</Badge> },
        ]}
      />

      <div className="mt-4 flex flex-col gap-3">
        <Link
          href={`/torneo/${id}/chat`}
          className={`${buttonVariants()} w-full`}
        >
          <MessageCircle />
          Ir al chat del torneo
        </Link>
        <Link
          href={`/torneo/${id}/bracket`}
          className={`${buttonVariants({ variant: "secondary" })} w-full`}
        >
          <GitFork />
          Ver bracket
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

export default function InscripcionConfirmadaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense>
      <InscripcionConfirmada params={params} />
    </Suspense>
  );
}
