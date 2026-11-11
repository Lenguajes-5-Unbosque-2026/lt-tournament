import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { DisputaJugador } from "@/components/disputa-jugador";
import { getPartidoIncidencia } from "@/lib/mock-incidencias";
import { jugadorActualId } from "@/lib/sesion";

/**
 * Resultado en disputa (D1). `partido` es el id del partido (por ejemplo
 * par_028). Si quien mira no juega ese partido, se ve desde el lado del
 * primer jugador.
 */
async function Disputa({ params }: { params: Promise<{ id: string; partido: string }> }) {
  const { id, partido: partidoId } = await params;
  const partido = getPartidoIncidencia(partidoId);
  if (!partido || partido.torneoId !== id) notFound();
  // Sin disputa abierta no hay nada que mostrar: vuelve al bracket.
  if (partido.estado !== "en_disputa") redirect(`/torneo/${id}/bracket`);

  const yo = await jugadorActualId();
  const yoId = yo === partido.a.id || yo === partido.b.id ? yo : partido.a.id;
  return <DisputaJugador partido={partido} yoId={yoId} />;
}

export default function DisputaPage({
  params,
}: {
  params: Promise<{ id: string; partido: string }>;
}) {
  return (
    <Suspense>
      <Disputa params={params} />
    </Suspense>
  );
}
