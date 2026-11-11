import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { SalaTorneo } from "@/components/sala-torneo";
import { getTorneoDetalle } from "@/lib/mock";
import { getSala } from "@/lib/mock-competir";
import { jugadorActualId } from "@/lib/sesion";

/**
 * Sala del torneo (J14). Todas las tarjetas de Mis torneos llevan aquí. Sin
 * inscripción confirmada o pendiente no hay Sala: vuelve al Detalle (J09/J12).
 * Un torneo finalizado lleva al resultado final.
 */
async function SalaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detalle = getTorneoDetalle(id);
  if (!detalle) notFound();
  if (detalle.estado === "finalizado") redirect(`/torneo/${id}/resultado`);

  const sala = getSala(id, await jugadorActualId());
  if (!sala) redirect(`/torneo/${id}`);
  return <SalaTorneo sala={sala} />;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      <SalaPage params={params} />
    </Suspense>
  );
}
