"use client";

import { useState } from "react";
import { Search, Trophy } from "lucide-react";
import { ChipGroup } from "@/components/chip";
import { EmptyState } from "@/components/empty-state";
import { PageHead } from "@/components/page-head";
import { Podium } from "@/components/podium";
import { RankingRow } from "@/components/ranking-row";
import { Segment } from "@/components/segment";
import { Button } from "@/components/ui/button";
import { formatPuntos } from "@/lib/format";
import type { FilaRanking } from "@/lib/types";

type Vista = "global" | "juego" | "amigos";

const VISTAS = [
  { value: "global", label: "Global" },
  { value: "juego", label: "Por juego" },
  { value: "amigos", label: "Amigos" },
];

/**
 * Rankings (V3 y la futura J21): segmento Global · Por juego · Amigos, chips de
 * juego, podio y lista. La fila propia aparece en su puesto; si el jugador no
 * tiene puntos en ese juego, en su lugar va «Aún no apareces en el ranking».
 */
export function RankingsView({
  juegos,
  rankings,
  amigos,
  yoId,
}: {
  /** Chips de juego, en orden. */
  juegos: { id: string; nombre: string }[];
  /** Ranking de cada juego, de mayor a menor puntaje. */
  rankings: Record<string, FilaRanking[]>;
  /** Ids de los amigos aceptados del jugador. */
  amigos: string[];
  yoId: string;
}) {
  const [vista, setVista] = useState<Vista>("global");
  const [juegoId, setJuegoId] = useState(juegos[0].id);

  // «Global» y «Por juego» muestran el ranking del juego elegido; «Amigos»
  // solo al jugador y sus amigos. La spec deja abierto qué distingue a
  // «Global» de «Por juego» (pregunta 5).
  const filas = (rankings[juegoId] ?? []).filter(
    (f) => vista !== "amigos" || f.id === yoId || amigos.includes(f.id),
  );
  const miPuesto = filas.findIndex((f) => f.id === yoId);
  const resto = filas.slice(3);

  return (
    <>
      <PageHead
        title="Rankings"
        action={
          <Button variant="glass" size="icon" aria-label="Buscar jugadores">
            <Search />
          </Button>
        }
      />

      <Segment
        label="Tipo de ranking"
        options={VISTAS}
        value={vista}
        onValueChange={(v) => v && setVista(v as Vista)}
        className="mt-4"
      />

      <ChipGroup
        label="Juego"
        className="mt-4"
        options={juegos.map((j) => ({ value: j.id, label: j.nombre }))}
        value={[juegoId]}
        // Siempre hay un juego elegido: tocar el activo no hace nada.
        onValueChange={(v) => v[0] && setJuegoId(v[0])}
      />

      {filas.length === 0 ? (
        <p className="mt-8 text-center text-small text-ink-3">
          Todavía nadie tiene puntos en este juego.
        </p>
      ) : (
        <div className="mt-6">
          <Podium
            puestos={filas.slice(0, 3).map((f) => ({
              nombre: f.nombre,
              imagen: f.imagen,
              color1: f.color1,
              color2: f.color2,
              detalle: `${formatPuntos(f.puntos)} pts`,
            }))}
          />
          {resto.length > 0 && (
            <ul className="mt-5 flex flex-col gap-3">
              {resto.map((f, i) => (
                <RankingRow key={f.id} puesto={i + 4} fila={f} esYo={f.id === yoId} />
              ))}
            </ul>
          )}
        </div>
      )}

      {/* En el podio ya se ve; si no está en la lista, su fila o el vacío (V3). */}
      {miPuesto < 0 && (
        <EmptyState
          icon={Trophy}
          titulo="Aún no apareces en el ranking"
          texto="Juega tu primer torneo para sumar puntos y ver tu posición en cada juego."
          cta={{ label: "Explorar torneos", href: "/explorar" }}
          className="mt-5"
        />
      )}
    </>
  );
}
