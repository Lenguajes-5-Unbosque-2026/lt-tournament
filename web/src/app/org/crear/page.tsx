import { CrearInformacion } from "@/components/crear-informacion";
import { getJuegos } from "@/lib/mock";

// Juegos del selector del paso 1 (O02).
const JUEGOS_CREAR = ["fc25", "valorant", "cs2", "lol", "fortnite", "rocket"];

export default function CrearInformacionPage() {
  return <CrearInformacion juegos={getJuegos(JUEGOS_CREAR)} />;
}
