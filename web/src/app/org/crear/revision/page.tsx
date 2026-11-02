import { CrearRevision } from "@/components/crear-revision";
import { JUEGOS_SELECTOR } from "@/lib/crear-config";
import { getJuegos, getOrganizadorActual } from "@/lib/mock";

export default function CrearRevisionPage() {
  return <CrearRevision juegos={getJuegos(JUEGOS_SELECTOR)} organizador={getOrganizadorActual()} />;
}
