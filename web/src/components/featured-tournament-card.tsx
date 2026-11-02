import Image from "next/image";
import Link from "next/link";
import { Calendar, Users } from "lucide-react";
import { StatusTag } from "@/components/status-tag";
import { buttonVariants } from "@/components/ui/button";
import { formatDia } from "@/lib/format";
import { etiquetaEstado } from "@/lib/torneo";
import type { Torneo } from "@/lib/types";

/**
 * Tarjeta de torneo destacada (design/ui kit.md §5.13): arte a ancho
 * completo con el nombre en display, la etiqueta y el CTA «Inscribirme»
 * encima de la imagen.
 */
export function FeaturedTournamentCard({
  torneo,
  ahora,
}: {
  torneo: Torneo;
  ahora: string;
}) {
  const href = `/torneo/${torneo.id}`;

  return (
    <article
      className="relative flex h-58 flex-col justify-end overflow-hidden rounded-xl border border-line p-4"
      style={{
        backgroundImage: `linear-gradient(140deg, ${torneo.juego.color1}, ${torneo.juego.color2})`,
      }}
    >
      {torneo.imagen && (
        <Image
          src={`/mock/${torneo.imagen}`}
          alt=""
          fill
          sizes="(max-width: 390px) 100vw, 390px"
          className="object-cover"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-bg/95 via-bg/40 to-transparent"
      />

      <div className="relative">
        <StatusTag estado={etiquetaEstado(torneo)} />
        <h3 className="mt-2 font-display text-display-m text-ink uppercase italic">
          <Link href={href} className="after:absolute after:inset-0">
            {torneo.nombre}
          </Link>
        </h3>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="flex items-center gap-4 text-caption text-ink-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-icon-meta" aria-hidden />
              {formatDia(torneo.fechaInicio, ahora)}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-icon-meta" aria-hidden />
              {torneo.inscritos}/{torneo.cupos} cupos
            </span>
          </p>
          <Link href={href} className={`${buttonVariants({ size: "sm" })} relative`}>
            Inscribirme
          </Link>
        </div>
      </div>
    </article>
  );
}
