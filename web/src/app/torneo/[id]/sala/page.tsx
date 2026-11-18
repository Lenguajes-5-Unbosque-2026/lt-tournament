import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { SalaTorneo } from "@/components/sala-torneo";
import { jugadorActualId } from "@/lib/sesion";
import { salaDelJugador, torneoDetalle } from "@/lib/torneos-datos";

/**
 * Sala del torneo (J14). Todas las tarjetas de Mis torneos llevan aquí. Sin
 * inscripción confirmada o pendiente no hay Sala: vuelve al Detalle (J09/J12).
 * Un torneo finalizado lleva al resultado final.
 */
async function SalaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detalle = await torneoDetalle(id);
  if (!detalle) notFound();
  if (detalle.estado === "finalizado") redirect(`/torneo/${id}/resultado`);

  const sala = await salaDelJugador(id, await jugadorActualId());
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
