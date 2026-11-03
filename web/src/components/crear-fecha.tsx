"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Lock, Trophy } from "lucide-react";
import { CheckRow } from "@/components/check-row";
import { useCrearTorneo } from "@/components/crear-torneo-provider";
import { DateTimeField } from "@/components/date-time-field";
import { SwitchRow } from "@/components/switch-row";
import { TextField } from "@/components/text-field";
import { WizardHeader } from "@/components/wizard-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { AHORA } from "@/lib/ahora";
import { CHECKIN_MINUTOS, MAX_PREMIOS } from "@/lib/crear-config";
import { formatDia, formatFechaHora, formatHora } from "@/lib/format";

/** AAAA-MM-DD + HH:mm → instante ISO en hora de Bogotá (UTC−5). */
function aIso(fecha: string, hora: string) {
  return `${fecha}T${hora}:00-05:00`;
}

/** Resta minutos a un instante y lo devuelve como AAAA-MM-DDTHH:mm en hora de Bogotá. */
function restarMinutos(fecha: string, hora: string, minutos: number) {
  const t = new Date(aIso(fecha, hora)).getTime() - minutos * 60_000;
  return new Date(t - 5 * 3600_000).toISOString().slice(0, 16);
}

/** Paso 3 de 4 · Fecha y reglas (O04). */
export function CrearFecha() {
  const router = useRouter();
  const { borrador, actualizar } = useCrearTorneo();
  const f = borrador.fechaReglas;
  const cambiar = (parcial: Partial<typeof f>) =>
    actualizar({ fechaReglas: { ...f, ...parcial } });

  const hoy = formatFechaIso(AHORA);
  const inicio = f.fecha && f.hora ? aIso(f.fecha, f.hora) : null;
  const cierre = f.cierre ? `${f.cierre}:00-05:00` : null;

  const inicioPasado = inicio !== null && new Date(inicio) <= new Date(AHORA);
  const cierreTarde = inicio !== null && cierre !== null && new Date(cierre) > new Date(inicio);
  const completo = inicio !== null && cierre !== null && !inicioPasado && !cierreTarde;

  // Al elegir fecha y hora por primera vez, el cierre arranca 1 h antes del inicio.
  function cambiarInicio(parcial: { fecha?: string; hora?: string }) {
    const fecha = parcial.fecha ?? f.fecha;
    const hora = parcial.hora ?? f.hora;
    cambiar({
      ...parcial,
      ...(fecha && hora && !f.cierre ? { cierre: restarMinutos(fecha, hora, 60) } : {}),
    });
  }

  return (
    <>
      <WizardHeader paso={3} fallbackHref="/org/crear/formato" />

      <div className="mt-5 grid grid-cols-2 gap-3">
        <DateTimeField
          label="Fecha"
          icon={Calendar}
          type="date"
          value={f.fecha}
          min={hoy}
          display={f.fecha ? formatDia(aIso(f.fecha, "12:00")) : ""}
          placeholder="Elige el día"
          invalid={inicioPasado}
          onValueChange={(fecha) => cambiarInicio({ fecha })}
        />
        <DateTimeField
          label="Hora"
          icon={Clock}
          type="time"
          value={f.hora}
          display={f.hora ? formatHora(aIso("2026-01-01", f.hora)) : ""}
          placeholder="Elige la hora"
          invalid={inicioPasado}
          onValueChange={(hora) => cambiarInicio({ hora })}
        />
      </div>
      {inicioPasado && (
        <p className="mt-2 text-caption text-danger">El torneo debe empezar más adelante.</p>
      )}

      <div className="mt-5">
        <DateTimeField
          label="Cierre de inscripciones"
          icon={Lock}
          type="datetime-local"
          value={f.cierre}
          display={f.cierre ? formatFechaHora(`${f.cierre}:00-05:00`, "") : ""}
          placeholder="Elige el cierre"
          invalid={cierreTarde}
          onValueChange={(cierre) => cambiar({ cierre })}
          ayuda={
            cierreTarde
              ? "El cierre debe ser antes del inicio."
              : "Después de esta hora nadie más puede inscribirse."
          }
        />
      </div>

      <div className="mt-4">
        <SwitchRow
          titulo="Check-in obligatorio"
          descripcion={`${CHECKIN_MINUTOS} min antes del inicio`}
          checked={f.checkinObligatorio}
          onCheckedChange={(checkinObligatorio) => cambiar({ checkinObligatorio })}
        />
      </div>

      <section className="mt-5" aria-labelledby="reglas-titulo">
        <h2 id="reglas-titulo" className="mb-1 text-overline text-ink-3 uppercase">
          Reglas
        </h2>
        <CheckRow
          label="Reporte con captura del marcador"
          checked={f.capturaMarcador}
          onCheckedChange={(capturaMarcador) => cambiar({ capturaMarcador })}
        />
        <CheckRow
          label="Desconexión: se repite el partido una vez"
          checked={f.desconexion}
          onCheckedChange={(desconexion) => cambiar({ desconexion })}
        />
        <CheckRow
          label="Permitir suplentes"
          checked={f.suplentes}
          onCheckedChange={(suplentes) => cambiar({ suplentes })}
        />
      </section>

      <div className="mt-4">
        <TextField
          label="Premios (opcional)"
          icon={Trophy}
          value={f.premios}
          onValueChange={(premios) => cambiar({ premios })}
          maxLength={MAX_PREMIOS}
          placeholder="Trofeo para el campeón"
          ayuda="Los puntos de ranking se calculan solos según el puesto."
        />
      </div>

      <div className="mt-5 grid grid-cols-[1fr_1.4fr] gap-3">
        <Link href="/org/crear/formato" className={buttonVariants({ variant: "secondary" })}>
          Atrás
        </Link>
        <Button disabled={!completo} onClick={() => router.push("/org/crear/revision")}>
          Continuar
        </Button>
      </div>
    </>
  );
}

/** AAAA-MM-DD de un instante, visto en hora de Bogotá. */
function formatFechaIso(iso: string) {
  return new Date(new Date(iso).getTime() - 5 * 3600_000).toISOString().slice(0, 10);
}
