"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogoLt } from "@/components/logo-lt";
import { Progress } from "@/components/ui/progress";

const DURACION_MS = 1800;
const PASO_MS = 60;

/**
 * Splash (J00): logo, nombre, lema y una barra de carga corta. Al llenarse
 * pasa a Bienvenida (J01). Todavía no revisa si hay sesión iniciada.
 */
export function SplashScreen({ destino }: { destino: string }) {
  const router = useRouter();
  const [avance, setAvance] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setAvance((a) => Math.min(100, a + (100 * PASO_MS) / DURACION_MS)), PASO_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (avance >= 100) router.replace(destino);
  }, [avance, destino, router]);

  return (
    <div className="flex min-h-[calc(100dvh-var(--spacing)*14)] flex-col items-center justify-center text-center">
      <LogoLt />
      <h1 className="mt-6 font-display text-display-l text-ink uppercase italic">
        LTournaments
      </h1>
      <p className="mt-2 text-small text-ink-2">Compite. Organiza. Sube de nivel.</p>
      <Progress value={avance} aria-label="Cargando" className="mt-8 w-30" />
    </div>
  );
}
