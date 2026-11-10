import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BRBracketJugador } from "@/components/br-bracket-jugador";
import { getTorneoBR, JUGADOR_ACTUAL_ID } from "@/lib/mock";

/**
 * Bracket del torneo para el jugador. Hoy solo existe el de battle royale
 * (BR · J1); los de 1 vs 1 (J16) y por puntos (PTS · J1) son otros flujos.
 */
async function Bracket({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const torneo = getTorneoBR(id);
  if (!torneo) notFound();

  const inscrito = torneo.jugadores.some((j) => j.id === JUGADOR_ACTUAL_ID);
  return <BRBracketJugador torneo={torneo} propioId={inscrito ? JUGADOR_ACTUAL_ID : undefined} />;
}

export default function BracketPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      <Bracket params={params} />
    </Suspense>
  );
}
