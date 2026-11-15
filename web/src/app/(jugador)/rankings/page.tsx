import { Suspense } from "react";
import { RankingsView } from "@/components/rankings-view";
import { getRankingGeneral } from "@/lib/mock";
import { getAmigosRanking } from "@/lib/mock-progreso";
import { jugadorPorId } from "@/lib/perfiles";
import { jugadorActualId } from "@/lib/sesion";

async function Rankings({ searchParams }: { searchParams: Promise<{ vista?: string }> }) {
  // La sesión y la vista vienen de la petición: van dentro de Suspense.
  const [yoId, { vista }] = await Promise.all([jugadorActualId(), searchParams]);

  return (
    <RankingsView
      ranking={getRankingGeneral()}
      amigos={getAmigosRanking(yoId)}
      invitacion={`lt.gg/invitar/${(await jugadorPorId(yoId)).nombreUsuario.toLowerCase()}`}
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
