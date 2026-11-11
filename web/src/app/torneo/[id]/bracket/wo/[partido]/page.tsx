import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { EliminacionBracketJugador } from "@/components/eliminacion-bracket-jugador";
import { WoGanador } from "@/components/wo-ganador";
import { WoPerdedor } from "@/components/wo-perdedor";
import { ausente } from "@/lib/incidencia";
import { getTorneoEliminacion } from "@/lib/mock";
import { getPartidoIncidencia } from "@/lib/mock-incidencias";
import { jugadorActualId } from "@/lib/sesion";

/**
 * Resultado de un W.O. para el jugador: «¡Avanzas por W.O.!» (W2) si el otro
 * no se presentó, o «Perdiste por W.O.» (W3) si fue él. Si quien mira no juega
 * el partido, se ve el lado del ganador; con `?vista=perdedor` se ve el del
 * perdedor.
 */
async function ResultadoWo({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; partido: string }>;
  searchParams: Promise<{ vista?: string }>;
}) {
  const [{ id, partido: partidoId }, { vista }] = await Promise.all([params, searchParams]);
  const partido = getPartidoIncidencia(partidoId);
  if (!partido || partido.torneoId !== id) notFound();
  if (partido.estado !== "wo") redirect(`/torneo/${id}/bracket`);

  const falta = ausente(partido);
  const yo = await jugadorActualId();
  const juega = yo === partido.a.id || yo === partido.b.id;
  const pierde = juega ? yo === falta.id : vista === "perdedor";

  if (!pierde) return <WoGanador partido={partido} />;

  // W3 es un diálogo sobre el bracket (J16): si el torneo es de eliminación, se ve detrás.
  const torneo = getTorneoEliminacion(id);
  return (
    <WoPerdedor
      torneoId={id}
      ronda={partido.ronda}
      fondo={
        torneo && <EliminacionBracketJugador torneo={torneo} propioId={juega ? yo : falta.id} />
      }
    />
  );
}

export default function WoPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; partido: string }>;
  searchParams: Promise<{ vista?: string }>;
}) {
  return (
    <Suspense>
      <ResultadoWo params={params} searchParams={searchParams} />
    </Suspense>
  );
}
