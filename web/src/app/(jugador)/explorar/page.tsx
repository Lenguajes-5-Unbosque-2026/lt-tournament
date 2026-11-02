import { ExplorarView } from "@/components/explorar-view";
import { AHORA } from "@/lib/ahora";
import { getTorneosVisibles } from "@/lib/mock";

// Chips y opciones de «Juego» de J07 y J08.
const JUEGOS_EXPLORAR = ["fc25", "valorant", "cs2", "lol"];

export default function ExplorarPage() {
  const torneos = getTorneosVisibles();
  const juegos = JUEGOS_EXPLORAR.flatMap((id) => {
    const juego = torneos.find((t) => t.juego.id === id)?.juego;
    return juego ? [{ id: juego.id, nombre: juego.nombre }] : [];
  });

  return <ExplorarView torneos={torneos} juegos={juegos} ahora={AHORA} />;
}
