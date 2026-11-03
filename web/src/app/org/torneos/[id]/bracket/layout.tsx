import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { BracketBRProvider } from "@/components/bracket-br-provider";
import { getTorneoBR, getTorneoDetalle, ORGANIZADOR_ACTUAL_ID } from "@/lib/mock";

/**
 * Bracket battle royale del organizador (BR · O2, O3 y O4): llevan topbar y
 * no navbar, y comparten el estado del torneo mientras se navega entre ellas.
 */
async function ConTorneo({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  const { id } = await params;
  const torneo = getTorneoBR(id);
  // Solo el organizador dueño gestiona el bracket.
  if (!torneo || getTorneoDetalle(id)?.organizador.id !== ORGANIZADOR_ACTUAL_ID) notFound();
  return <BracketBRProvider inicial={torneo}>{children}</BracketBRProvider>;
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
