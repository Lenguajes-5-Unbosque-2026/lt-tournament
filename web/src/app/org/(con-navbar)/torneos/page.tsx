import { Suspense } from "react";
import { PageHead } from "@/components/page-head";
import { PanelTorneos } from "@/components/panel-torneos";
import { AHORA } from "@/lib/ahora";
import { getTorneosDelOrganizador, tipoDeBracket } from "@/lib/mock";
import { organizadorActualId } from "@/lib/sesion";
import { getTorneosDelOrganizadorSupabase } from "@/lib/supabase-torneos";

/** Torneos del organizador (O01 · «Ver todo»): todos sus torneos, en cualquier estado. */
async function ListaTorneos() {
  const organizadorId = await organizadorActualId();
  let torneos;
  try {
    torneos = await getTorneosDelOrganizadorSupabase(organizadorId);
  } catch {
    torneos = getTorneosDelOrganizador(organizadorId);
  }

  return (
    <PanelTorneos
      torneos={torneos}
      sinTorneos={torneos.length === 0}
      ahora={AHORA}
      conBracket={torneos.filter((t) => tipoDeBracket(t.id)).map((t) => t.id)}
    />
  );
}

export default function TorneosPage() {
  return (
    <>
      <PageHead title="Torneos" />
      <Suspense>
        <ListaTorneos />
      </Suspense>
    </>
  );
}
