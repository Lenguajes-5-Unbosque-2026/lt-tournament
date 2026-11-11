import { GitFork } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { Topbar } from "@/components/topbar";

/**
 * Bracket sin publicar (estado del UI kit «El bracket aún no se publica»): el
 * torneo existe pero todavía no tiene llaves, tablas ni partidos que mostrar.
 * Pasa con los torneos cuyo formato aún no tiene pantalla de bracket.
 */
export function BracketPendiente({ torneoId, nombre }: { torneoId: string; nombre: string }) {
  return (
    <>
      <Topbar title="Bracket" subtitle={nombre} fallbackHref={`/torneo/${torneoId}`} />
      <EmptyState
        variant="page"
        icon={GitFork}
        titulo="El bracket aún no se publica"
        texto="Cuando el organizador cierre el check-in verás aquí tus partidos y el cuadro del torneo."
        cta={{ label: "Volver al torneo", href: `/torneo/${torneoId}`, icon: "back" }}
        className="mt-10"
      />
    </>
  );
}
