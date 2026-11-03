import { Suspense } from "react";
import { ExplorarView } from "@/components/explorar-view";
import { AHORA } from "@/lib/ahora";
import { getTorneosVisibles } from "@/lib/mock";

// Chips y opciones de «Juego» de J07 y J08.
const JUEGOS_EXPLORAR = ["fc25", "valorant", "cs2", "lol"];

async function Explorar({
  searchParams,
}: {
  searchParams: Promise<{ juego?: string }>;
}) {
  // «Ver torneos similares» (J12) llega con ?juego=<id>.
  const { juego: juegoInicial } = await searchParams;
  const torneos = getTorneosVisibles();
  const juegos = JUEGOS_EXPLORAR.flatMap((id) => {
    const juego = torneos.find((t) => t.juego.id === id)?.juego;
    return juego ? [{ id: juego.id, nombre: juego.nombre }] : [];
  });

  return (
    <ExplorarView
      torneos={torneos}
      juegos={juegos}
      ahora={AHORA}
      juegosIniciales={juegoInicial ? [juegoInicial] : []}
    />
  );
}

export default function ExplorarPage({
  searchParams,
}: {
  searchParams: Promise<{ juego?: string }>;
}) {
  // searchParams es dato de la petición: con cacheComponents va dentro de Suspense.
  return (
    <Suspense>
      <Explorar searchParams={searchParams} />
    </Suspense>
  );
}
