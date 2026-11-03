"use client";

import Link from "next/link";
import { ArrowLeftRight, CircleCheck, Flag, Shuffle, SkipForward } from "lucide-react";
import { toast } from "sonner";
import { EtiquetaPartido } from "@/components/liga-bracket-jugador";
import { useLiga } from "@/components/liga-provider";
import { LigaStandings } from "@/components/liga-standings";
import { LiveMatchCard } from "@/components/live-match-card";
import { Topbar } from "@/components/topbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  cerrado,
  jugadorPorId,
  partidosDeRonda,
  rondaActual,
  type PartidoLiga,
  type TorneoLiga,
} from "@/lib/liga";
import { resumenReportes } from "@/lib/partido";
import { nombreFormato } from "@/lib/torneo";

function situacion(t: TorneoLiga, p: PartidoLiga) {
  return resumenReportes({
    reportes: t.reportes.filter((r) => r.partidoId === p.id),
    aId: p.aId,
    bId: p.bId,
    nombre: (id) => jugadorPorId(t, id)?.nombre ?? "—",
    fechaHora: p.fechaHora,
    siCoinciden: "Confirma para sumar los puntos a la tabla.",
  });
}

/** «Ver jugadores» (botón de intercambio) no tiene pantalla todavía (spec, pregunta 19). */
function intercambioPendiente() {
  toast.info("Esta vista aún no tiene pantalla");
}

/**
 * Tabla de posiciones (PTS · O2): la tabla, los partidos sin registrar de la
 * ronda actual con «Registrar resultado», avanzar de ronda, volver a sortear
 * los emparejamientos e ir al cierre (PTS · O4).
 */
export function LigaBracketOrg() {
  const { torneo, publicado, avanzarRonda, regenerarEmparejamientos } = useLiga();
  const base = `/org/torneos/${torneo.id}/bracket`;
  const actual = rondaActual(torneo);
  const deRonda = partidosDeRonda(torneo, actual);
  const pendientes = deRonda.filter((p) => !cerrado(p));
  const hayUltima = actual >= torneo.totalRondas;
  // Solo se re-sortea una ronda sin resultados registrados (spec, pregunta 7).
  const puedeSortear = actual > 0 && !deRonda.some(cerrado) && !publicado;

  function avanzar() {
    avanzarRonda();
    toast.success(`Ronda ${actual + 1} lista`, { description: "Los emparejamientos se generaron solos." });
  }

  function sortear() {
    regenerarEmparejamientos();
    toast.success(`Emparejamientos de la Ronda ${actual} sorteados de nuevo`);
  }

  return (
    <>
      <Topbar
        title="Bracket"
        subtitle={`${torneo.jugadores.length} participantes · ${nombreFormato(torneo.formato)}`}
        fallbackHref="/org/panel"
        actions={
          <Button variant="glass" size="icon" aria-label="Cambiar de vista" onClick={intercambioPendiente}>
            <ArrowLeftRight />
          </Button>
        }
      />

      {publicado && (
        <Alert variant="success" className="mt-4">
          <CircleCheck aria-hidden />
          <AlertTitle>Resultados publicados</AlertTitle>
          <AlertDescription>El torneo quedó cerrado.</AlertDescription>
        </Alert>
      )}

      {/* El organizador no juega: ninguna fila va resaltada. */}
      <LigaStandings torneo={torneo} />

      <div className="mt-5 flex flex-col gap-3">
        {pendientes.map((p) => (
          <LiveMatchCard
            key={p.id}
            titulo={`Ronda ${p.ronda} · ${jugadorPorId(torneo, p.aId)?.nombre} vs ${jugadorPorId(torneo, p.bId)?.nombre}`}
            etiqueta={<EtiquetaPartido estado={p.estado} />}
            accion={
              <Link href={`${base}/registrar/${p.id}`} className={`${buttonVariants()} w-full`}>
                <Flag />
                Registrar resultado
              </Link>
            }
          >
            {situacion(torneo, p)}
          </LiveMatchCard>
        ))}
        {pendientes.length === 0 && (
          <LiveMatchCard
            titulo={hayUltima ? "Todas las rondas registradas" : `Ronda ${actual} completa`}
            enVivo={false}
            accion={
              hayUltima && (
                <Link href={`${base}/cierre`} className={`${buttonVariants()} w-full`}>
                  <Flag />
                  Ir al cierre del torneo
                </Link>
              )
            }
          >
            {hayUltima ? "Revisa el podio y publica los resultados." : "Avanza a la siguiente ronda."}
          </LiveMatchCard>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <Button
          variant="secondary"
          className="w-full"
          disabled={pendientes.length > 0 || hayUltima || publicado}
          onClick={avanzar}
        >
          <SkipForward />
          {hayUltima ? "Es la última ronda" : `Avanzar a Ronda ${actual + 1}`}
        </Button>
        <Button variant="secondary" className="w-full" disabled={!puedeSortear} onClick={sortear}>
          <Shuffle />
          Generar emparejamientos
        </Button>
        <Link href={`${base}/cierre`} className={`${buttonVariants({ variant: "ghost" })} self-center`}>
          <Flag />
          Ir al cierre del torneo
        </Link>
      </div>

      {pendientes.length > 0 && (
        <p className="mt-4 text-center text-caption text-ink-3">
          Faltan {pendientes.length} {pendientes.length === 1 ? "resultado" : "resultados"} de la Ronda{" "}
          {actual} para avanzar.
        </p>
      )}
    </>
  );
}
