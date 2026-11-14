import { Suspense } from "react";
import { PerfilOrganizadorView } from "@/components/perfil-organizador";
import { tipoDeBracket } from "@/lib/mock";
import { getPerfilOrganizador } from "@/lib/mock-organizador";
import { organizadorPorId } from "@/lib/perfiles";
import { organizadorActualId } from "@/lib/sesion";

/** Perfil del organizador (O17). */
async function Perfil() {
  // La sesión viene de una cookie: dato de la petición, por eso va en Suspense.
  const id = await organizadorActualId();
  const perfil = getPerfilOrganizador(id, await organizadorPorId(id));
  return (
    <PerfilOrganizadorView
      perfil={perfil}
      conBracket={perfil.organizados.filter((t) => tipoDeBracket(t.id)).map((t) => t.id)}
    />
  );
}

export default function OrgPerfilPage() {
  return (
    <Suspense>
      <Perfil />
    </Suspense>
  );
}
