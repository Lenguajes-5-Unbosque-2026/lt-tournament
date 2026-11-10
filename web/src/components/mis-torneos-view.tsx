"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { PageHead } from "@/components/page-head";
import { Segment } from "@/components/segment";
import { TournamentCard } from "@/components/tournament-card";
import type { MisTorneos } from "@/lib/types";

type Pestana = keyof MisTorneos;

const PESTANAS = [
  { value: "proximos", label: "Próximos" },
  { value: "enCurso", label: "En curso" },
  { value: "finalizados", label: "Finalizados" },
];

/**
 * Mis torneos (J13) y su estado vacío (J24): segmento Próximos · En curso ·
 * Finalizados y la lista. Si el jugador no tiene ningún torneo, las tres
 * pestañas muestran el mismo vacío.
 */
export function MisTorneosView({ torneos, ahora }: { torneos: MisTorneos; ahora: string }) {
  const [pestana, setPestana] = useState<Pestana>("proximos");
  const lista = torneos[pestana];
  const sinTorneos =
    torneos.proximos.length + torneos.enCurso.length + torneos.finalizados.length === 0;

  return (
    <>
      <PageHead title="Mis torneos" />

      <Segment
        label="Mis torneos por estado"
        options={PESTANAS}
        value={pestana}
        // El segmento siempre tiene una pestaña activa: tocar la activa no hace nada.
        onValueChange={(v) => v && setPestana(v as Pestana)}
        className="mt-4"
      />

      {sinTorneos ? (
        <EmptyState
          variant="page"
          icon={Calendar}
          titulo="Aún no tienes torneos"
          texto="Inscríbete en uno y aquí verás tu check-in, chat y bracket."
          cta={{ label: "Explorar torneos", href: "/explorar" }}
          className="mt-10"
        />
      ) : lista.length === 0 ? (
        <p className="mt-10 text-center text-small text-ink-3">No hay torneos en esta pestaña.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {lista.map((t) => (
            <li key={t.id}>
              <TournamentCard torneo={t} ahora={ahora} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
