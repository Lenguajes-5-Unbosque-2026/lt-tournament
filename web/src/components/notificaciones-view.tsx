"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Clock,
  Flag,
  Sparkles,
  Swords,
  Ticket,
  TriangleAlert,
  Trophy,
  X,
  type LucideIcon,
} from "lucide-react";
import { Topbar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { AHORA } from "@/lib/ahora";
import { diasHasta, formatDia, formatDiaSemana, formatHace } from "@/lib/format";
import type { Notificacion, TipoNotificacion } from "@/lib/progreso";
import { cn } from "@/lib/utils";

type Tono = "accent" | "success" | "info" | "warning" | "danger";

const TONOS: Record<Tono, string> = {
  accent: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  info: "bg-info-soft text-info",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
};

const TIPOS: Record<TipoNotificacion, { icon: LucideIcon; tono: Tono }> = {
  checkin: { icon: Clock, tono: "accent" },
  resultado: { icon: Check, tono: "success" },
  reto: { icon: Swords, tono: "info" },
  inscripcion: { icon: Ticket, tono: "info" },
  recomendado: { icon: Sparkles, tono: "accent" },
  ranking: { icon: Trophy, tono: "warning" },
  disputa: { icon: TriangleAlert, tono: "warning" },
  wo: { icon: Flag, tono: "danger" },
  espera: { icon: Clock, tono: "info" },
  cancelado: { icon: X, tono: "danger" },
  bienvenida: { icon: Sparkles, tono: "accent" },
};

/** A dónde lleva cada aviso al tocarlo. */
function destino(n: Notificacion) {
  const id = n.torneoId;
  if (n.tipo === "checkin" && id) return `/torneo/${id}/sala`;
  if ((n.tipo === "resultado" || n.tipo === "disputa" || n.tipo === "wo") && id) {
    return `/torneo/${id}/bracket`;
  }
  if (id) return `/torneo/${id}`;
  if (n.tipo === "reto" || n.tipo === "ranking") return "/rankings";
  return "/explorar";
}

type Grupo = "hoy" | "semana" | "antes";

function grupoDe(iso: string): Grupo {
  const dias = -diasHasta(iso, AHORA);
  return dias <= 0 ? "hoy" : dias <= 7 ? "semana" : "antes";
}

/** «Ahora», «2 h» (hoy), «Lun» (esta semana) o «12 Oct». */
function cuando(iso: string, grupo: Grupo) {
  if (grupo === "hoy") {
    const hace = formatHace(iso, AHORA);
    return hace === "Hace un momento" ? "Ahora" : hace.replace("Hace ", "");
  }
  return grupo === "semana" ? formatDiaSemana(iso) : formatDia(iso).replace(/^\S+ /, "");
}

const TITULOS: Record<Grupo, string> = { hoy: "Hoy", semana: "Esta semana", antes: "Antes" };

/**
 * Notificaciones (J22): avisos agrupados por día. Los no leídos llevan borde
 * de acento; el check de arriba los marca todos como leídos (en pantalla, hasta
 * conectar Supabase).
 */
export function NotificacionesView({ avisos }: { avisos: Notificacion[] }) {
  const [leidas, setLeidas] = useState<Set<string>>(
    () => new Set(avisos.filter((a) => a.leida).map((a) => a.id)),
  );
  const sinLeer = avisos.some((a) => !leidas.has(a.id));

  const grupos = (["hoy", "semana", "antes"] as const)
    .map((g) => ({ grupo: g, items: avisos.filter((a) => grupoDe(a.creadoEn) === g) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <Topbar
        title="Notificaciones"
        fallbackHref="/inicio"
        actions={
          <Button
            variant="glass"
            size="icon"
            aria-label="Marcar todo como leído"
            disabled={!sinLeer}
            onClick={() => setLeidas(new Set(avisos.map((a) => a.id)))}
          >
            <Check />
          </Button>
        }
      />

      {avisos.length === 0 ? (
        <p className="mt-10 text-center text-small text-ink-3">Aún no tienes avisos.</p>
      ) : (
        grupos.map(({ grupo, items }) => (
          <section key={grupo} aria-labelledby={`grupo-${grupo}`} className="mt-5">
            <h2 id={`grupo-${grupo}`} className="mb-3 text-overline text-ink-3 uppercase">
              {TITULOS[grupo]}
            </h2>
            <ul className="flex flex-col gap-3">
              {items.map((a) => {
                const { icon: Icon, tono } = TIPOS[a.tipo] ?? TIPOS.bienvenida;
                const nueva = !leidas.has(a.id);
                return (
                  <li key={a.id}>
                    <Link
                      href={destino(a)}
                      onClick={() => setLeidas((l) => new Set(l).add(a.id))}
                      className={cn(
                        "flex items-center gap-3.5 rounded-lg border bg-surface p-3.5 outline-none transition-transform duration-(--dur-fast) ease-out focus-visible:ring-2 focus-visible:ring-ring active:scale-99",
                        nueva ? "border-primary-line" : "border-line",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-11 shrink-0 items-center justify-center rounded-md",
                          TONOS[tono],
                        )}
                      >
                        <Icon className="size-icon-btn" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-strong text-ink">{a.titulo}</span>
                        <span className="block truncate text-caption text-ink-3">{a.texto}</span>
                      </span>
                      <span className={cn("shrink-0 text-caption", nueva ? "text-primary" : "text-ink-3")}>
                        {cuando(a.creadoEn, grupo)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}
    </>
  );
}
