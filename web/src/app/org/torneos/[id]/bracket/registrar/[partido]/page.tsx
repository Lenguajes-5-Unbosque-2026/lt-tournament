import { Suspense } from "react";
import { BRRegistrar } from "@/components/br-registrar";
import { EliminacionRegistrar } from "@/components/eliminacion-registrar";
import { LigaRegistrar } from "@/components/liga-registrar";
import { tipoDeBracket } from "@/lib/mock";

/**
 * Registrar resultados. `partido` es el número de partida (BR · O3) o el id
 * del partido (PTS · O3 y O13).
 */
async function Registrar({ params }: { params: Promise<{ id: string; partido: string }> }) {
  const { id, partido } = await params;
  const clave = decodeURIComponent(partido);
  const tipo = tipoDeBracket(id);
  if (tipo === "liga") return <LigaRegistrar partidoId={clave} />;
  if (tipo === "eliminacion") return <EliminacionRegistrar llaveId={clave} />;
  return <BRRegistrar numero={Number(clave)} />;
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
