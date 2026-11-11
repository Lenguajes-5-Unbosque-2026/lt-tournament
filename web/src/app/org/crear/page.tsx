import { Suspense } from "react";
import { CrearInformacion } from "@/components/crear-informacion";
import { JUEGOS_SELECTOR } from "@/lib/crear-config";
import { getJuegos } from "@/lib/mock";
import { getBorradorDeTorneo } from "@/lib/mock-organizador";

/**
 * Paso 1 del asistente (O02). Con `?similar=<torneo>` («Crear torneo
 * similar», O16) arranca con los datos de ese torneo copiados.
 */
async function Informacion({ searchParams }: { searchParams: Promise<{ similar?: string }> }) {
  const { similar } = await searchParams;
  return (
    <CrearInformacion
      juegos={getJuegos(JUEGOS_SELECTOR)}
      copia={similar ? getBorradorDeTorneo(similar) : undefined}
    />
  );
}

export default function CrearInformacionPage({
  searchParams,
}: {
  searchParams: Promise<{ similar?: string }>;
}) {
  return (
    <Suspense>
      <Informacion searchParams={searchParams} />
    </Suspense>
  );
}
