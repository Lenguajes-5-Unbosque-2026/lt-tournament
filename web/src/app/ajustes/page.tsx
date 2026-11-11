import { AjustesCuenta } from "@/components/ajustes-cuenta";
import { AppShell } from "@/components/app-shell";

/** Ajustes y cuenta (J23): modo de la app, notificaciones y cuenta. */
export default function AjustesPage() {
  return (
    <AppShell mode="player" navbar={false}>
      <AjustesCuenta />
    </AppShell>
  );
}
