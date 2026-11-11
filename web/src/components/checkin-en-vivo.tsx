"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, GitFork, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { PlayerStatusRow } from "@/components/player-status-row";
import { Topbar } from "@/components/topbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AHORA } from "@/lib/ahora";
import { ventanaCheckin } from "@/lib/checkin";
import { formatHora } from "@/lib/format";
import type { Inscrito } from "@/lib/gestion";

/** 2538 → «42:18»; con horas, «1:02:18». */
function reloj(segundos: number) {
  const s = Math.max(0, Math.floor(segundos));
  const h = Math.floor(s / 3600);
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return h > 0 ? `${h}:${m}:${ss}` : `${m}:${ss}`;
}

/**
 * Check-in en vivo (O11): cuántos confirmaron, quién falta y el cierre. Los
 * recordatorios y el cierre solo avisan en pantalla hasta conectar Supabase.
 */
export function CheckinEnVivo({
  torneoId,
  torneoNombre,
  fechaInicio,
  minutosAntes,
  jugadores,
  conBracket,
}: {
  torneoId: string;
  torneoNombre: string;
  fechaInicio: string;
  minutosAntes: number;
  /** Confirmados y pendientes; los de la lista de espera no hacen check-in. */
  jugadores: Inscrito[];
  conBracket: boolean;
}) {
  const router = useRouter();
  const ventana = ventanaCheckin(fechaInicio, minutosAntes, AHORA);
  const [segundos, setSegundos] = useState(ventana.faltanSegundos);
  const [recordados, setRecordados] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (ventana.estado === "cerrado") return;
    const id = setInterval(() => setSegundos((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [ventana.estado]);

  // Quienes ya confirmaron primero, por hora; después los que faltan.
  const ordenados = [...jugadores].sort((a, b) => {
    if (a.checkinEn && b.checkinEn) return a.checkinEn.localeCompare(b.checkinEn);
    return a.checkinEn ? -1 : b.checkinEn ? 1 : 0;
  });
  const confirmados = jugadores.filter((j) => j.checkinEn).length;
  const faltan = jugadores.length - confirmados;

  const subtitulo =
    ventana.estado === "abierto"
      ? `Cierra en ${reloj(segundos)}`
      : ventana.estado === "pronto"
        ? `Abre a las ${formatHora(ventana.abre)}`
        : `Cerró a las ${formatHora(ventana.cierre)}`;

  function cerrar() {
    toast.success("Check-in cerrado", {
      description: `${faltan} ${faltan === 1 ? "jugador pasó" : "jugadores pasaron"} a la lista de espera.`,
    });
    router.push(conBracket ? `/org/torneos/${torneoId}/bracket` : `/org/torneos/${torneoId}`);
  }

  return (
    <>
      <Topbar title="Check-in" subtitle={subtitulo} fallbackHref={`/org/torneos/${torneoId}`} />

      <section
        aria-label={`Check-in de ${torneoNombre}`}
        className="mt-4 rounded-lg border border-primary-line bg-linear-to-b from-primary/10 to-primary/2 p-4"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="font-display text-numeric-xl text-ink italic">
            {confirmados}/{jugadores.length}
          </p>
          {ventana.estado === "abierto" && (
            <Badge variant="danger" live>
              En vivo
            </Badge>
          )}
        </div>
        <p className="mt-1 text-small text-ink-2">jugadores confirmaron su asistencia</p>
        <Progress
          tone="success"
          value={jugadores.length ? (confirmados / jugadores.length) * 100 : 0}
          aria-label="Jugadores con check-in"
          className="mt-3"
        />
      </section>

      {faltan > 0 && (
        <Alert variant="warning" className="mt-4">
          <TriangleAlert aria-hidden />
          <AlertTitle>
            {faltan} {faltan === 1 ? "jugador sin check-in" : "jugadores sin check-in"}
          </AlertTitle>
          <AlertDescription>
            Si no confirman antes del cierre, su cupo pasa a la lista de espera.
          </AlertDescription>
        </Alert>
      )}

      <ul className="mt-4 flex flex-col gap-3">
        {ordenados.map((j) => (
          <PlayerStatusRow
            key={j.id}
            jugador={j}
            titulo={j.nombre}
            detalle={j.checkinEn ? `Confirmó ${formatHora(j.checkinEn)}` : "Sin confirmar"}
            trailing={
              j.checkinEn ? (
                <Badge variant="success">Confirmada</Badge>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={recordados.has(j.id)}
                  onClick={() => {
                    setRecordados((r) => new Set(r).add(j.id));
                    toast.success(`Le avisamos a ${j.nombre}`, {
                      description: "Le llegó un recordatorio del check-in.",
                    });
                  }}
                >
                  <Bell />
                  {recordados.has(j.id) ? "Enviado" : "Recordar"}
                </Button>
              )
            }
          />
        ))}
      </ul>

      <Button className="mt-4 w-full" onClick={cerrar}>
        <GitFork />
        Cerrar check-in y generar bracket
      </Button>
    </>
  );
}
