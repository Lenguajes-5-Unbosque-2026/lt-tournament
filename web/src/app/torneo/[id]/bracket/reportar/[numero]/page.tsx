import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { BRReportar } from "@/components/br-reportar";
import { LigaReportar } from "@/components/liga-reportar";
import { cerrado } from "@/lib/liga";
import { getTorneoBR, getTorneoLiga, JUGADOR_ACTUAL_ID } from "@/lib/mock";
import { nombreFormato } from "@/lib/torneo";

/**
 * Reportar resultado. `numero` es la partida (BR · J2) o la ronda del
 * partido propio (PTS · J2). Solo lo usa un jugador inscrito con algo por
 * reportar; si no, vuelve al bracket.
 */
async function Reportar({ params }: { params: Promise<{ id: string; numero: string }> }) {
  const { id, numero } = await params;
  const bracket = `/torneo/${id}/bracket`;

  const br = getTorneoBR(id);
  if (br) {
    const partida = br.partidas.find((p) => p.numero === Number(numero));
    if (!partida) notFound();
    const inscrito = br.jugadores.some((j) => j.id === JUGADOR_ACTUAL_ID);
    if (!inscrito || partida.estado !== "en_curso") redirect(bracket);
    const previo = br.resultados.find(
      (r) => r.partidaId === partida.id && r.jugadorId === JUGADOR_ACTUAL_ID,
    );
    return (
      <BRReportar
        torneoId={id}
        numero={partida.numero}
        jugadores={br.jugadores.length}
        inicial={previo ? { puesto: previo.puesto, kills: previo.kills } : null}
      />
    );
  }

  const liga = getTorneoLiga(id);
  if (!liga) notFound();
  const partido = liga.partidos.find(
    (p) =>
      p.ronda === Number(numero) && (p.aId === JUGADOR_ACTUAL_ID || p.bId === JUGADOR_ACTUAL_ID),
  );
  if (!partido || cerrado(partido)) redirect(bracket);
  const a = liga.jugadores.find((j) => j.id === partido.aId);
  const b = liga.jugadores.find((j) => j.id === partido.bId);
  if (!a || !b) notFound();
  const previo = liga.reportes.find(
    (r) => r.partidoId === partido.id && r.jugadorId === JUGADOR_ACTUAL_ID,
  );
  return (
    <LigaReportar
      torneoId={id}
      ronda={partido.ronda}
      formato={nombreFormato(liga.formato)}
      a={a}
      b={b}
      puntosVictoria={liga.puntos.victoria}
      inicial={previo ? { a: previo.marcadorA, b: previo.marcadorB } : null}
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
