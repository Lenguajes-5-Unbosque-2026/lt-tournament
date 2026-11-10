"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { Segment } from "@/components/segment";
import { TournamentCard } from "@/components/tournament-card";
import type { Torneo } from "@/lib/types";

type Pestana = "todos" | "en_curso" | "borradores";

const PESTANAS = [
  { value: "todos", label: "Todos" },
  { value: "en_curso", label: "En curso" },
  { value: "borradores", label: "Borradores" },
];

const VACIOS: Record<Pestana, string> = {
  todos: "Aún no tienes torneos.",
  en_curso: "No tienes torneos en curso.",
  borradores: "No tienes borradores.",
};

function pertenece(t: Torneo, pestana: Pestana) {
  if (pestana === "en_curso")
    return t.estado === "en_curso" || t.estado === "checkin";
  if (pestana === "borradores") return t.estado === "borrador";
  return true;
}

/**
 * Borrador: retoma el asistente. Con bracket (BR · O2, PTS · O2 u O12): el
 * bracket. Lo demás: Resumen para gestionar (O07, todavía sin construir).
 */
function destino(t: Torneo, conBracket: string[]) {
  if (t.estado === "borrador") return "/org/crear";
  if (conBracket.includes(t.id)) return `/org/torneos/${t.id}/bracket`;
  return `/org/torneos/${t.id}`;
}

/** «Mis torneos» del Panel (O01): segmento Todos · En curso · Borradores y la lista. */
export function PanelTorneos({
  torneos,
  sinTorneos = false,
  ahora,
  conBracket,
}: {
  torneos: Torneo[];
  /** El organizador no tiene ningún torneo, en cualquier estado (V5). */
  sinTorneos?: boolean;
  ahora: string;
  /** Ids de los torneos que tienen pantalla de bracket. */
  conBracket: string[];
}) {
  const [pestana, setPestana] = useState<Pestana>("todos");
  const lista = torneos.filter((t) => pertenece(t, pestana));

  return (
    <section aria-labelledby="mis-torneos-titulo" className="mt-6">
      <div className="flex items-center justify-between">
        <h2 id="mis-torneos-titulo" className="text-h1 text-ink">
          Mis torneos
        </h2>
        <Link
          href="/org/torneos"
          className="text-label font-semibold text-primary"
        >
          Ver todo
        </Link>
      </div>

      {sinTorneos ? (
        // V5: sin botón propio; apunta a «Empezar» de la tarjeta de arriba.
        <EmptyState
          icon={Trophy}
          titulo="Aún no has creado torneos"
          texto="Toca «Empezar» arriba: en 4 pasos tu torneo queda publicado y listo para compartir."
          className="mt-4"
        />
      ) : (
        <>
          <Segment
            label="Filtrar mis torneos"
            options={PESTANAS}
            value={pestana}
            // El segmento siempre tiene una pestaña activa: tocar la activa no hace nada.
            onValueChange={(v) => v && setPestana(v as Pestana)}
            className="mt-4"
          />

          <ul className="mt-4 flex flex-col gap-3">
            {lista.map((t) => (
              <li key={t.id}>
                <TournamentCard
                  torneo={t}
                  ahora={ahora}
                  href={destino(t, conBracket)}
                />
              </li>
            ))}
          </ul>
          {lista.length === 0 && (
            <p className="mt-6 text-center text-small text-ink-3">
              {VACIOS[pestana]}
            </p>
          )}
        </>
      )}
    </section>
  );
}
