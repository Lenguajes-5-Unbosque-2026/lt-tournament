import { AppShell } from "@/components/app-shell";

// Detalle del torneo y su inscripción: pantallas con topbar, sin navbar.
export default function TorneoLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell mode="player" navbar={false}>
      {children}
    </AppShell>
  );
}
