"use client";

import Link from "next/link";
import { ArrowLeftRight, CircleCheck, Flag, SkipForward } from "lucide-react";
import { toast } from "sonner";
import { BracketRounds } from "@/components/bracket-rounds";
import { useEliminacion } from "@/components/eliminacion-provider";
import { LiveMatchCard } from "@/components/live-match-card";
import { Topbar } from "@/components/topbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cuadro, jugadorPorId, porJugar } from "@/lib/eliminacion";
import { resumenReportes } from "@/lib/partido";

/** Sin pantalla ni definición todavía (spec, preguntas 6 y 17). */
function sinDefinir(que: string) {
  toast.info(`${que} aún no está definido`);
}

/**
 * Bracket (O12): el cuadro por ronda, los partidos por registrar de la ronda
 * activa con «Registrar resultado» (O13), avanzar de ronda e ir al cierre
 * del torneo (O15).
 */
export function EliminacionBracketOrg() {
  const { torneo, publicado, avanzarRonda } = useEliminacion();
  const base = `/org/torneos/${torneo.id}/bracket`;
  const rondas = cuadro(torneo);
  const activa = rondas[torneo.rondaActiva - 1];
  const siguiente = rondas[torneo.rondaActiva];
  const pendientes = activa.llaves.filter(porJugar);
  const nombre = (id: string | null) => jugadorPorId(torneo, id)?.nombre ?? "Por definir";

  function avanzar() {
    avanzarRonda();
    toast.success(`${siguiente.nombre} lista`, {
      description: "Los ganadores ya ocupan sus lugares en el cuadro.",
    });
  }

  return (
    <>
      <Topbar
        title="Bracket"
        subtitle={`${torneo.jugadores.length} jugadores · Eliminación directa`}
        fallbackHref="/org/panel"
        actions={
          <Button
            variant="glass"
            size="icon"
            aria-label="Cambiar de vista"
            onClick={() => sinDefinir("Este botón")}
          >
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

      {/* El organizador no juega: ningún partido va resaltado. */}
      <BracketRounds
        key={torneo.rondaActiva}
        rondas={rondas}
        rondaInicial={torneo.rondaActiva}
        jugador={(id) => jugadorPorId(torneo, id)}
      />

      <div className="mt-5 flex flex-col gap-3">
        {pendientes.map((l) => (
          <LiveMatchCard
            key={l.id}
            titulo={`${l.tercerPuesto ? "Tercer puesto" : `Partido ${l.orden}`} · ${nombre(l.aId)} vs ${nombre(l.bId)}`}
            etiqueta={<Badge variant="warning">Pendiente</Badge>}
            accion={
              <Link
                href={`${base}/registrar/${encodeURIComponent(l.id)}`}
                className={`${buttonVariants()} w-full`}
              >
                <Flag />
                Registrar resultado
              </Link>
            }
          >
            {resumenReportes({
              reportes: torneo.reportes.filter((r) => r.partidoId === l.id),
              aId: l.aId!,
              bId: l.bId!,
              nombre,
              fechaHora: l.fechaHora,
              siCoinciden: "Confirma para avanzar.",
            })}
          </LiveMatchCard>
        ))}
        {pendientes.length === 0 && (
          <LiveMatchCard
            titulo={siguiente ? `${activa.nombre} completa` : "Bracket completo"}
            enVivo={false}
            accion={
              !siguiente && (
                <Link href={`${base}/cierre`} className={`${buttonVariants()} w-full`}>
                  <Flag />
                  Ir al cierre del torneo
                </Link>
              )
            }
          >
            {siguiente
              ? `Avanza a ${siguiente.nombre} para registrar sus partidos.`
              : "Revisa el podio y publica los resultados."}
          </LiveMatchCard>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <Button
          variant="secondary"
          className="w-full"
          disabled={!siguiente || pendientes.length > 0 || publicado}
          onClick={avanzar}
        >
          <SkipForward />
          {siguiente ? `Avanzar a ${siguiente.nombre}` : "Es la última ronda"}
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          disabled={publicado}
          onClick={() => sinDefinir("Reordenar semillas")}
        >
          <ArrowLeftRight />
          Reordenar semillas
        </Button>
        <Link href={`${base}/cierre`} className={`${buttonVariants({ variant: "ghost" })} self-center`}>
          <Flag />
          Ir al cierre del torneo
        </Link>
      </div>

      {pendientes.length > 0 && (
        <p className="mt-4 text-center text-caption text-ink-3">
          Faltan {pendientes.length} {pendientes.length === 1 ? "resultado" : "resultados"} de{" "}
          {activa.nombre} para avanzar.
        </p>
      )}
    </>
  );
}
