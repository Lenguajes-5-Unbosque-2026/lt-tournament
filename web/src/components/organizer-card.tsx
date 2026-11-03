"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Organizador } from "@/lib/types";

/**
 * Tarjeta del creador del torneo: avatar, alias, verificado y «Seguir».
 * «Seguir» solo cambia de estado en pantalla: falta definir qué significa
 * (specs/jugador-descubrir-e-inscribirse, pregunta 5).
 */
export function OrganizerCard({
  organizador,
  torneos,
}: {
  organizador: Organizador;
  torneos: number;
}) {
  const [siguiendo, setSiguiendo] = useState(false);

  return (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-surface p-3.5">
      <Avatar className="size-12 ring-2 ring-primary ring-offset-2 ring-offset-surface">
        <AvatarImage src={`/mock/${organizador.imagen}`} alt="" />
        <AvatarFallback className="bg-surface-3" />
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-strong text-ink">{organizador.alias}</p>
        <p className="flex items-center gap-1 text-caption text-ink-3">
          {organizador.verificado && (
            <BadgeCheck className="size-icon-meta shrink-0 text-info" aria-hidden />
          )}
          {organizador.verificado ? "Organizador verificado" : "Organizador"} · {torneos}{" "}
          {torneos === 1 ? "torneo" : "torneos"}
        </p>
      </div>
      <Button
        variant={siguiendo ? "ghost" : "secondary"}
        size="sm"
        aria-pressed={siguiendo}
        onClick={() => setSiguiendo((s) => !s)}
      >
        {siguiendo ? "Siguiendo" : "Seguir"}
      </Button>
    </div>
  );
}
