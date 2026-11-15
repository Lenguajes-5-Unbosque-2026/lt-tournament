"use client";

import { useState } from "react";
import { Search, Trophy } from "lucide-react";
import { AmigosRanking } from "@/components/amigos-ranking";
import { EmptyState } from "@/components/empty-state";
import { PageHead } from "@/components/page-head";
import { Podium } from "@/components/podium";
import { RankingRow } from "@/components/ranking-row";
import { Segment } from "@/components/segment";
import { Button } from "@/components/ui/button";
import { formatPuntos } from "@/lib/format";
import type { Amigo } from "@/lib/progreso";
import type { FilaRanking } from "@/lib/types";

type Vista = "global" | "amigos";

const VISTAS = [
  { value: "global", label: "Global" },
  { value: "amigos", label: "Amigos" },
];

/**
 * Rankings (V3 y J21): segmento Global · Amigos. Global es el ranking general
 * de todos los jugadores por sus puntos totales, sin separar por juego: podio,
 * lista y la fila propia en su puesto o, si no tiene puntos, «Aún no apareces
 * en el ranking». Amigos es J21: invitación y lista de amigos con «Retar».
 */
export function RankingsView({
  ranking,
  amigos,
  invitacion,
  yoId,
  vistaInicial = "global",
}: {
  /** Todos los jugadores con puntos, de mayor a menor. */
  ranking: FilaRanking[];
  /** El jugador y sus amigos aceptados, por puntos. */
  amigos: Amigo[];
  invitacion: string;
  yoId: string;
  vistaInicial?: Vista;
}) {
  const [vista, setVista] = useState<Vista>(vistaInicial);
  const miPuesto = ranking.findIndex((f) => f.id === yoId);
  const resto = ranking.slice(3);

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
          {ranking.length === 0 ? (
            <p className="mt-8 text-center text-small text-ink-3">
              Todavía nadie tiene puntos.
            </p>
          ) : (
            <div className="mt-6">
              <Podium
                puestos={ranking.slice(0, 3).map((f) => ({
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

          {/* V3: si no tiene puntos, el aviso va en lugar de su fila. */}
          {miPuesto < 0 && (
            <EmptyState
              icon={Trophy}
              titulo="Aún no apareces en el ranking"
              texto="Juega tu primer torneo para sumar puntos y ver tu posición."
              cta={{ label: "Explorar torneos", href: "/explorar" }}
              className="mt-5"
            />
          )}
        </>
      )}
    </>
  );
}
