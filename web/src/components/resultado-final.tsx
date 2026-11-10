"use client";

import Link from "next/link";
import { Flag, Gamepad2, Share2, Swords, Users } from "lucide-react";
import { Podium } from "@/components/podium";
import { Stat } from "@/components/stat";
import { Topbar } from "@/components/topbar";
import { Button, buttonVariants } from "@/components/ui/button";
import type { ResultadoFinal as Resultado } from "@/lib/competir";
import { compartirEnlace } from "@/lib/compartir";

/**
 * Resultado final (F1): «¡QUEDASTE 2º!», el podio con el jugador resaltado,
 * sus puntos de ranking, los puestos que subió y sus victorias. Solo lo ven
 * los tres primeros.
 */
export function ResultadoFinal({ resultado: r }: { resultado: Resultado }) {
  const bracket = `/torneo/${r.torneoId}/bracket`;

  return (
    <>
      <Topbar title="Resultado final" subtitle={r.torneoNombre} fallbackHref="/mis-torneos" />

      <h2 className="mt-5 font-display text-display-l text-ink uppercase italic">
        ¡Quedaste {r.puesto}º!
      </h2>

      <div className="mt-5">
        <Podium
          puestos={r.podio.map((p) => ({
            nombre: p.nombre,
            imagen: p.imagen,
            color1: p.color1,
            color2: p.color2,
            detalle: `+${p.puntos} pts`,
            esYo: p.puesto === r.puesto,
          }))}
        />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2.5">
        <Stat icon={Users} value={`+${r.puntos}`} label="Pts de ranking" />
        <Stat
          icon={Gamepad2}
          value={`${r.puestosSubidos > 0 ? "↑" : r.puestosSubidos < 0 ? "↓" : "="}${Math.abs(r.puestosSubidos)}`}
          label={`Puestos en ${r.juegoNombre.replace("EA ", "")}`}
        />
        <Stat icon={Swords} value={String(r.victorias)} label="Victorias" />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <Link href={bracket} className={`${buttonVariants()} w-full`}>
          <Flag />
          Ver bracket completo
        </Link>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => compartirEnlace(`Quedé ${r.puesto}º en ${r.torneoNombre}`, window.location.href)}
        >
          <Share2 />
          Compartir mi resultado
        </Button>
      </div>
    </>
  );
}
