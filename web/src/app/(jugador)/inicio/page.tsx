import { FeaturedTournamentCard } from "@/components/featured-tournament-card";
import { GreetingHeader } from "@/components/greeting-header";
import { NextTournamentCard } from "@/components/next-tournament-card";
import { ParaTi } from "@/components/para-ti";
import { AHORA } from "@/lib/ahora";
import {
  getJugadorActual,
  getProximoTorneo,
  getTorneoDestacado,
  getTorneosVisibles,
} from "@/lib/mock";

// Chips de juego de J06 (design/flujos/jugador-descubrir-e-inscribirse).
const JUEGOS_INICIO = ["fc25", "valorant", "fortnite"];

export default function InicioPage() {
  const jugador = getJugadorActual();
  const torneos = getTorneosVisibles();
  const proximo = getProximoTorneo(torneos);
  const destacado = getTorneoDestacado(torneos.filter((t) => t.id !== proximo?.torneo.id));

  const juegos = JUEGOS_INICIO.flatMap((id) => {
    const juego = torneos.find((t) => t.juego.id === id)?.juego;
    return juego ? [{ id: juego.id, nombre: juego.nombre }] : [];
  });
  const paraTi = torneos.filter((t) => t.id !== destacado?.id);

  return (
    <>
      <GreetingHeader jugador={jugador} />

      {proximo && (
        <section className="mt-5">
          <h1 className="font-display text-display-l text-ink uppercase italic">
            Tu próximo torneo
          </h1>
          <div className="mt-4">
            <NextTournamentCard
              torneo={proximo.torneo}
              faltanSegundos={proximo.faltanSegundos}
              checkinAbierto={proximo.checkinAbierto}
              ahora={AHORA}
            />
          </div>
        </section>
      )}

      {destacado && (
        <div className="mt-4">
          <FeaturedTournamentCard torneo={destacado} ahora={AHORA} />
        </div>
      )}

      <ParaTi torneos={paraTi} juegos={juegos} ahora={AHORA} />
    </>
  );
}
