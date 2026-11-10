"use client";

import { useState } from "react";
import Link from "next/link";
import { Flag } from "lucide-react";
import { BracketRounds } from "@/components/bracket-rounds";
import { ShareButton } from "@/components/detail-actions";
import { MatchupCard } from "@/components/matchup-card";
import { ProofSheet, type Prueba } from "@/components/proof-sheet";
import { Topbar } from "@/components/topbar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { AHORA } from "@/lib/ahora";
import { cuadro, jugadorPorId, porJugar, type Llave, type TorneoEliminacion } from "@/lib/eliminacion";
import { formatFechaHora } from "@/lib/format";
import { marcador } from "@/lib/partido";

/** Datos de la hoja Prueba del resultado (J16b) para un partido registrado. */
export function pruebaDeLlave(t: TorneoEliminacion, l: Llave, nombreRonda: string): Prueba | null {
  const a = jugadorPorId(t, l.aId);
  const b = jugadorPorId(t, l.bId);
  const ganador = jugadorPorId(t, l.ganadorId);
  if (!l.prueba || !a || !b || !ganador) return null;
  const ronda = l.tercerPuesto ? "Tercer puesto" : nombreRonda;
  return {
    subtitulo: `${ronda} · Partido ${l.orden} · ${a.nombre} vs ${b.nombre}`,
    imagen: l.prueba,
    overline: `Resultado · ${ronda}`,
    marcador: `${a.nombre} ${marcador(l.marcadorA, l.marcadorB)} ${b.nombre}`,
    jugador: ganador,
    titulo: `Ganador: ${ganador.nombre}`,
    detalle: "Subida por el organizador",
  };
}

/**
 * Bracket (J16): el cuadro por ronda con el partido propio resaltado,
 * «Ver prueba» en los partidos registrados (J16b) y la tarjeta «Tu
 * partido» con «Reportar resultado» (J17).
 */
export function EliminacionBracketJugador({
  torneo,
  propioId,
}: {
  torneo: TorneoEliminacion;
  /** Jugador con la sesión iniciada, si está en el cuadro. */
  propioId?: string;
}) {
  const [prueba, setPrueba] = useState<Prueba | null>(null);
  const rondas = cuadro(torneo);
  const activa = rondas[torneo.rondaActiva - 1];
  const propia = activa?.llaves.find(
    (l) => porJugar(l) && (l.aId === propioId || l.bId === propioId),
  );
  const a = propia && jugadorPorId(torneo, propia.aId);
  const b = propia && jugadorPorId(torneo, propia.bId);
  const reporte =
    propia && torneo.reportes.find((r) => r.partidoId === propia.id && r.jugadorId === propioId);
  // Spec, pregunta 4: el partido no tiene marcador en vivo; solo el reportado.
  const enCurso = torneo.estado === "en_curso";

  return (
    <>
      <Topbar
        title="Bracket"
        subtitle={torneo.nombre}
        fallbackHref={`/torneo/${torneo.id}`}
        actions={<ShareButton titulo={torneo.nombre} />}
      />

      <BracketRounds
        rondas={rondas}
        rondaInicial={torneo.rondaActiva}
        jugador={(id) => jugadorPorId(torneo, id)}
        propioId={propioId}
        onVerPrueba={(l) => setPrueba(pruebaDeLlave(torneo, l, rondas[l.ronda - 1].nombre))}
      />

      {propia && a && b && (
        <div className="mt-5 flex flex-col gap-4">
          <MatchupCard
            titulo="Tu partido"
            etiqueta={
              enCurso ? (
                <Badge variant="accent">En curso</Badge>
              ) : (
                <Badge variant="warning">Pendiente</Badge>
              )
            }
            a={a}
            b={b}
            detalleA={`Seed #${a.seed}`}
            detalleB={`Seed #${b.seed}`}
            centro={reporte ? marcador(reporte.marcadorA, reporte.marcadorB) : "VS"}
            pie={enCurso ? activa.nombre : `${activa.nombre} · ${formatFechaHora(propia.fechaHora, AHORA)}`}
            propioId={propioId}
          />
          <Link
            href={`/torneo/${torneo.id}/bracket/reportar/${propia.ronda}`}
            className={`${buttonVariants()} w-full`}
          >
            <Flag />
            {reporte ? "Corregir mi reporte" : "Reportar resultado"}
          </Link>
          {reporte && (
            <p className="-mt-2 text-center text-caption text-ink-3">
              Reportaste {marcador(reporte.marcadorA, reporte.marcadorB)}; el organizador lo confirma.
            </p>
          )}
        </div>
      )}

      <ProofSheet prueba={prueba} onOpenChange={(open) => !open && setPrueba(null)} />
    </>
  );
}
