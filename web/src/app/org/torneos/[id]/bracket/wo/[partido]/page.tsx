import { Suspense } from "react";
import { notFound } from "next/navigation";
import { WoOrganizador } from "@/components/wo-organizador";
import { getPartidoIncidencia } from "@/lib/mock-incidencias";

/** Resolver partido por W.O. (W1). El layout de /bracket ya comprueba que el torneo es del organizador. */
async function ResolverWo({ params }: { params: Promise<{ id: string; partido: string }> }) {
  const { id, partido: partidoId } = await params;
  const partido = getPartidoIncidencia(partidoId);
  if (!partido || partido.torneoId !== id) notFound();
  return <WoOrganizador partido={partido} />;
}

export default function ResolverWoPage({
  params,
}: {
  params: Promise<{ id: string; partido: string }>;
}) {
  return (
    <Suspense>
      <ResolverWo params={params} />
    </Suspense>
  );
}
