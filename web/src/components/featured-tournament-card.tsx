import Image from "next/image";
import Link from "next/link";
import { Calendar, Users } from "lucide-react";
import { StatusTag } from "@/components/status-tag";
import { buttonVariants } from "@/components/ui/button";
import { formatDia } from "@/lib/format";
import { etiquetaEstado } from "@/lib/torneo";
import type { Torneo } from "@/lib/types";
import { srcImagen } from "@/lib/imagen";

/**
 * Tarjeta de torneo destacada (design/ui kit.md §5.13): arte a ancho
 * completo con el nombre en display, la etiqueta y el CTA «Inscribirme»
 * encima de la imagen.
 *
 * Con `vistaPrevia` se usa en la revisión del asistente (O05): no es un
 * enlace y puede mostrar una portada local (`imagenLocal`, una URL blob:).
 */
export function FeaturedTournamentCard({
  torneo,
  ahora,
  vistaPrevia = false,
  imagenLocal,
}: {
  torneo: Torneo;
  ahora: string;
  vistaPrevia?: boolean;
  imagenLocal?: string | null;
}) {
  const href = `/torneo/${torneo.id}`;
  const boton = `${buttonVariants({ size: "sm" })} relative`;

  return (
    <article
      className="relative flex h-58 flex-col justify-end overflow-hidden rounded-xl border border-line p-4"
      style={{
        backgroundImage: `linear-gradient(140deg, ${torneo.juego.color1}, ${torneo.juego.color2})`,
      }}
    >
      {imagenLocal ? (
        // URL local (blob:): next/image no la optimiza.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imagenLocal} alt="" className="absolute inset-0 size-full object-cover" />
      ) : (
        torneo.imagen && (
          <Image
            src={srcImagen(torneo.imagen)}
            alt=""
            fill
            sizes="(max-width: 390px) 100vw, 390px"
            className="object-cover"
          />
        )
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-bg/95 via-bg/40 to-transparent"
      />

      <div className="relative">
        <StatusTag estado={etiquetaEstado(torneo)} />
        <h3 className="mt-2 font-display text-display-m text-ink uppercase italic">
          {vistaPrevia ? (
            torneo.nombre
          ) : (
            <Link href={href} className="after:absolute after:inset-0">
              {torneo.nombre}
            </Link>
          )}
        </h3>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="flex items-center gap-4 text-caption text-ink-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-icon-meta" aria-hidden />
              {formatDia(torneo.fechaInicio, vistaPrevia ? undefined : ahora)}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-icon-meta" aria-hidden />
              {torneo.inscritos}/{torneo.cupos} cupos
            </span>
          </p>
          {vistaPrevia ? (
            <span aria-hidden className={boton}>
              Inscribirme
            </span>
          ) : (
            <Link href={href} className={boton}>
              Inscribirme
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
