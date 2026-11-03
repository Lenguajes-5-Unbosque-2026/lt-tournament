import { CrearInformacion } from "@/components/crear-informacion";
import { JUEGOS_SELECTOR } from "@/lib/crear-config";
import { getJuegos } from "@/lib/mock";

export default function CrearInformacionPage() {
  return <CrearInformacion juegos={getJuegos(JUEGOS_SELECTOR)} />;
}
