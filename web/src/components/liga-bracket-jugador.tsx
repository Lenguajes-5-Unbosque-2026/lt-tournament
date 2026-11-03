"use client";

import { useState } from "react";
import Link from "next/link";
import { Flag } from "lucide-react";
import { ShareButton } from "@/components/detail-actions";
import { LigaStandings } from "@/components/liga-standings";
import { LiveMatchCard } from "@/components/live-match-card";
import { ProofSheet, type Prueba } from "@/components/proof-sheet";
import { ResultRow } from "@/components/result-row";
import { Topbar } from "@/components/topbar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { AHORA } from "@/lib/ahora";
import { formatFechaHora } from "@/lib/format";
import {
  cerrado,
  jugadorPorId,
  marcador,
  partidosDeRonda,
  puntosDe,
  resultadoPara,
  rival,
  rondaActual,
  tablaLiga,
  type PartidoLiga,
  type TorneoLiga,
} from "@/lib/liga";

const RESULTADO = { victoria: "Victoria", empate: "Empate", derrota: "Derrota" };

/** Etiqueta del partido propio (PENDIENTE en el diseño; el resto no está dibujado). */
export function EtiquetaPartido({ estado }: { estado: PartidoLiga["estado"] }) {
  if (estado === "en_disputa") return <Badge variant="danger">En disputa</Badge>;
  if (estado === "reportado") return <Badge variant="info">Por confirmar</Badge>;
  return <Badge variant="warning">Pendiente</Badge>;
}

/** Datos de la hoja Prueba del resultado (PTS · J3) para un partido registrado. */
export function pruebaDePartido(t: TorneoLiga, p: PartidoLiga, propioId?: string): Prueba | null {
  const a = jugadorPorId(t, p.aId);
  const b = jugadorPorId(t, p.bId);
  if (!p.prueba || !a || !b) return null;
  const ganador = jugadorPorId(t, p.ganadorId);
  const propio = [a, b].find((j) => j.id === propioId);
  const pts = (n: number) => `+${n} ${n === 1 ? "pt" : "pts"}`;
  return {
    subtitulo: `Ronda ${p.ronda} · ${a.nombre} vs ${b.nombre}`,
    imagen: p.prueba,
    overline: `Resultado · Ronda ${p.ronda}`,
    marcador: `${a.nombre} ${marcador(p.marcadorA, p.marcadorB)} ${b.nombre}`,
    jugador: ganador ?? propio ?? a,
    titulo: ganador
      ? `Ganador: ${ganador.nombre} · ${pts(t.puntos.victoria)}`
      : `Empate · ${pts(t.puntos.empate)} cada uno`,
    detalle: "Subida por el organizador",
  };
}

/**
 * Tabla y tu partido (PTS · J1): tabla de posiciones, el partido propio de
 * la ronda actual con «Reportar resultado» y los resultados propios con
 * «Ver prueba», que abre Prueba del resultado (PTS · J3).
 */
export function LigaBracketJugador({
  torneo,
  propioId,
}: {
  torneo: TorneoLiga;
  /** Jugador con la sesión iniciada, si está inscrito en el torneo. */
  propioId?: string;
}) {
  const [prueba, setPrueba] = useState<Prueba | null>(null);
  const actual = rondaActual(torneo);
  const fila = tablaLiga(torneo).find((f) => f.jugador.id === propioId);
  const propios = propioId
    ? torneo.partidos
        .filter((p) => p.aId === propioId || p.bId === propioId)
        .sort((a, b) => b.ronda - a.ronda)
    : [];
  const partidoActual = propios.find((p) => p.ronda === actual && !cerrado(p));
  const reporte =
    partidoActual &&
    torneo.reportes.find((r) => r.partidoId === partidoActual.id && r.jugadorId === propioId);
  const descansa =
    propioId && actual > 0 && !partidosDeRonda(torneo, actual).some((p) => p.aId === propioId || p.bId === propioId);

  function verPrueba(p: PartidoLiga) {
    setPrueba(pruebaDePartido(torneo, p, propioId));
  }

  return (
    <>
      <Topbar
        title="Bracket"
        subtitle={`${torneo.nombre} · Ronda ${actual} de ${torneo.totalRondas}`}
        fallbackHref={`/torneo/${torneo.id}`}
        actions={<ShareButton titulo={torneo.nombre} />}
      />

      <LigaStandings torneo={torneo} propioId={propioId} onVerPrueba={verPrueba} />

      {fila && partidoActual && (
        <div className="mt-5">
          <LiveMatchCard
            titulo={`Tu partido · Ronda ${partidoActual.ronda}`}
            etiqueta={<EtiquetaPartido estado={partidoActual.estado} />}
            accion={
              <Link
                href={`/torneo/${torneo.id}/bracket/reportar/${partidoActual.ronda}`}
                className={`${buttonVariants()} w-full`}
              >
                <Flag />
                {reporte ? "Corregir mi reporte" : "Reportar resultado"}
              </Link>
            }
          >
            Vas {fila.posicion}° con {fila.puntos} pts. Juegas contra{" "}
            {jugadorPorId(torneo, rival(partidoActual, propioId!))?.nombre} ·{" "}
            {torneo.minutosPorPartido}&apos;.{" "}
            {reporte
              ? `Reportaste ${marcador(reporte.marcadorA, reporte.marcadorB)}; el organizador lo confirma.`
              : "Al terminar, reporta el marcador."}
          </LiveMatchCard>
        </div>
      )}
      {fila && descansa && (
        <div className="mt-5">
          <LiveMatchCard titulo={`Ronda ${actual} · Descansas`} enVivo={false}>
            Con número impar de participantes, uno descansa cada ronda. Vas {fila.posicion}° con{" "}
            {fila.puntos} pts.
          </LiveMatchCard>
        </div>
      )}

      {propios.length > 0 && (
        <section aria-labelledby="resultados-titulo" className="mt-6">
          <h2 id="resultados-titulo" className="text-h2 text-ink">
            Resultados y pruebas
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5">
            {propios.map((p) => {
              const a = jugadorPorId(torneo, p.aId)?.nombre;
              const b = jugadorPorId(torneo, p.bId)?.nombre;
              const r = resultadoPara(p, propioId!);
              const pts = r ? puntosDe(r, torneo.puntos) : 0;
              return (
                <ResultRow
                  key={p.id}
                  titulo={
                    r
                      ? `Ronda ${p.ronda} · ${a} ${marcador(p.marcadorA, p.marcadorB)} ${b}`
                      : `Ronda ${p.ronda} · ${a} vs ${b}`
                  }
                  detalle={
                    r
                      ? `${RESULTADO[r]} · +${pts} ${pts === 1 ? "pt" : "pts"}`
                      : formatFechaHora(p.fechaHora, AHORA)
                  }
                  estado={r ? "Sin prueba" : "Pendiente"}
                  onVerPrueba={r && p.prueba ? () => verPrueba(p) : undefined}
                  etiquetaPrueba={`Ver prueba de la ronda ${p.ronda}`}
                />
              );
            })}
          </ul>
        </section>
      )}

      <ProofSheet prueba={prueba} onOpenChange={(open) => !open && setPrueba(null)} />
    </>
  );
}
