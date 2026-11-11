"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { GameMultiPicker } from "@/components/game-multi-picker";
import { useRegistro } from "@/components/registro-provider";
import { Topbar } from "@/components/topbar";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Juego } from "@/lib/types";

/** Onboarding · Tus juegos (J02): paso 2 de 2 del registro del jugador. */
export function RegistroJuegos({ juegos }: { juegos: Juego[] }) {
  const router = useRouter();
  const { datos, actualizar } = useRegistro();
  const elegidos = datos.juegos.length;

  return (
    <AppShell mode="player" navbar={false}>
      <Topbar title="Tus juegos" fallbackHref="/registro" />

      <h2 className="mt-4 font-display text-display-l text-ink uppercase italic">
        ¿Qué juegas?
      </h2>
      <p className="mt-3 text-body text-ink-2">
        Elige al menos uno. Te mostraremos torneos y rankings de esos juegos.
      </p>

      <div className="mt-5">
        <GameMultiPicker
          label="Tus juegos"
          juegos={juegos}
          value={datos.juegos}
          onValueChange={(ids) => actualizar({ juegos: ids })}
        />
      </div>

      <p className="mt-4 text-small text-primary" aria-live="polite">
        {elegidos === 0
          ? "Elige al menos un juego"
          : `${elegidos} ${elegidos === 1 ? "seleccionado" : "seleccionados"}`}
      </p>

      <div className="mt-4 flex flex-col gap-1">
        <Button className="w-full" disabled={elegidos === 0} onClick={() => router.push("/inicio")}>
          Continuar
        </Button>
        <Link href="/inicio" className={`${buttonVariants({ variant: "ghost" })} self-center`}>
          Omitir por ahora
        </Link>
      </div>
    </AppShell>
  );
}
