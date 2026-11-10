import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { CancelarTorneo } from "@/components/cancelar-torneo";
import { getTorneoDetalle } from "@/lib/mock";
import { organizadorActualId } from "@/lib/sesion";

/**
 * Cancelar torneo (O18). Solo el dueño, y solo antes de generar el bracket:
 * con el torneo abierto o con el check-in abierto.
 */
async function Cancelar({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const torneo = getTorneoDetalle(id);
  if (!torneo || torneo.organizador.id !== (await organizadorActualId())) notFound();
  if (torneo.estado !== "abierto" && torneo.estado !== "checkin") redirect("/org/panel");

  return (
    <CancelarTorneo
      torneo={{
        id,
        nombre: torneo.nombre,
        fechaInicio: torneo.fechaInicio,
        inscritos: torneo.inscritos,
        cupos: torneo.cupos,
      }}
    />
  );
}

export default function CancelarPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <AppShell mode="org" navbar={false}>
      <Suspense>
        <Cancelar params={params} />
      </Suspense>
    </AppShell>
  );
}
