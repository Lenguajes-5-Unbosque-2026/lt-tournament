"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Info, Send } from "lucide-react";
import { toast } from "sonner";
import { ScoreVersus } from "@/components/score-versus";
import { Topbar } from "@/components/topbar";
import { UploadZone } from "@/components/upload-zone";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Participante } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Reportar resultado (PTS · J2): marcador con un contador por jugador,
 * ganador y la captura opcional que solo ve el organizador. Los empates no
 * se reportan aquí: los registra el organizador (spec, paso 11). Si el
 * jugador ya había reportado, el formulario arranca con su reporte.
 */
export function LigaReportar({
  torneoId,
  ronda,
  formato,
  a,
  b,
  puntosVictoria,
  inicial,
}: {
  torneoId: string;
  ronda: number;
  /** «Liga» o «Rondas suizas» */
  formato: string;
  a: Participante;
  b: Participante;
  puntosVictoria: number;
  inicial: { a: number; b: number } | null;
}) {
  const router = useRouter();
  const bracketHref = `/torneo/${torneoId}/bracket`;
  const [marcadorA, setMarcadorA] = useState(inicial?.a ?? 0);
  const [marcadorB, setMarcadorB] = useState(inicial?.b ?? 0);
  const lider = marcadorA > marcadorB ? a.id : marcadorB > marcadorA ? b.id : null;
  const [ganador, setGanador] = useState<string | null>(lider);
  const [captura, setCaptura] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const empate = lider === null;
  const coherente = !empate && ganador === lider;

  function cambiarMarcador(nuevoA: number, nuevoB: number) {
    setMarcadorA(nuevoA);
    setMarcadorB(nuevoB);
    // El ganador sigue al marcador; el jugador lo puede ajustar después.
    setGanador(nuevoA > nuevoB ? a.id : nuevoB > nuevoA ? b.id : null);
  }

  function enviar() {
    setEnviando(true);
    // Sin backend todavía: el reporte llega al organizador al conectar Supabase.
    toast.success("Resultado enviado", {
      description: `Ronda ${ronda}: ${a.nombre} ${marcadorA} – ${marcadorB} ${b.nombre}. El organizador lo valida.`,
    });
    router.push(bracketHref);
  }

  const alto = Math.max(marcadorA, marcadorB);
  const bajo = Math.min(marcadorA, marcadorB);

  return (
    <>
      <Topbar
        title="Reportar resultado"
        subtitle={`Ronda ${ronda} · ${formato}`}
        leading="close"
        fallbackHref={bracketHref}
        onLeadingClick={() => router.push(bracketHref)}
      />

      <div className="mt-5 flex flex-col gap-4">
        <ScoreVersus a={a} b={b} marcadorA={marcadorA} marcadorB={marcadorB} onChange={cambiarMarcador} />

        <section aria-labelledby="ganador-titulo">
          <h2 id="ganador-titulo" className="text-h2 text-ink">
            Ganador
          </h2>
          <RadioGroup
            aria-labelledby="ganador-titulo"
            value={ganador ?? ""}
            onValueChange={(v) => setGanador(v as string)}
            className="mt-3"
          >
            {[a, b].map((j) => {
              const elegido = ganador === j.id;
              return (
                <label
                  key={j.id}
                  className={cn(
                    "flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors duration-(--dur-fast) ease-out",
                    elegido ? "border-primary-line bg-primary-soft" : "border-line bg-surface",
                  )}
                >
                  <RadioGroupItem value={j.id} />
                  <span className="min-w-0">
                    <span className="block text-strong text-ink">{j.nombre}</span>
                    {elegido && coherente && (
                      <span className="block text-caption text-ink-3">
                        Gana {alto} – {bajo} · +{puntosVictoria} pts
                      </span>
                    )}
                  </span>
                </label>
              );
            })}
          </RadioGroup>
          {empate ? (
            <p className="mt-2 text-caption text-warning">
              Los empates no se reportan aquí: los registra el organizador.
            </p>
          ) : (
            !coherente && (
              <p className="mt-2 text-caption text-warning">
                El ganador no coincide con el marcador.
              </p>
            )
          )}
        </section>

        <UploadZone
          titulo="Sube la captura del marcador"
          ayuda="Opcional · solo la ve el organizador"
          alt="Vista previa de tu captura"
          previewUrl={captura}
          onChange={setCaptura}
        />

        <Alert variant="info">
          <Info aria-hidden />
          <AlertTitle>El organizador valida el resultado</AlertTitle>
          <AlertDescription>Si ambos reportan distinto, decide el organizador.</AlertDescription>
        </Alert>

        <div className="flex flex-col gap-3">
          <Button className="w-full" disabled={!coherente || enviando} onClick={enviar}>
            <Send />
            Enviar resultado
          </Button>
          <Link href={bracketHref} className={`${buttonVariants({ variant: "secondary" })} w-full`}>
            Cancelar
          </Link>
        </div>
      </div>
    </>
  );
}
