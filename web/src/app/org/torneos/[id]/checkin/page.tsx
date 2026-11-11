import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { CheckinEnVivo } from "@/components/checkin-en-vivo";
import { getTorneoDetalle } from "@/lib/mock";
import { getInscritosGestion, getResumenGestion } from "@/lib/mock-gestion";
import { organizadorActualId } from "@/lib/sesion";

/** Check-in en vivo (O11). Solo el dueño del torneo. Topbar, sin navbar. */
async function Checkin({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const propio = getTorneoDetalle(id)?.organizador.id === (await organizadorActualId());
  const resumen = propio ? getResumenGestion(id) : undefined;
  const lista = propio ? getInscritosGestion(id) : undefined;
  if (!resumen || !lista) notFound();

  return (
    <CheckinEnVivo
      torneoId={id}
      torneoNombre={resumen.nombre}
      fechaInicio={resumen.fechaInicio}
      minutosAntes={resumen.minutosAntes}
      jugadores={lista.inscritos.filter((j) => j.estado !== "espera")}
      conBracket={resumen.conBracket}
    />
  );
}

export default function CheckinPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <AppShell mode="org" navbar={false}>
      <Suspense>
        <Checkin params={params} />
      </Suspense>
    </AppShell>
  );
}
