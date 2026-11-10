import { Suspense } from "react";
import { BRCierre } from "@/components/br-cierre";
import { LigaCierre } from "@/components/liga-cierre";
import { tipoDeBracket } from "@/lib/mock";

/** Cierre y podio (BR · O4 o PTS · O4). */
async function Cierre({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return tipoDeBracket(id) === "liga" ? <LigaCierre /> : <BRCierre />;
}

export default function CierrePage({ params }: PageProps<"/org/torneos/[id]/bracket/cierre">) {
  return (
    <Suspense>
      <Cierre params={params} />
    </Suspense>
  );
}
