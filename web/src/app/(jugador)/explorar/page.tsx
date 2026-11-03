import { Suspense } from "react";
import { ExplorarCargando } from "@/components/explorar-cargando";
import { ExplorarView } from "@/components/explorar-view";
import { AHORA } from "@/lib/ahora";
import { getTorneosVisibles } from "@/lib/supabase-torneos";

// Chips y opciones de «Juego» de J07 y J08.
const JUEGOS_EXPLORAR = ["fc25", "valorant", "cs2", "lol"];

async function Explorar({
  searchParams,
}: {
  searchParams: Promise<{ juego?: string }>;
}) {
  // «Ver torneos similares» (J12) llega con ?juego=<id>.
  const { juego: juegoInicial } = await searchParams;
  // Lee de Supabase (tabla torneos). Si falla, lo muestra error.tsx.
  const torneos = await getTorneosVisibles();
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
  // searchParams y la consulta son datos de la petición: con cacheComponents
  // van dentro de Suspense, que muestra el esqueleto mientras cargan.
  return (
    <Suspense fallback={<ExplorarCargando />}>
      <Explorar searchParams={searchParams} />
    </Suspense>
  );
}
