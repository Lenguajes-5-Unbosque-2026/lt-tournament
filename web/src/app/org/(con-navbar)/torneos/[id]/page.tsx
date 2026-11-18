import { Suspense } from "react";
import { notFound } from "next/navigation";
import { GestionResumen } from "@/components/gestion-resumen";
import { organizadorActualId } from "@/lib/sesion";
import { resumenGestion, torneoDetalle } from "@/lib/torneos-datos";

/**
 * Gestionar · Resumen (O07). Solo el organizador dueño del torneo lo ve; las
 * tarjetas del Panel y del Perfil llevan aquí.
 */
async function Resumen({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const propio = (await torneoDetalle(id))?.organizador.id === (await organizadorActualId());
  const resumen = propio ? await resumenGestion(id) : undefined;
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
