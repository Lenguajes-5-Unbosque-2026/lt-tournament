import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BracketPendiente } from "@/components/bracket-pendiente";
import { BRBracketJugador } from "@/components/br-bracket-jugador";
import { EliminacionBracketJugador } from "@/components/eliminacion-bracket-jugador";
import { LigaBracketJugador } from "@/components/liga-bracket-jugador";
import {
  getTorneoBR,
  getTorneoDetalle,
  getTorneoEliminacion,
  getTorneoLiga,
  JUGADOR_ACTUAL_ID,
} from "@/lib/mock";

/**
 * Bracket del torneo para el jugador: battle royale (BR · J1), por puntos
 * (PTS · J1) o eliminación directa 1 vs 1 (J16).
 */
async function Bracket({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const propio = (jugadores: { id: string }[]) =>
    jugadores.some((j) => j.id === JUGADOR_ACTUAL_ID) ? JUGADOR_ACTUAL_ID : undefined;

  const br = getTorneoBR(id);
  if (br) return <BRBracketJugador torneo={br} propioId={propio(br.jugadores)} />;
  const liga = getTorneoLiga(id);
  if (liga) return <LigaBracketJugador torneo={liga} propioId={propio(liga.jugadores)} />;
  const eliminacion = getTorneoEliminacion(id);
  if (eliminacion) {
    return (
      <EliminacionBracketJugador torneo={eliminacion} propioId={propio(eliminacion.jugadores)} />
    );
  }
  // Torneo sin pantalla de bracket (por equipos, doble eliminación, récord de
  // puntos…) o sin publicar: se explica en lugar de mostrar un 404.
  const detalle = getTorneoDetalle(id);
  if (!detalle) notFound();
  return <BracketPendiente torneoId={id} nombre={detalle.nombre} />;
}

export default function BracketPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      <Bracket params={params} />
    </Suspense>
  );
}
