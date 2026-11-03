import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BRBracketJugador } from "@/components/br-bracket-jugador";
import { LigaBracketJugador } from "@/components/liga-bracket-jugador";
import { getTorneoBR, getTorneoLiga, JUGADOR_ACTUAL_ID } from "@/lib/mock";

/**
 * Bracket del torneo para el jugador: battle royale (BR · J1) o por puntos
 * (PTS · J1). El de eliminación directa (J16) es otro flujo.
 */
async function Bracket({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const br = getTorneoBR(id);
  if (br) {
    const inscrito = br.jugadores.some((j) => j.id === JUGADOR_ACTUAL_ID);
    return <BRBracketJugador torneo={br} propioId={inscrito ? JUGADOR_ACTUAL_ID : undefined} />;
  }

  const liga = getTorneoLiga(id);
  if (liga) {
    const inscrito = liga.jugadores.some((j) => j.id === JUGADOR_ACTUAL_ID);
    return <LigaBracketJugador torneo={liga} propioId={inscrito ? JUGADOR_ACTUAL_ID : undefined} />;
  }

  notFound();
}

export default function BracketPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      <Bracket params={params} />
    </Suspense>
  );
}
