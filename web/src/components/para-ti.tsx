"use client";

import { useState } from "react";
import Link from "next/link";
import { GameChips } from "@/components/game-chips";
import { TournamentCard } from "@/components/tournament-card";
import type { Torneo } from "@/lib/types";

/** Sección «Para ti» de Inicio (J06): título, «Ver todo», chips de juego y lista. */
export function ParaTi({
  torneos,
  juegos,
  ahora,
}: {
  torneos: Torneo[];
  juegos: { id: string; nombre: string }[];
  ahora: string;
}) {
  const [seleccion, setSeleccion] = useState<string[]>([]);
  const visibles =
    seleccion.length === 0
      ? torneos
      : torneos.filter((t) => seleccion.includes(t.juego.id));

  return (
    <section aria-labelledby="para-ti-titulo" className="mt-6">
      <div className="flex items-center justify-between">
        <h2 id="para-ti-titulo" className="text-h1 text-ink">
          Para ti
        </h2>
        <Link href="/explorar" className="text-label font-semibold text-primary">
          Ver todo
        </Link>
      </div>

      <GameChips juegos={juegos} selected={seleccion} onChange={setSeleccion} className="mt-4" />

      <ul className="mt-5 flex flex-col gap-3">
        {visibles.map((t) => (
          <li key={t.id}>
            <TournamentCard torneo={t} ahora={ahora} />
          </li>
        ))}
      </ul>
      {visibles.length === 0 && (
        <p className="mt-5 text-center text-small text-ink-3">
          No hay torneos de este juego por ahora.
        </p>
      )}
    </section>
  );
}
