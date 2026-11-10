import { Suspense } from "react";
import { BRCierre } from "@/components/br-cierre";
import { EliminacionCierre } from "@/components/eliminacion-cierre";
import { LigaCierre } from "@/components/liga-cierre";
import { tipoDeBracket } from "@/lib/mock";

/** Cierre y podio: BR · O4, PTS · O4 u O15 (1 vs 1). */
async function Cierre({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tipo = tipoDeBracket(id);
  if (tipo === "liga") return <LigaCierre />;
  if (tipo === "eliminacion") return <EliminacionCierre />;
  return <BRCierre />;
}

export default function CierrePage({ params }: PageProps<"/org/torneos/[id]/bracket/cierre">) {
  return (
    <Suspense>
      <Cierre params={params} />
    </Suspense>
  );
}
