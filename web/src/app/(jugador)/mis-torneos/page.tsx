import { Suspense } from "react";
import { MisTorneosView } from "@/components/mis-torneos-view";
import { AHORA } from "@/lib/ahora";
import { getMisTorneos } from "@/lib/mock";
import { jugadorActualId } from "@/lib/sesion";

async function MisTorneos() {
  // La sesión viene de una cookie: dato de la petición, por eso va en Suspense.
  const torneos = getMisTorneos(await jugadorActualId());
  return <MisTorneosView torneos={torneos} ahora={AHORA} />;
}

export default function MisTorneosPage() {
  return (
    <Suspense>
      <MisTorneos />
    </Suspense>
  );
}
