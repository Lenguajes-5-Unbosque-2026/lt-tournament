import { Suspense } from "react";
import { RankingsView } from "@/components/rankings-view";
import { getAmigosIds, getJuegos, getRankingDeJuego } from "@/lib/mock";
import { jugadorActualId } from "@/lib/sesion";

// Chips de juego de V3.
const JUEGOS_RANKING = ["fc25", "valorant", "cs2"];

async function Rankings() {
  // La sesión viene de una cookie: dato de la petición, por eso va en Suspense.
  const yoId = await jugadorActualId();
  const juegos = getJuegos(JUEGOS_RANKING).map((j) => ({ id: j.id, nombre: j.nombre }));
  const rankings = Object.fromEntries(juegos.map((j) => [j.id, getRankingDeJuego(j.id)]));

  return <RankingsView juegos={juegos} rankings={rankings} amigos={getAmigosIds(yoId)} yoId={yoId} />;
}

export default function RankingsPage() {
  return (
    <Suspense>
      <Rankings />
    </Suspense>
  );
}
