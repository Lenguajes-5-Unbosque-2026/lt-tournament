import { Suspense } from "react";
import { PerfilCompetitivoView } from "@/components/perfil-competitivo";
import { getPerfilCompetitivo } from "@/lib/mock";
import { getHistorial, getLogros } from "@/lib/mock-progreso";
import { jugadorActualId } from "@/lib/sesion";

async function Perfil() {
  // La sesión viene de una cookie: dato de la petición, por eso va en Suspense.
  const id = await jugadorActualId();
  return (
    <PerfilCompetitivoView
      perfil={getPerfilCompetitivo(id)}
      logros={getLogros(id)}
      ultimos={getHistorial(id).items}
    />
  );
}

export default function PerfilPage() {
  return (
    <Suspense>
      <Perfil />
    </Suspense>
  );
}
