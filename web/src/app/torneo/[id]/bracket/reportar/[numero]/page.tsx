import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { BRReportar } from "@/components/br-reportar";
import { ReportarPartido } from "@/components/reportar-partido";
import { cuadro, porJugar } from "@/lib/eliminacion";
import { cerrado } from "@/lib/liga";
import {
  getTorneoBR,
  getTorneoEliminacion,
  getTorneoLiga,
  JUGADOR_ACTUAL_ID,
} from "@/lib/mock";
import { nombreFormato } from "@/lib/torneo";
import type { Participante } from "@/lib/types";

const YO = JUGADOR_ACTUAL_ID;

/**
 * Reportar resultado. `numero` es la partida (BR · J2) o la ronda del
 * partido propio (PTS · J2 y J17). Solo lo usa un jugador con algo por
 * reportar; si no, vuelve al bracket.
 */
async function Reportar({ params }: { params: Promise<{ id: string; numero: string }> }) {
  const { id, numero } = await params;
  const n = Number(numero);
  const bracket = `/torneo/${id}/bracket`;

  const br = getTorneoBR(id);
  if (br) {
    const partida = br.partidas.find((p) => p.numero === n);
    if (!partida) notFound();
    if (!br.jugadores.some((j) => j.id === YO) || partida.estado !== "en_curso") redirect(bracket);
    const previo = br.resultados.find((r) => r.partidaId === partida.id && r.jugadorId === YO);
    return (
      <BRReportar
        torneoId={id}
        numero={partida.numero}
        jugadores={br.jugadores.length}
        inicial={previo ? { puesto: previo.puesto, kills: previo.kills } : null}
      />
    );
  }

  // Partidos de dos jugadores: liga o eliminación directa.
  let partido: { id: string; a: Participante; b: Participante; subtitulo: string } | undefined;
  let reportes: { partidoId: string; jugadorId: string; marcadorA: number; marcadorB: number }[] = [];
  let liga = false;
  let puntosVictoria = 0;

  const torneoLiga = getTorneoLiga(id);
  const torneoElim = !torneoLiga ? getTorneoEliminacion(id) : undefined;
  if (torneoLiga) {
    liga = true;
    puntosVictoria = torneoLiga.puntos.victoria;
    reportes = torneoLiga.reportes;
    const p = torneoLiga.partidos.find(
      (x) => x.ronda === n && (x.aId === YO || x.bId === YO) && !cerrado(x),
    );
    const a = torneoLiga.jugadores.find((j) => j.id === p?.aId);
    const b = torneoLiga.jugadores.find((j) => j.id === p?.bId);
    if (p && a && b) {
      partido = { id: p.id, a, b, subtitulo: `Ronda ${p.ronda} · ${nombreFormato(torneoLiga.formato)}` };
    }
  } else if (torneoElim) {
    reportes = torneoElim.reportes;
    const ronda = cuadro(torneoElim)[n - 1];
    const l =
      n === torneoElim.rondaActiva
        ? ronda?.llaves.find((x) => porJugar(x) && (x.aId === YO || x.bId === YO))
        : undefined;
    const a = torneoElim.jugadores.find((j) => j.id === l?.aId);
    const b = torneoElim.jugadores.find((j) => j.id === l?.bId);
    if (l && a && b) {
      const nombre = l.tercerPuesto ? "Tercer puesto" : ronda.nombre;
      partido = { id: l.id, a, b, subtitulo: `${nombre} · Partido ${l.orden}` };
    }
  } else {
    notFound();
  }

  if (!partido) redirect(bracket);
  const { id: partidoId, a, b, subtitulo } = partido;
  const previo = reportes.find((r) => r.partidoId === partidoId && r.jugadorId === YO);

  return (
    <ReportarPartido
      torneoId={id}
      subtitulo={subtitulo}
      a={a}
      b={b}
      inicial={previo ? { a: previo.marcadorA, b: previo.marcadorB } : null}
      detalleGanador={liga ? ` · +${puntosVictoria} pts` : undefined}
      avisoEmpate={
        liga
          ? "Los empates no se reportan aquí: los registra el organizador."
          : "En eliminación directa no hay empate: el marcador debe tener un ganador."
      }
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
