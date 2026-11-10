"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { OptionGroup } from "@/components/option-group";
import { PlayerStatusRow } from "@/components/player-status-row";
import { ScoreVersus } from "@/components/score-versus";
import { Topbar } from "@/components/topbar";
import { UploadZone } from "@/components/upload-zone";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AHORA } from "@/lib/ahora";
import { formatHace } from "@/lib/format";
import { marcadorDe, type PartidoIncidencia } from "@/lib/incidencia";

/**
 * Resolver disputa, vista del organizador (D2): los reportes de cada jugador,
 * el marcador oficial, el ganador y la prueba. «Confirmar ganador» cierra la
 * disputa y el ganador avanza; «Pedir nueva captura» devuelve la decisión a
 * los jugadores. Todavía no guarda: eso llega con Supabase.
 */
export function DisputaOrganizador({ partido }: { partido: PartidoIncidencia }) {
  const router = useRouter();
  const bracket = `/org/torneos/${partido.torneoId}/bracket`;
  const { a, b } = partido;

  // Arranca con el reporte que trae captura: es el que el organizador puede comprobar.
  const base = partido.reportes.find((r) => r.captura) ?? partido.reportes[0];
  const [marcadorA, setMarcadorA] = useState(base?.marcadorA ?? 0);
  const [marcadorB, setMarcadorB] = useState(base?.marcadorB ?? 0);
  const lider = marcadorA > marcadorB ? a.id : marcadorB > marcadorA ? b.id : null;
  const [ganador, setGanador] = useState<string | null>(lider);
  const [prueba, setPrueba] = useState<string | null>(
    base?.captura ? `/mock/${base.captura}` : null,
  );
  const [enviando, setEnviando] = useState(false);

  const coherente = lider !== null && ganador === lider;
  const ganadorNombre = ganador === a.id ? a.nombre : b.nombre;

  function cambiarMarcador(nuevoA: number, nuevoB: number) {
    setMarcadorA(nuevoA);
    setMarcadorB(nuevoB);
    // El ganador sigue al marcador; el organizador lo puede ajustar después.
    setGanador(nuevoA > nuevoB ? a.id : nuevoB > nuevoA ? b.id : null);
  }

  function confirmar() {
    setEnviando(true);
    // Sin backend todavía: el resultado se guarda al conectar Supabase.
    toast.success("Disputa resuelta", {
      description: `${ganadorNombre} avanza. Avisaremos a los dos jugadores.`,
    });
    router.push(bracket);
  }

  function pedirCaptura() {
    toast.success("Pedimos una nueva captura", {
      description: "Los dos jugadores recibirán el aviso.",
    });
    router.push(bracket);
  }

  return (
    <>
      <Topbar
        title="Resolver disputa"
        subtitle={partido.subtitulo}
        leading="close"
        fallbackHref={bracket}
        onLeadingClick={() => router.push(bracket)}
      />

      <div className="mt-5 flex flex-col gap-4">
        <ScoreVersus
          a={a}
          b={b}
          marcadorA={marcadorA}
          marcadorB={marcadorB}
          onChange={cambiarMarcador}
        />

        <section aria-labelledby="reportes-titulo">
          <h2 id="reportes-titulo" className="text-h2 text-ink">
            Reportes de los jugadores
          </h2>
          <ul className="mt-3 flex flex-col gap-3">
            {partido.reportes.map((r) => (
              <PlayerStatusRow
                key={r.jugador.id}
                jugador={r.jugador}
                titulo={`${r.jugador.nombre} reportó ${marcadorDe(r)}`}
                detalle={`${formatHace(r.creadoEn, AHORA)}${r.captura ? " · con captura" : ""}`}
                trailing={
                  r.captura && (
                    <Image
                      src={`/mock/${r.captura}`}
                      alt={`Captura de ${r.jugador.nombre}`}
                      width={48}
                      height={48}
                      className="size-12 shrink-0 rounded-sm object-cover"
                    />
                  )
                }
              />
            ))}
          </ul>
        </section>

        <Alert variant="warning">
          <TriangleAlert aria-hidden />
          <AlertTitle>Los reportes no coinciden</AlertTitle>
          <AlertDescription>
            Revisa la evidencia, elige al ganador y sube la captura oficial.
          </AlertDescription>
        </Alert>

        <div>
          <OptionGroup
            label="Ganador"
            value={ganador ?? ""}
            onValueChange={setGanador}
            options={[
              { value: a.id, titulo: `Ganador: ${a.nombre}` },
              { value: b.id, titulo: `Ganador: ${b.nombre}` },
            ]}
          />
          {!coherente && (
            <p className="mt-2 text-caption text-warning">
              {lider === null
                ? "El marcador debe tener un ganador para resolver la disputa."
                : "El ganador no coincide con el marcador."}
            </p>
          )}
        </div>

        <UploadZone
          variant="row"
          titulo="Prueba del resultado"
          ayuda="Los jugadores la verán en el bracket con «Ver prueba»."
          alt="Prueba oficial del resultado"
          previewUrl={prueba}
          onChange={setPrueba}
        />

        <div className="flex flex-col gap-3">
          <Button className="w-full" disabled={!coherente || enviando} onClick={confirmar}>
            <Check />
            Confirmar ganador
          </Button>
          <Button variant="secondary" className="w-full" onClick={pedirCaptura}>
            Pedir nueva captura
          </Button>
        </div>
      </div>
    </>
  );
}
