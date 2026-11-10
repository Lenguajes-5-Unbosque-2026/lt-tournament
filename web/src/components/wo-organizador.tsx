"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { OptionGroup } from "@/components/option-group";
import { PlayerStatusRow } from "@/components/player-status-row";
import { Topbar } from "@/components/topbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { formatHora } from "@/lib/format";
import {
  TOLERANCIA_CHECKIN_MIN,
  ausente,
  checkinDe,
  presente,
  type PartidoIncidencia,
} from "@/lib/incidencia";

/**
 * Resolver partido, vista del organizador (W1): quién hizo check-in y quién
 * no, y cómo resolver. Solo entra al MVP la victoria por W.O.; descalificar
 * y reprogramar se ven pero no se pueden elegir. Todavía no guarda.
 */
export function WoOrganizador({ partido }: { partido: PartidoIncidencia }) {
  const router = useRouter();
  const bracket = `/org/torneos/${partido.torneoId}/bracket`;
  const falta = ausente(partido);
  const ok = presente(partido);
  const horaOk = checkinDe(partido, ok.id);
  const [decision, setDecision] = useState("wo");
  const [aplicando, setAplicando] = useState(false);

  function aplicar() {
    setAplicando(true);
    // Sin backend todavía: la decisión se guarda al conectar Supabase.
    toast.success("Victoria por W.O. aplicada", {
      description: `${ok.nombre} avanza. ${falta.nombre} queda fuera del torneo.`,
    });
    router.push(bracket);
  }

  return (
    <>
      <Topbar
        title="Resolver partido"
        subtitle={partido.subtitulo}
        leading="close"
        fallbackHref={bracket}
        onLeadingClick={() => router.push(bracket)}
      />

      <section aria-labelledby="checkin-titulo" className="mt-5">
        <h2 id="checkin-titulo" className="text-h2 text-ink">
          Check-in del partido
        </h2>
        <ul className="mt-3 flex flex-col gap-3">
          <PlayerStatusRow
            jugador={ok}
            titulo={`${ok.nombre} ${horaOk ? "hizo check-in" : "sin check-in"}`}
            detalle={horaOk ? `A las ${formatHora(horaOk)}` : "Sin check-in"}
          />
          <PlayerStatusRow
            jugador={falta}
            titulo={`${falta.nombre} no se presentó`}
            detalle={`Sin check-in · tolerancia de ${TOLERANCIA_CHECKIN_MIN} min vencida`}
          />
        </ul>
      </section>

      <div className="mt-4 flex flex-col gap-4">
        <Alert variant="warning">
          <TriangleAlert aria-hidden />
          <AlertTitle>{falta.nombre} no se presentó</AlertTitle>
          <AlertDescription>Elige cómo resolver el partido.</AlertDescription>
        </Alert>

        <OptionGroup
          label="Cómo resolver el partido"
          value={decision}
          onValueChange={setDecision}
          options={[
            { value: "wo", titulo: `Victoria por W.O. para ${ok.nombre}` },
            { value: "descalificar", titulo: `Descalificar a ${falta.nombre} del torneo`, deshabilitado: true },
            { value: "reprogramar", titulo: "Reprogramar el partido", deshabilitado: true },
          ]}
        />

        <div className="flex flex-col gap-3">
          <Button className="w-full" disabled={decision !== "wo" || aplicando} onClick={aplicar}>
            <Check />
            Aplicar decisión
          </Button>
          <Button variant="secondary" className="w-full" onClick={() => router.push(bracket)}>
            Cancelar
          </Button>
        </div>
      </div>
    </>
  );
}
