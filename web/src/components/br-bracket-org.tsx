"use client";

import Link from "next/link";
import { ArrowLeftRight, CircleCheck, Flag, Play } from "lucide-react";
import { toast } from "sonner";
import { useBracketBR } from "@/components/bracket-br-provider";
import { BRStandings } from "@/components/br-standings";
import { LiveMatchCard } from "@/components/live-match-card";
import { Topbar } from "@/components/topbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { AHORA } from "@/lib/ahora";
import { nombreLobby, partidaEnCurso, segundosRestantes } from "@/lib/battle-royale";
import { nombreFormato } from "@/lib/torneo";
import type { Formato } from "@/lib/types";

function mmss(segundos: number) {
  return `${Math.floor(segundos / 60)}:${String(segundos % 60).padStart(2, "0")}`;
}

/** «Ver jugadores y lobbies» no tiene pantalla todavía (spec, preguntas 8 y 9). */
function lobbiesPendiente() {
  toast.info("Jugadores y lobbies aún no tiene pantalla");
}

/**
 * Tabla de partidas (BR · O2): tabla general y los controles de la partida
 * en vivo: registrar resultados, iniciar la siguiente partida, ver lobbies e
 * ir al cierre del torneo (BR · O4).
 */
export function BRBracketOrg() {
  const { torneo, publicado, iniciarSiguiente } = useBracketBR();
  const base = `/org/torneos/${torneo.id}/bracket`;
  const enCurso = partidaEnCurso(torneo);
  const siguiente = torneo.partidas.find((p) => p.estado === "pendiente");

  function iniciar() {
    if (!siguiente) return;
    iniciarSiguiente();
    toast.success(`Partida ${siguiente.numero} iniciada`);
  }

  let tarjeta: React.ReactNode;
  if (enCurso) {
    const restante = segundosRestantes(enCurso, torneo.minutosPorPartida, AHORA);
    tarjeta = (
      <LiveMatchCard
        titulo={`Partida ${enCurso.numero} · ${nombreLobby(torneo)}`}
        accion={
          <Link href={`${base}/registrar/${enCurso.numero}`} className={`${buttonVariants()} w-full`}>
            <Flag />
            Registrar resultados
          </Link>
        }
      >
        {restante > 0 ? `Tiempo restante ${mmss(restante)}` : "Tiempo cumplido"}
        {enCurso.vivos !== null && ` · ${enCurso.vivos} jugadores vivos`}. Al terminar, sube la
        tabla final y la captura.
      </LiveMatchCard>
    );
  } else if (siguiente) {
    tarjeta = (
      <LiveMatchCard titulo={`Partida ${siguiente.numero} · Pendiente`} enVivo={false}>
        Cuando el lobby esté listo, inicia la partida.
      </LiveMatchCard>
    );
  } else {
    tarjeta = (
      <LiveMatchCard
        titulo="Todas las partidas registradas"
        enVivo={false}
        accion={
          <Link href={`${base}/cierre`} className={`${buttonVariants()} w-full`}>
            <Flag />
            Ir al cierre del torneo
          </Link>
        }
      >
        Revisa el podio y publica los resultados.
      </LiveMatchCard>
    );
  }

  return (
    <>
      <Topbar
        title="Bracket"
        subtitle={`${torneo.jugadores.length} jugadores · ${nombreFormato(torneo.formato as Formato)}`}
        fallbackHref="/org/panel"
        actions={
          <Button
            variant="glass"
            size="icon"
            aria-label="Ver jugadores y lobbies"
            onClick={lobbiesPendiente}
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

      {/* El organizador no juega: ninguna fila va resaltada. */}
      <BRStandings torneo={torneo} />

      <div className="mt-5">{tarjeta}</div>

      <div className="mt-4 flex flex-col gap-3">
        <Button
          variant="secondary"
          className="w-full"
          disabled={!!enCurso || !siguiente || publicado}
          onClick={iniciar}
        >
          <Play />
          {siguiente ? "Iniciar siguiente partida" : "No quedan partidas"}
        </Button>
        <Button variant="secondary" className="w-full" onClick={lobbiesPendiente}>
          <ArrowLeftRight />
          Ver jugadores y lobbies
        </Button>
        <Link
          href={`${base}/cierre`}
          className={`${buttonVariants({ variant: "ghost" })} self-center`}
        >
          <Flag />
          Ir al cierre del torneo
        </Link>
      </div>

      <p className="mt-4 text-center text-caption text-ink-3">
        Puntos: posición{torneo.puntosPorKill > 0 && ` + ${torneo.puntosPorKill} pt por kill`} ·{" "}
        {torneo.minutosPorPartida}&apos; por partida.
      </p>
    </>
  );
}
