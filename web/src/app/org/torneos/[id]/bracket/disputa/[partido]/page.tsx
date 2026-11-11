import { Suspense } from "react";
import { notFound } from "next/navigation";
import { DisputaOrganizador } from "@/components/disputa-organizador";
import { getPartidoIncidencia } from "@/lib/mock-incidencias";

/** Resolver disputa (D2). El layout de /bracket ya comprueba que el torneo es del organizador. */
async function Resolver({ params }: { params: Promise<{ id: string; partido: string }> }) {
  const { id, partido: partidoId } = await params;
  const partido = getPartidoIncidencia(partidoId);
  if (!partido || partido.torneoId !== id || partido.reportes.length === 0) notFound();
  return <DisputaOrganizador partido={partido} />;
}

export default function ResolverDisputaPage({
  params,
}: {
  params: Promise<{ id: string; partido: string }>;
}) {
  return (
    <Suspense>
      <Resolver params={params} />
    </Suspense>
  );
}
