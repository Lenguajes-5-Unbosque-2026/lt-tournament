import { Suspense } from "react";
import { BRRegistrar } from "@/components/br-registrar";
import { LigaRegistrar } from "@/components/liga-registrar";
import { tipoDeBracket } from "@/lib/mock";

/**
 * Registrar resultados de una partida battle royale (BR · O3, `partido` es
 * el número de partida) o de un partido por puntos (PTS · O3, `partido` es
 * su id).
 */
async function Registrar({ params }: { params: Promise<{ id: string; partido: string }> }) {
  const { id, partido } = await params;
  return tipoDeBracket(id) === "liga" ? (
    <LigaRegistrar partidoId={partido} />
  ) : (
    <BRRegistrar numero={Number(partido)} />
  );
}

export default function RegistrarPage({
  params,
}: PageProps<"/org/torneos/[id]/bracket/registrar/[partido]">) {
  return (
    <Suspense>
      <Registrar params={params} />
    </Suspense>
  );
}
