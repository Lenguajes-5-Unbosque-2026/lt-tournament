"use client";

import { useState } from "react";
import { Calendar, CalendarDays } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { PageHead } from "@/components/page-head";
import { Segment } from "@/components/segment";
import { TournamentCard } from "@/components/tournament-card";
import { Button } from "@/components/ui/button";
import type { EtiquetaTarjeta } from "@/components/status-tag";
import type { MisTorneos } from "@/lib/types";

type Pestana = "proximos" | "enCurso" | "finalizados";

const PESTANAS = [
  { value: "proximos", label: "Próximos" },
  { value: "enCurso", label: "En curso" },
  { value: "finalizados", label: "Finalizados" },
];

// Etiqueta de cada tarjeta: en Próximos, el estado de la inscripción.
const ETIQUETA_FIJA: Partial<Record<Pestana, EtiquetaTarjeta>> = {
  enCurso: "en_curso",
  finalizados: "finalizado",
};

/**
 * Mis torneos (J13) y su estado vacío (J24): segmento Próximos · En curso ·
 * Finalizados, la lista y, en Próximos, la «Lista de espera». Cada tarjeta
 * lleva a la Sala del torneo (J14). Si el jugador no tiene ningún torneo, las
 * tres pestañas muestran el mismo vacío.
 */
export function MisTorneosView({ torneos, ahora }: { torneos: MisTorneos; ahora: string }) {
  const [pestana, setPestana] = useState<Pestana>("proximos");
  const lista = torneos[pestana];
  const sinTorneos =
    torneos.proximos.length +
      torneos.enCurso.length +
      torneos.finalizados.length +
      torneos.espera.length ===
    0;
  const conEspera = pestana === "proximos" && torneos.espera.length > 0;

  return (
    <>
      <PageHead
        title="Mis torneos"
        action={
          <Button variant="glass" size="icon" aria-label="Calendario de torneos">
            <CalendarDays />
          </Button>
        }
      />

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
      ) : (
        <>
          {lista.length === 0 && !conEspera && (
            <p className="mt-10 text-center text-small text-ink-3">
              No hay torneos en esta pestaña.
            </p>
          )}
          {lista.length > 0 && (
            <ul className="mt-4 flex flex-col gap-3">
              {lista.map((t) => (
                <li key={t.id}>
                  <TournamentCard
                    torneo={t}
                    ahora={ahora}
                    href={`/torneo/${t.id}/sala`}
                    etiqueta={ETIQUETA_FIJA[pestana] ?? torneos.estados[t.id]}
                  />
                </li>
              ))}
            </ul>
          )}

          {conEspera && (
            <section aria-labelledby="espera-titulo" className="mt-6">
              <h2 id="espera-titulo" className="text-h1 text-ink">
                Lista de espera
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {torneos.espera.map((t) => (
                  <li key={t.id}>
                    {/* Aún sin cupo no hay Sala: lleva al Detalle (J12) con su posición. */}
                    <TournamentCard torneo={t} ahora={ahora} etiqueta="lleno" />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </>
  );
}
