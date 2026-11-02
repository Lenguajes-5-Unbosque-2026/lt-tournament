import { AppShell } from "@/components/app-shell";
import { SplashScreen } from "@/components/splash-screen";

/** Splash (J00): pantalla de carga al abrir la app; después va a Bienvenida (J01). */
export default function SplashPage() {
  return (
    <AppShell mode="player" navbar={false}>
      <SplashScreen destino="/bienvenida" />
    </AppShell>
  );
}
