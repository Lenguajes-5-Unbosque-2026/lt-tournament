import { Suspense } from "react";
import { MisTorneosView } from "@/components/mis-torneos-view";
import { AHORA } from "@/lib/ahora";
import { getMisTorneos } from "@/lib/mock";
import { jugadorActualId } from "@/lib/sesion";
import { getMisTorneosSupabase } from "@/lib/supabase-torneos";

async function MisTorneos() {
  // La sesión viene de una cookie: dato de la petición, por eso va en Suspense.
  const jugadorId = await jugadorActualId();
  // Las inscripciones nuevas se guardan en Supabase; los datos de prueba son el respaldo.
  let torneos;
  try {
    torneos = await getMisTorneosSupabase(jugadorId);
  } catch {
    torneos = getMisTorneos(jugadorId);
  }
  return <MisTorneosView torneos={torneos} ahora={AHORA} />;
}

export default function MisTorneosPage() {
  return (
    <Suspense>
      <MisTorneos />
    </Suspense>
  );
}
