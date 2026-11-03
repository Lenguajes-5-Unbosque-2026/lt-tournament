import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { BRReportar } from "@/components/br-reportar";
import { getTorneoBR, JUGADOR_ACTUAL_ID } from "@/lib/mock";

/**
 * Reportar resultado (BR · J2). Solo lo usa un jugador inscrito y con la
 * partida en curso; si no, vuelve al bracket.
 */
async function Reportar({ params }: { params: Promise<{ id: string; numero: string }> }) {
  const { id, numero } = await params;
  const torneo = getTorneoBR(id);
  const partida = torneo?.partidas.find((p) => p.numero === Number(numero));
  if (!torneo || !partida) notFound();

  const inscrito = torneo.jugadores.some((j) => j.id === JUGADOR_ACTUAL_ID);
  if (!inscrito || partida.estado !== "en_curso") redirect(`/torneo/${id}/bracket`);

  const previo = torneo.resultados.find(
    (r) => r.partidaId === partida.id && r.jugadorId === JUGADOR_ACTUAL_ID,
  );

  return (
    <BRReportar
      torneoId={id}
      numero={partida.numero}
      jugadores={torneo.jugadores.length}
      inicial={previo ? { puesto: previo.puesto, kills: previo.kills } : null}
    />
  );
}

export default function ReportarPage({
  params,
}: {
  params: Promise<{ id: string; numero: string }>;
}) {
  return (
    <Suspense>
      <Reportar params={params} />
    </Suspense>
  );
}
