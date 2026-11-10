import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { ResultadoFinal } from "@/components/resultado-final";
import { getTorneoDetalle } from "@/lib/mock";
import { getResultadoFinal } from "@/lib/mock-competir";
import { jugadorActualId } from "@/lib/sesion";

/**
 * Resultado final (F1). Solo lo ven los tres primeros de un torneo
 * finalizado; el resto ve su resultado en el historial, así que vuelve al
 * bracket.
 */
async function ResultadoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getTorneoDetalle(id)) notFound();
  const resultado = getResultadoFinal(id, await jugadorActualId());
  if (!resultado) redirect(`/torneo/${id}/bracket`);
  return <ResultadoFinal resultado={resultado} />;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      <ResultadoPage params={params} />
    </Suspense>
  );
}
