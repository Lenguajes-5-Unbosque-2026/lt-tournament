import { Suspense } from "react";
import { BRBracketOrg } from "@/components/br-bracket-org";
import { LigaBracketOrg } from "@/components/liga-bracket-org";
import { tipoDeBracket } from "@/lib/mock";

/** Tabla de partidas (BR · O2) o Tabla de posiciones (PTS · O2). */
async function Bracket({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return tipoDeBracket(id) === "liga" ? <LigaBracketOrg /> : <BRBracketOrg />;
}

export default function BracketOrgPage({ params }: PageProps<"/org/torneos/[id]/bracket">) {
  return (
    <Suspense>
      <Bracket params={params} />
    </Suspense>
  );
}
