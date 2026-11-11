import { Suspense } from "react";
import { Calendar } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { FeaturedTournamentCard } from "@/components/featured-tournament-card";
import { GreetingHeader } from "@/components/greeting-header";
import { NextTournamentCard } from "@/components/next-tournament-card";
import { ParaTi } from "@/components/para-ti";
import { AHORA } from "@/lib/ahora";
import {
  getProximoTorneo,
  getTorneoDestacado,
  getTorneosVisibles,
} from "@/lib/mock";
import { jugadorPorId } from "@/lib/perfiles";
import { jugadorActualId } from "@/lib/sesion";

// Chips de juego de J06 (design/flujos/jugador-descubrir-e-inscribirse).
const JUEGOS_INICIO = ["fc25", "valorant", "fortnite"];

async function Inicio() {
  // La sesión viene de una cookie: dato de la petición, por eso va en Suspense.
  const jugadorId = await jugadorActualId();
  const jugador = await jugadorPorId(jugadorId);
  const torneos = getTorneosVisibles();
  const proximo = getProximoTorneo(torneos, jugadorId);
  const destacado = getTorneoDestacado(torneos.filter((t) => t.id !== proximo?.torneo.id));

  const juegos = JUEGOS_INICIO.flatMap((id) => {
    const juego = torneos.find((t) => t.juego.id === id)?.juego;
    return juego ? [{ id: juego.id, nombre: juego.nombre }] : [];
  });
  const paraTi = torneos.filter((t) => t.id !== destacado?.id);

  return (
    <>
      <GreetingHeader jugador={jugador} />

      <section className="mt-5">
        <h1 className="font-display text-display-l text-ink uppercase italic">
          Tu próximo torneo
        </h1>
        <div className="mt-4">
          {proximo ? (
            <NextTournamentCard
              torneo={proximo.torneo}
              faltanSegundos={proximo.faltanSegundos}
              checkinAbierto={proximo.checkinAbierto}
              ahora={AHORA}
            />
          ) : (
            // V1: sin torneo próximo ni en curso (aunque tenga finalizados).
            <EmptyState
              icon={Calendar}
              titulo="Aún no tienes torneos"
              texto="Inscríbete en uno de los recomendados y aquí verás tu check-in, chat y bracket."
              cta={{ label: "Explorar torneos", href: "/explorar" }}
            />
          )}
        </div>
      </section>

      {destacado && (
        <div className="mt-4">
          <FeaturedTournamentCard torneo={destacado} ahora={AHORA} />
        </div>
      )}

      <ParaTi torneos={paraTi} juegos={juegos} ahora={AHORA} />
    </>
  );
}

export default function InicioPage() {
  return (
    <Suspense>
      <Inicio />
    </Suspense>
  );
}
