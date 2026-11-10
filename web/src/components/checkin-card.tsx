"use client";

import { useEffect, useState } from "react";
import { Check, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { VENTANA_CHECKIN_MIN, type VentanaCheckin } from "@/lib/checkin";
import { formatCuentaAtras, formatHora } from "@/lib/format";

/**
 * Contador de check-in (patrón 5.30, design/componentes.md #41): etiqueta,
 * hora de cierre, cuenta atrás grande, barra de lo que queda de la ventana y
 * el botón «Hacer check-in». Tres estados según la hora: pronto (aún no
 * abre), abierto y cerrado; y el del jugador que ya lo hizo.
 */
export function CheckinCard({
  ventana,
  hecho,
  onCheckin,
}: {
  ventana: VentanaCheckin;
  /** Hora de su check-in (ISO) si ya lo hizo. */
  hecho: string | null;
  onCheckin: () => void;
}) {
  const [segundos, setSegundos] = useState(ventana.faltanSegundos);

  useEffect(() => {
    if (ventana.estado === "cerrado") return;
    const id = setInterval(() => setSegundos((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [ventana.estado]);

  const abierto = ventana.estado === "abierto";
  const restante = abierto ? Math.min(1, segundos / (VENTANA_CHECKIN_MIN * 60)) : ventana.restante;

  return (
    <section
      aria-label="Check-in"
      className="rounded-lg border border-primary-line bg-linear-to-b from-primary/10 to-primary/2 p-4"
    >
      <div className="flex items-center justify-between gap-2">
        <Badge variant={hecho ? "success" : ventana.estado === "cerrado" ? "danger" : "info"}>
          {hecho ? "Hecho" : ventana.estado === "cerrado" ? "Cerrado" : "Check-in"}
        </Badge>
        <span className="text-caption text-ink-3">
          {ventana.estado === "pronto"
            ? `Abre ${formatHora(ventana.abre)}`
            : `Cierra ${formatHora(ventana.cierre)}`}
        </span>
      </div>

      {ventana.estado === "cerrado" || hecho ? (
        <div className="mt-3 flex items-center gap-3">
          <span
            className={`flex size-11 shrink-0 items-center justify-center rounded-md ${hecho ? "bg-success-soft text-success" : "bg-danger-soft text-danger"}`}
          >
            {hecho ? <Check className="size-icon-nav" /> : <Clock className="size-icon-nav" />}
          </span>
          <div>
            <p className="text-strong text-ink">
              {hecho ? "Check-in hecho" : "El check-in cerró"}
            </p>
            <p className="text-caption text-ink-3">
              {hecho
                ? `Quedaste listo a las ${formatHora(hecho)}. Te esperamos en tu partido.`
                : "No hiciste el check-in a tiempo."}
            </p>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-2 font-display text-numeric-xl text-ink italic" aria-live="off">
            {formatCuentaAtras(segundos)}
          </p>
          <p className="text-small text-ink-3">
            {abierto ? "para que cierre el check-in" : "para que abra el check-in"}
          </p>
          <Progress value={restante * 100} aria-label="Tiempo restante" className="mt-3" />
          <Button className="mt-4 w-full" disabled={!abierto} onClick={onCheckin}>
            <Check />
            Hacer check-in
          </Button>
        </>
      )}
    </section>
  );
}
