import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { BracketBRProvider } from "@/components/bracket-br-provider";
import { EliminacionProvider } from "@/components/eliminacion-provider";
import { LigaProvider } from "@/components/liga-provider";
import {
  getTorneoBR,
  getTorneoDetalle,
  getTorneoEliminacion,
  getTorneoLiga,
  ORGANIZADOR_ACTUAL_ID,
} from "@/lib/mock";

/**
 * Bracket del organizador: battle royale (BR · O2 a O4), por puntos
 * (PTS · O2 a O4) o eliminación directa 1 vs 1 (O12, O13 y O15). Llevan topbar y no navbar, y comparten el estado del
 * torneo mientras se navega entre ellas.
 */
async function ConTorneo({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  const { id } = await params;
  // Solo el organizador dueño gestiona el bracket.
  if (getTorneoDetalle(id)?.organizador.id !== ORGANIZADOR_ACTUAL_ID) notFound();

  const br = getTorneoBR(id);
  if (br) return <BracketBRProvider inicial={br}>{children}</BracketBRProvider>;
  const liga = getTorneoLiga(id);
  if (liga) return <LigaProvider inicial={liga}>{children}</LigaProvider>;
  const eliminacion = getTorneoEliminacion(id);
  if (eliminacion) {
    return <EliminacionProvider inicial={eliminacion}>{children}</EliminacionProvider>;
  }
  notFound();
}

export default function BracketOrgLayout({
  params,
  children,
}: LayoutProps<"/org/torneos/[id]/bracket">) {
  return (
    <AppShell mode="org" navbar={false}>
      <Suspense>
        <ConTorneo params={params}>{children}</ConTorneo>
      </Suspense>
    </AppShell>
  );
}
