import { Suspense } from "react";
import { BRBracketOrg } from "@/components/br-bracket-org";
import { EliminacionBracketOrg } from "@/components/eliminacion-bracket-org";
import { LigaBracketOrg } from "@/components/liga-bracket-org";
import { tipoDeBracket } from "@/lib/mock";

/** Bracket del organizador: BR · O2, PTS · O2 u O12 (1 vs 1). */
async function Bracket({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tipo = tipoDeBracket(id);
  if (tipo === "liga") return <LigaBracketOrg />;
  if (tipo === "eliminacion") return <EliminacionBracketOrg />;
  return <BRBracketOrg />;
}

export default function BracketOrgPage({ params }: PageProps<"/org/torneos/[id]/bracket">) {
  return (
    <Suspense>
      <Bracket params={params} />
    </Suspense>
  );
}
