import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { GestionInscritos } from "@/components/gestion-inscritos";
import { getTorneoDetalle } from "@/lib/mock";
import { getInscritosGestion } from "@/lib/mock-gestion";
import { organizadorActualId } from "@/lib/sesion";

/** Gestionar · Inscritos (O08), con las acciones por jugador (O09) y la expulsión (O10). Topbar, sin navbar. */
async function Inscritos({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const propio = getTorneoDetalle(id)?.organizador.id === (await organizadorActualId());
  const lista = propio ? getInscritosGestion(id) : undefined;
  if (!lista) notFound();
  return <GestionInscritos lista={lista} />;
}

export default function InscritosPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <AppShell mode="org" navbar={false}>
      <Suspense>
        <Inscritos params={params} />
      </Suspense>
    </AppShell>
  );
}
