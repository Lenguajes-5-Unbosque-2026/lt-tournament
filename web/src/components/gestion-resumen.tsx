"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Clock, GitFork, Megaphone, MoreHorizontal, PencilLine, Eye, BarChart3, Ban, Users } from "lucide-react";
import { toast } from "sonner";
import { NavSegment } from "@/components/nav-segment";
import { QuickAction } from "@/components/quick-action";
import { Stat } from "@/components/stat";
import { StageList } from "@/components/stage-list";
import { Topbar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { AHORA } from "@/lib/ahora";
import { ETAPAS, etapaActual, type ResumenGestion } from "@/lib/gestion";
import { formatFechaHora } from "@/lib/format";

const ESTADO: Record<string, string> = {
  abierto: "Publicado",
  checkin: "Check-in",
  en_curso: "En curso",
  finalizado: "Finalizado",
  cancelado: "Cancelado",
  borrador: "Borrador",
};

/** Las pestañas de gestión del torneo, con la activa marcada. */
export function pestanasGestion(r: ResumenGestion, activa: "resumen" | "inscritos") {
  const base = `/org/torneos/${r.torneoId}`;
  return [
    { label: "Resumen", href: base, active: activa === "resumen" },
    { label: "Inscritos", href: `${base}/inscritos`, active: activa === "inscritos" },
    { label: "Bracket", href: r.conBracket ? `${base}/bracket` : undefined },
    {
      label: "Result.",
      href: r.estado === "finalizado" ? `${base}/estadisticas` : r.conBracket ? `${base}/bracket/cierre` : undefined,
    },
  ];
}

/**
 * Gestionar · Resumen (O07): estado del torneo, cifras (inscritos, check-in y
 * lista de espera), etapas y acciones rápidas. El menú «⋯» ofrece ver el
 * torneo como jugador, las estadísticas y cancelarlo.
 */
export function GestionResumen({ r }: { r: ResumenGestion }) {
  const [menu, setMenu] = useState(false);
  const base = `/org/torneos/${r.torneoId}`;
  const etapa = etapaActual(r.estado);
  const cancelable = r.estado === "abierto" || r.estado === "checkin";

  const opciones = [
    { icon: Eye, label: "Ver como jugador", href: `/torneo/${r.torneoId}`, peligro: false },
    ...(r.estado === "finalizado"
      ? [{ icon: BarChart3, label: "Estadísticas", href: `${base}/estadisticas`, peligro: false }]
      : []),
    ...(cancelable
      ? [{ icon: Ban, label: "Cancelar torneo", href: `${base}/cancelar`, peligro: true }]
      : []),
  ];

  return (
    <>
      <Topbar
        title={r.nombre.split(" ").slice(0, 2).join(" ")}
        subtitle={`${ESTADO[r.estado] ?? r.estado} · ${formatFechaHora(r.fechaInicio, AHORA)}`}
        fallbackHref="/org/torneos"
        actions={
          <Button variant="glass" size="icon" aria-label="Más opciones" onClick={() => setMenu(true)}>
            <MoreHorizontal />
          </Button>
        }
      />

      <div className="mt-4">
        <NavSegment label="Secciones del torneo" items={pestanasGestion(r, "resumen")} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <Stat icon={Users} value={`${r.inscritos}/${r.cupos}`} label="Inscritos" tone="info" />
        <Stat icon={Check} value={String(r.checkins)} label="Check-in" tone="success" />
        <Stat icon={Clock} value={String(r.enEspera)} label="Lista espera" tone="info" />
      </div>
      <Progress
        value={(r.inscritos / r.cupos) * 100}
        aria-label="Cupos ocupados"
        className="mt-4"
      />

      {etapa !== null ? (
        <div className="mt-4">
          <StageList etapas={ETAPAS} actual={etapa} />
        </div>
      ) : (
        <p className="mt-4 rounded-lg border border-line bg-surface p-4 text-small text-ink-2">
          Este torneo está {ESTADO[r.estado]?.toLowerCase()}.
        </p>
      )}

      <h2 className="mt-6 text-h1 text-ink">Acciones rápidas</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <QuickAction
          icon={Clock}
          titulo="Abrir check-in"
          detalle={`${r.minutosAntes} min antes`}
          href={`${base}/checkin`}
        />
        <QuickAction icon={Megaphone} titulo="Anuncio" detalle="Fija un mensaje" href={`${base}/chat`} />
        <QuickAction
          icon={GitFork}
          titulo="Bracket"
          detalle="Generar llaves"
          href={r.conBracket ? `${base}/bracket` : undefined}
          onClick={() => toast("El bracket de este torneo aún no está disponible")}
        />
        <QuickAction
          icon={PencilLine}
          titulo="Editar"
          detalle="Fecha, reglas…"
          onClick={() => toast("Editar llega pronto")}
        />
      </div>

      <Drawer open={menu} onOpenChange={setMenu} showSwipeHandle>
        <DrawerContent className="mx-auto! w-full max-w-phone">
          <div className="overflow-y-auto px-screen pt-2.5 pb-8.5">
            <DrawerTitle className="mt-2">{r.nombre}</DrawerTitle>
            <ul className="mt-4 flex flex-col gap-3">
              {opciones.map(({ icon: Icon, label, href, peligro }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center gap-3 rounded-lg border border-line bg-surface p-3.5 text-strong outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span
                      className={`flex size-10 items-center justify-center rounded-sm ${peligro ? "bg-danger-soft text-danger" : "bg-surface-3 text-ink-2"}`}
                    >
                      <Icon className="size-icon-btn" aria-hidden />
                    </span>
                    <span className={peligro ? "text-danger" : "text-ink"}>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
