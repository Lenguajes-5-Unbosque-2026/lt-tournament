import { Suspense } from "react";
import { AppShell } from "@/components/app-shell";
import { NotificacionesView } from "@/components/notificaciones-view";
import { getNotificaciones } from "@/lib/mock-progreso";
import { jugadorActualId } from "@/lib/sesion";

/** Notificaciones (J22): avisos del jugador agrupados por día. Lleva topbar y no navbar. */
async function Notificaciones() {
  return <NotificacionesView avisos={getNotificaciones(await jugadorActualId())} />;
}

export default function NotificacionesPage() {
  return (
    <AppShell mode="player" navbar={false}>
      <Suspense>
        <Notificaciones />
      </Suspense>
    </AppShell>
  );
}
