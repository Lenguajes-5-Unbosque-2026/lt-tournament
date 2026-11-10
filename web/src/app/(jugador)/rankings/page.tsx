import { Suspense } from "react";
import { RankingsView } from "@/components/rankings-view";
import { getJuegos, getJugadorActual, getRankingDeJuego } from "@/lib/mock";
import { getAmigosRanking } from "@/lib/mock-progreso";
import { jugadorActualId } from "@/lib/sesion";

// Chips de juego de V3.
const JUEGOS_RANKING = ["fc25", "valorant", "cs2"];

async function Rankings({ searchParams }: { searchParams: Promise<{ vista?: string }> }) {
  // La sesión y la vista vienen de la petición: van dentro de Suspense.
  const [yoId, { vista }] = await Promise.all([jugadorActualId(), searchParams]);
  const juegos = getJuegos(JUEGOS_RANKING).map((j) => ({ id: j.id, nombre: j.nombre }));
  const rankings = Object.fromEntries(juegos.map((j) => [j.id, getRankingDeJuego(j.id)]));

  return (
    <RankingsView
      juegos={juegos}
      rankings={rankings}
      amigos={getAmigosRanking(yoId)}
      invitacion={`lt.gg/invitar/${getJugadorActual(yoId).nombreUsuario.toLowerCase()}`}
      yoId={yoId}
      // J21 es la pestaña Amigos: /rankings?vista=amigos.
      vistaInicial={vista === "amigos" ? "amigos" : "global"}
    />
  );
}

export default function RankingsPage({
  searchParams,
}: {
  searchParams: Promise<{ vista?: string }>;
}) {
  return (
    <Suspense>
      <Rankings searchParams={searchParams} />
    </Suspense>
  );
}
