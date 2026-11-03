"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { GameArt } from "@/components/game-art";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { formatCuentaAtras, formatFechaHora } from "@/lib/format";
import type { Torneo } from "@/lib/types";

/**
 * «Tu próximo torneo» (tarjeta --accent, design/ui kit.md §5.12): etiqueta,
 * cuenta atrás hasta el inicio, torneo y botón de check-in (J14).
 * La cuenta atrás corre en el cliente a partir de los segundos que faltan.
 */
export function NextTournamentCard({
  torneo,
  faltanSegundos,
  checkinAbierto,
  ahora,
}: {
  torneo: Torneo;
  faltanSegundos: number;
  checkinAbierto: boolean;
  ahora: string;
}) {
  const [restantes, setRestantes] = useState(faltanSegundos);

  useEffect(() => {
    const id = setInterval(() => setRestantes((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      aria-label="Tu próximo torneo"
      className="rounded-lg border border-primary-line bg-linear-to-b from-primary/10 to-primary/2 p-4"
    >
      <div className="flex items-center justify-between gap-2">
        <Badge variant={checkinAbierto ? "info" : "neutral"}>
          {checkinAbierto ? "Check-in" : "Inscrito"}
        </Badge>
        <span className="text-label text-primary">
          Faltan {formatCuentaAtras(restantes)}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <GameArt
          src={torneo.imagen}
          color1={torneo.juego.color1}
          color2={torneo.juego.color2}
          abreviatura={torneo.juego.abreviatura}
          className="size-16"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-h3 text-ink">{torneo.nombre}</h3>
          <p className="mt-0.5 text-caption text-ink-3">
            {formatFechaHora(torneo.fechaInicio, ahora)}
          </p>
        </div>
        {checkinAbierto ? (
          <Link
            href={`/torneo/${torneo.id}/sala`}
            className={buttonVariants({ size: "sm" })}
          >
            <Check />
            Check-in
          </Link>
        ) : (
          <Link
            href={`/torneo/${torneo.id}`}
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            Ver torneo
          </Link>
        )}
      </div>
    </section>
  );
}
