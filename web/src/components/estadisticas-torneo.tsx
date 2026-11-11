"use client";

import { useRouter } from "next/navigation";
import { Check, Clock, Copy, Star, Users } from "lucide-react";
import { BarChart } from "@/components/bar-chart";
import { KeyValueList, type KeyValueRow } from "@/components/key-value-list";
import { Stat } from "@/components/stat";
import { Topbar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { formatDuracion, type EstadisticasTorneo } from "@/lib/organizador";

/**
 * Estadísticas de un torneo finalizado (O16): cuatro cifras, inscripciones por
 * día, incidencias y «Crear torneo similar». Solo muestra los datos que se
 * pueden calcular con lo que hay guardado.
 */
export function EstadisticasTorneoView({ e }: { e: EstadisticasTorneo }) {
  const router = useRouter();
  const mejor = [...e.porDia].sort((a, b) => b.inscripciones - a.inscripciones)[0];

  const filas: KeyValueRow[] = [
    { label: "Partidos con disputa", value: `${e.conDisputa} de ${e.partidos}` },
  ];
  if (e.reporteMedioMin !== null) {
    filas.push({ label: "Tiempo medio de reporte", value: `${e.reporteMedioMin} min` });
  }

  return (
    <>
      <Topbar
        title="Estadísticas"
        subtitle={`${e.torneoNombre} · Finalizado`}
        fallbackHref="/org/perfil"
      />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Stat icon={Users} value={String(e.inscritos)} label="Inscritos" tone="info" />
        <Stat icon={Check} value={`${e.asistencia}%`} label="Asistencia" tone="success" />
        <Stat
          icon={Clock}
          value={e.duracionMin === null ? "—" : formatDuracion(e.duracionMin)}
          label="Duración"
          tone="info"
        />
        <Stat
          icon={Star}
          value={e.valoracion.toFixed(1).replace(".", ",")}
          label="Valoración"
          tone="warning"
        />
      </div>

      {e.porDia.length > 0 && (
        <section
          aria-labelledby="por-dia-titulo"
          className="mt-3 rounded-lg border border-line bg-surface p-4"
        >
          <h2 id="por-dia-titulo" className="text-strong text-ink">
            Inscripciones por día
          </h2>
          <p className="mt-2 text-caption text-ink-3">
            {mejor && `El día con más inscripciones fue ${mejor.dia}.`}
          </p>
          <div className="mt-4">
            <BarChart
              label="Inscripciones por día"
              datos={e.porDia.map((d) => ({ label: d.dia, valor: d.inscripciones }))}
            />
          </div>
        </section>
      )}

      <KeyValueList className="mt-3" rows={filas} />

      <Button className="mt-4 w-full" onClick={() => router.push(`/org/crear?similar=${e.torneoId}`)}>
        <Copy />
        Crear torneo similar
      </Button>
    </>
  );
}
