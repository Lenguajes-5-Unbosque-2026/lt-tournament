import { RegistroJuegos } from "@/components/registro-juegos";
import { JUEGOS_SELECTOR } from "@/lib/crear-config";
import { getJuegos } from "@/lib/mock";

export default function RegistroJuegosPage() {
  return <RegistroJuegos juegos={getJuegos(JUEGOS_SELECTOR)} />;
}
