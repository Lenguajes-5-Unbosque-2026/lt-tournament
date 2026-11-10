import { Suspense } from "react";
import { PerfilCompetitivoView } from "@/components/perfil-competitivo";
import { getPerfilCompetitivo } from "@/lib/mock";
import { jugadorActualId } from "@/lib/sesion";

async function Perfil() {
  // La sesión viene de una cookie: dato de la petición, por eso va en Suspense.
  return <PerfilCompetitivoView perfil={getPerfilCompetitivo(await jugadorActualId())} />;
}

export default function PerfilPage() {
  return (
    <Suspense>
      <Perfil />
    </Suspense>
  );
}
