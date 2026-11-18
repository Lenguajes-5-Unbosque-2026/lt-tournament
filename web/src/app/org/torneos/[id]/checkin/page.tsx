import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { CheckinEnVivo } from "@/components/checkin-en-vivo";
import { inscritosGestion, resumenGestion, torneoDetalle } from "@/lib/torneos-datos";
import { organizadorActualId } from "@/lib/sesion";

/** Check-in en vivo (O11). Solo el dueño del torneo. Topbar, sin navbar. */
async function Checkin({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const propio = (await torneoDetalle(id))?.organizador.id === (await organizadorActualId());
  const resumen = propio ? await resumenGestion(id) : undefined;
  const lista = propio ? await inscritosGestion(id) : undefined;
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
