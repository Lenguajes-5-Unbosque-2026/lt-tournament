import { Suspense } from "react";
import { notFound } from "next/navigation";
import { GestionResumen } from "@/components/gestion-resumen";
import { getTorneoDetalle } from "@/lib/mock";
import { getResumenGestion } from "@/lib/mock-gestion";
import { organizadorActualId } from "@/lib/sesion";

/**
 * Gestionar · Resumen (O07). Solo el organizador dueño del torneo lo ve; las
 * tarjetas del Panel y del Perfil llevan aquí.
 */
async function Resumen({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const propio = getTorneoDetalle(id)?.organizador.id === (await organizadorActualId());
  const resumen = propio ? getResumenGestion(id) : undefined;
  if (!resumen) notFound();
  return <GestionResumen r={resumen} />;
}

export default function ResumenPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      <Resumen params={params} />
    </Suspense>
  );
}
