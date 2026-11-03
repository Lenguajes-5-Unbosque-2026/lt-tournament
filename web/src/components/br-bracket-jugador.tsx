"use client";

import { useState } from "react";
import Link from "next/link";
import { Flag } from "lucide-react";
import { BRStandings } from "@/components/br-standings";
import { ShareButton } from "@/components/detail-actions";
import { LiveMatchCard } from "@/components/live-match-card";
import { ProofSheet, type Prueba } from "@/components/proof-sheet";
import { ResultRow } from "@/components/result-row";
import { Topbar } from "@/components/topbar";
import { buttonVariants } from "@/components/ui/button";
import {
  confirmados,
  jugadorPorId,
  nombreLobby,
  partidaEnCurso,
  tablaGeneral,
  type PartidaBR,
  type TorneoBR,
} from "@/lib/battle-royale";

/**
 * Tabla y tu partida (BR · J1): tabla general, la partida en vivo con
 * «Reportar resultado» y los resultados de cada partida con «Ver prueba»,
 * que abre la hoja Prueba del resultado (BR · J3).
 */
export function BRBracketJugador({
  torneo,
  propioId,
}: {
  torneo: TorneoBR;
  /** Jugador con la sesión iniciada, si está inscrito en el torneo. */
  propioId?: string;
}) {
  const [prueba, setPrueba] = useState<Prueba | null>(null);
  const enCurso = partidaEnCurso(torneo);
  const general = tablaGeneral(torneo);
  const propia = general.find((f) => f.jugador.id === propioId);
  const reporte =
    enCurso &&
    torneo.resultados.find((r) => r.partidaId === enCurso.id && r.jugadorId === propioId);

  function abrirPrueba(p: PartidaBR) {
    const ganador = jugadorPorId(torneo, p.ganadorId);
    if (!p.prueba || !ganador) return;
    const kills = confirmados(torneo, p.id).find((r) => r.jugadorId === ganador.id)?.kills ?? 0;
    setPrueba({
      subtitulo: `Partida ${p.numero} · ${torneo.nombre}`,
      imagen: p.prueba,
      overline: `Victoria · Partida ${p.numero}`,
      marcador: `${ganador.nombre} · 1° · ${kills} ${kills === 1 ? "kill" : "kills"}`,
      jugador: ganador,
      titulo: `Ganador: ${ganador.nombre}`,
      detalle: "Subida por el organizador",
    });
  }

  return (
    <>
      <Topbar
        title="Bracket"
        subtitle={`${torneo.nombre} · ${torneo.partidas.length} partidas`}
        fallbackHref={`/torneo/${torneo.id}`}
        actions={<ShareButton titulo={torneo.nombre} />}
      />

      <BRStandings torneo={torneo} propioId={propioId} />

      {enCurso && (
        <div className="mt-5">
          {propia ? (
            <LiveMatchCard
              titulo={`Tu partida · Partida ${enCurso.numero}`}
              accion={
                <Link
                  href={`/torneo/${torneo.id}/bracket/reportar/${enCurso.numero}`}
                  className={`${buttonVariants()} w-full`}
                >
                  <Flag />
                  {reporte ? "Corregir mi reporte" : "Reportar resultado"}
                </Link>
              }
            >
              Vas {propia.posicion}° en la general con {propia.puntos} pts.{" "}
              {reporte
                ? `Reportaste ${reporte.puesto}° · ${reporte.kills} kills; el organizador lo valida con la tabla final.`
                : "Al terminar, reporta tu puesto y tus kills."}
            </LiveMatchCard>
          ) : (
            <LiveMatchCard titulo={`Partida ${enCurso.numero} · ${nombreLobby(torneo)}`}>
              {enCurso.vivos !== null && `${enCurso.vivos} jugadores vivos. `}
              La tabla se actualiza cuando el organizador registre los resultados.
            </LiveMatchCard>
          )}
        </div>
      )}

      <section aria-labelledby="resultados-titulo" className="mt-6">
        <h2 id="resultados-titulo" className="text-h2 text-ink">
          Resultados y pruebas
        </h2>
        <ul className="mt-3 flex flex-col gap-2.5">
          {torneo.partidas.map((p) => (
            <ResultRow
              key={p.id}
              titulo={`Partida ${p.numero}${p.estado === "finalizada" ? " · Finalizada" : ""}`}
              detalle={resumenPartida(torneo, p, propioId)}
              estado={
                p.estado === "en_curso" ? "En curso" : p.estado === "pendiente" ? "Por jugar" : "Sin prueba"
              }
              onVerPrueba={p.estado === "finalizada" && p.prueba ? () => abrirPrueba(p) : undefined}
              etiquetaPrueba={`Ver prueba de la partida ${p.numero}`}
            />
          ))}
        </ul>
      </section>

      <ProofSheet prueba={prueba} onOpenChange={(open) => !open && setPrueba(null)} />
    </>
  );
}

/** «Ganó Sh4dow · tú quedaste 3°», «Lobby único · 46 vivos» o «Todavía no empieza». */
function resumenPartida(t: TorneoBR, p: PartidaBR, propioId?: string) {
  if (p.estado === "en_curso") {
    return [nombreLobby(t), p.vivos !== null && `${p.vivos} vivos`].filter(Boolean).join(" · ");
  }
  if (p.estado === "pendiente") return "Todavía no empieza";
  const ganador = jugadorPorId(t, p.ganadorId);
  const propio = confirmados(t, p.id).find((r) => r.jugadorId === propioId);
  return [
    ganador && (ganador.id === propioId ? "Ganaste" : `Ganó ${ganador.nombre}`),
    propio && ganador?.id !== propioId && `tú quedaste ${propio.puesto}°`,
  ]
    .filter(Boolean)
    .join(" · ");
}
