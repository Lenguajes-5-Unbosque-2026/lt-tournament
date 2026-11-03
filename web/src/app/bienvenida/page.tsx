import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Render3D } from "@/components/render-3d";
import { buttonVariants } from "@/components/ui/button";

/** Bienvenida (J01): presentación del producto y los dos accesos. */
export default function BienvenidaPage() {
  return (
    <AppShell mode="player" navbar={false}>
      <div className="flex min-h-[calc(100dvh-var(--spacing)*14)] flex-col justify-end">
        <Render3D icon={Gamepad2} className="mb-10 size-56" />

        <h1 className="font-display text-display-l text-ink uppercase italic">
          Compite.
          <br />
          Organiza.
          <br />
          <span className="text-primary">Sube de nivel.</span>
        </h1>
        <p className="mt-4 text-body text-ink-2">
          Encuentra torneos amateur de tus juegos, inscríbete gratis y sigue tu progreso en un
          solo lugar.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link href="/registro" className={`${buttonVariants()} w-full`}>
            Crear cuenta
          </Link>
          <Link href="/ingresar" className={`${buttonVariants({ variant: "secondary" })} w-full`}>
            Ya tengo cuenta
          </Link>
        </div>
        <p className="mt-4 text-center text-caption text-ink-3">
          Al continuar aceptas los Términos y la Política de privacidad.
        </p>
      </div>
    </AppShell>
  );
}
