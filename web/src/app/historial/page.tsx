import { Suspense } from "react";
import { AppShell } from "@/components/app-shell";
import { HistorialView } from "@/components/historial-view";
import { getHistorial } from "@/lib/mock-progreso";
import { jugadorActualId } from "@/lib/sesion";

/** Historial competitivo (J19): todos los torneos terminados del jugador. Topbar, sin navbar. */
async function Historial() {
  return <HistorialView historial={getHistorial(await jugadorActualId())} />;
}

export default function HistorialPage() {
  return (
    <AppShell mode="player" navbar={false}>
      <Suspense>
        <Historial />
      </Suspense>
    </AppShell>
  );
}
