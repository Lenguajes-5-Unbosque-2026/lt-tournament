"use client";

import { Headphones, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { PlayerAvatar } from "@/components/player-avatar";
import { Button } from "@/components/ui/button";
import { compartirEnlace } from "@/lib/compartir";
import { formatPuntos } from "@/lib/format";
import type { Amigo } from "@/lib/progreso";
import { cn } from "@/lib/utils";

/**
 * Rankings · Amigos (J21): tarjeta «Compite con tus amigos» con el enlace de
 * invitación y la lista del jugador y sus amigos por puntos, con «Retar».
 * «Retar» es un partido amistoso fuera de los torneos y no suma puntos; por
 * ahora solo avisa (el envío llega con Supabase).
 */
export function AmigosRanking({
  amigos,
  invitacion,
}: {
  amigos: Amigo[];
  /** Enlace para invitar: lt.gg/invitar/johitan */
  invitacion: string;
}) {
  return (
    <>
      <section
        aria-labelledby="invitar-titulo"
        className="rounded-lg border border-primary-line bg-linear-to-b from-primary/10 to-primary/2 p-4"
      >
        <div className="flex items-center gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
            <Headphones className="size-7" strokeWidth={1.5} aria-hidden />
          </span>
          <div>
            <h2 id="invitar-titulo" className="text-strong text-ink">
              Compite con tus amigos
            </h2>
            <p className="text-small text-ink-2">
              Invítalos y comparen su progreso en todos los juegos.
            </p>
          </div>
        </div>
        <Button
          variant="secondary"
          className="mt-4 w-full"
          onClick={() => compartirEnlace("Únete a LTournaments", `https://${invitacion}`)}
        >
          <LinkIcon />
          Compartir invitación
        </Button>
      </section>

      <ul className="mt-4 flex flex-col gap-3">
        {amigos.map((a) => (
          <li
            key={a.id}
            className={cn(
              "flex items-center gap-3 rounded-lg border bg-surface p-3",
              a.esYo ? "border-primary-line bg-primary-soft" : "border-line",
            )}
          >
            <PlayerAvatar
              imagen={a.imagen}
              color1={a.color1}
              color2={a.color2}
              className={cn(
                "size-12",
                a.esYo && "ring-2 ring-primary ring-offset-2 ring-offset-bg",
              )}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-strong text-ink">{a.nombre}</p>
              <p className="text-caption text-ink-3">
                {a.esYo ? "Tú" : `Nivel ${a.nivel}`} · {formatPuntos(a.puntos)} pts
              </p>
            </div>
            {a.esYo ? (
              <span className="px-3 text-small text-ink-3">Tú</span>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  toast.success(`Reto enviado a ${a.nombre}`, {
                    description: "Un partido amistoso: no suma puntos.",
                  })
                }
              >
                Retar
              </Button>
            )}
          </li>
        ))}
      </ul>
      {amigos.length <= 1 && (
        <p className="mt-4 text-center text-small text-ink-3">
          Aún no tienes amigos. Comparte tu invitación.
        </p>
      )}
    </>
  );
}
