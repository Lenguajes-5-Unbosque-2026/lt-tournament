"use client";

import { useState } from "react";
import { Search, Trophy } from "lucide-react";
import { AmigosRanking } from "@/components/amigos-ranking";
import { ChipGroup } from "@/components/chip";
import { EmptyState } from "@/components/empty-state";
import { PageHead } from "@/components/page-head";
import { Podium } from "@/components/podium";
import { RankingRow } from "@/components/ranking-row";
import { Segment } from "@/components/segment";
import { Button } from "@/components/ui/button";
import { formatPuntos } from "@/lib/format";
import type { Amigo } from "@/lib/progreso";
import type { FilaRanking } from "@/lib/types";

type Vista = "global" | "juego" | "amigos";

const VISTAS = [
  { value: "global", label: "Global" },
  { value: "juego", label: "Por juego" },
  { value: "amigos", label: "Amigos" },
];

/**
 * Rankings (V3 y J21): segmento Global · Por juego · Amigos. Global y Por
 * juego muestran el ranking del juego elegido con podio y lista; la fila
 * propia aparece en su puesto o, si no tiene puntos, «Aún no apareces en el
 * ranking». Amigos es J21: invitación y lista de amigos con «Retar».
 */
export function RankingsView({
  juegos,
  rankings,
  amigos,
  invitacion,
  yoId,
  vistaInicial = "global",
}: {
  /** Chips de juego, en orden. */
  juegos: { id: string; nombre: string }[];
  /** Ranking de cada juego, de mayor a menor puntaje. */
  rankings: Record<string, FilaRanking[]>;
  /** El jugador y sus amigos aceptados, por puntos. */
  amigos: Amigo[];
  invitacion: string;
  yoId: string;
  vistaInicial?: Vista;
}) {
  const [vista, setVista] = useState<Vista>(vistaInicial);
  const [juegoId, setJuegoId] = useState(juegos[0].id);

  // La spec deja abierto qué distingue a «Global» de «Por juego» (pregunta 5).
  const filas = rankings[juegoId] ?? [];
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

      {vista === "amigos" ? (
        <div className="mt-4">
          <AmigosRanking amigos={amigos} invitacion={invitacion} />
        </div>
      ) : (
        <>
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
                  esYo: f.id === yoId,
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

          {/* V3: si no está en el ranking de este juego, el aviso va en lugar de su fila. */}
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
      )}
    </>
  );
}
