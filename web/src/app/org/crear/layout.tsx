import { AppShell } from "@/components/app-shell";
import { CrearTorneoProvider } from "@/components/crear-torneo-provider";
import { getOrganizadorActual } from "@/lib/mock";

// El asistente lleva topbar y no navbar; sus 4 pasos comparten el borrador.
export default function CrearLayout({ children }: { children: React.ReactNode }) {
  const { nivel } = getOrganizadorActual();
  return (
    <AppShell mode="org" navbar={false}>
      <CrearTorneoProvider nivel={nivel}>{children}</CrearTorneoProvider>
    </AppShell>
  );
}
