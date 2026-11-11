import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { EstadisticasTorneoView } from "@/components/estadisticas-torneo";
import { getTorneoDetalle } from "@/lib/mock";
import { getEstadisticasTorneo } from "@/lib/mock-organizador";
import { organizadorActualId } from "@/lib/sesion";

/**
 * Estadísticas del torneo (O16). Solo el organizador dueño de un torneo
 * finalizado las ve. Lleva topbar y no navbar.
 */
async function Estadisticas({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const propio = getTorneoDetalle(id)?.organizador.id === (await organizadorActualId());
  const estadisticas = propio ? getEstadisticasTorneo(id) : undefined;
  if (!estadisticas) notFound();
  return <EstadisticasTorneoView e={estadisticas} />;
}

export default function EstadisticasPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <AppShell mode="org" navbar={false}>
      <Suspense>
        <Estadisticas params={params} />
      </Suspense>
    </AppShell>
  );
}
