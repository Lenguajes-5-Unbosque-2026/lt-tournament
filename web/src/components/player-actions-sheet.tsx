"use client";

import Link from "next/link";
import { ChevronRight, Clock, Check, MessageCircle, Trash2, User, type LucideIcon } from "lucide-react";
import { PlayerAvatar } from "@/components/player-avatar";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { AHORA } from "@/lib/ahora";
import { formatHace } from "@/lib/format";
import type { Inscrito } from "@/lib/gestion";
import { cn } from "@/lib/utils";

type Accion = {
  icon: LucideIcon;
  label: string;
  tono: "neutral" | "success" | "info" | "danger";
  href?: string;
  onClick?: () => void;
};

const TONOS = {
  neutral: "bg-surface-3 text-ink-2",
  success: "bg-success-soft text-success",
  info: "bg-info-soft text-info",
  danger: "bg-danger-soft text-danger",
} as const;

/**
 * Acciones sobre un jugador (O09): hoja inferior con su nombre y cuándo se
 * inscribió, y cinco acciones. «Expulsar» va en rojo y abre la confirmación.
 */
export function PlayerActionsSheet({
  torneoId,
  jugador,
  onOpenChange,
  onProfile,
  onCheckin,
  onWaitlist,
  onExpel,
}: {
  torneoId: string;
  /** Jugador elegido; `null` cierra la hoja. */
  jugador: Inscrito | null;
  onOpenChange: (open: boolean) => void;
  onProfile: () => void;
  onCheckin: () => void;
  onWaitlist: () => void;
  onExpel: () => void;
}) {
  const acciones: Accion[] = jugador
    ? [
        { icon: User, label: "Ver perfil competitivo", tono: "neutral", onClick: onProfile },
        {
          icon: MessageCircle,
          label: "Enviar mensaje",
          tono: "neutral",
          href: `/org/torneos/${torneoId}/chat?mencion=${encodeURIComponent(jugador.nombre)}`,
        },
        { icon: Check, label: "Marcar check-in manual", tono: "success", onClick: onCheckin },
        { icon: Clock, label: "Mover a lista de espera", tono: "info", onClick: onWaitlist },
        { icon: Trash2, label: "Expulsar del torneo", tono: "danger", onClick: onExpel },
      ]
    : [];

  return (
    <Drawer open={jugador !== null} onOpenChange={onOpenChange} showSwipeHandle>
      <DrawerContent className="mx-auto! w-full max-w-phone">
        {jugador && (
          <div className="overflow-y-auto px-screen pt-2.5 pb-8.5">
            <div className="mt-2 flex items-center gap-3.5">
              <PlayerAvatar
                imagen={jugador.imagen}
                color1={jugador.color1}
                color2={jugador.color2}
                className="size-14 ring-2 ring-primary ring-offset-2 ring-offset-popover"
              />
              <div>
                <p className="text-h2 text-ink">{jugador.nombre}</p>
                <p className="text-caption text-ink-3">
                  Inscrito {formatHace(jugador.inscritoEn, AHORA).toLowerCase()}
                </p>
              </div>
            </div>

            <ul className="mt-5 flex flex-col gap-3">
              {acciones.map(({ icon: Icon, label, tono, href, onClick }) => {
                const clases =
                  "flex w-full items-center gap-3 rounded-lg border border-line bg-surface p-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring";
                const contenido = (
                  <>
                    <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-sm", TONOS[tono])}>
                      <Icon className="size-icon-btn" aria-hidden />
                    </span>
                    <span className={cn("flex-1 text-strong", tono === "danger" ? "text-danger" : "text-ink")}>
                      {label}
                    </span>
                    <ChevronRight
                      className={cn("size-icon-btn", tono === "danger" ? "text-danger" : "text-ink-3")}
                      aria-hidden
                    />
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <Link href={href} className={clases}>
                        {contenido}
                      </Link>
                    ) : (
                      <button type="button" onClick={onClick} className={clases}>
                        {contenido}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
