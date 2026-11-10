"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Info, Send } from "lucide-react";
import { toast } from "sonner";
import { ChipGroup } from "@/components/chip";
import { Stepper } from "@/components/stepper";
import { Topbar } from "@/components/topbar";
import { UploadZone } from "@/components/upload-zone";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";

const CHIPS_PUESTO = [
  { value: "1", label: "1°" },
  { value: "2", label: "2°" },
  { value: "3", label: "3°" },
  { value: "top10", label: "Top 10" },
];

const CHIPS_KILLS = [
  { value: "0", label: "0" },
  { value: "2", label: "2" },
  { value: "4", label: "4" },
  { value: "6", label: "6+" },
];

/**
 * Reportar resultado (BR · J2): puesto final y kills con stepper o chips
 * rápidos, y la captura opcional que solo ve el organizador. Si el jugador
 * ya había reportado, el formulario arranca con su reporte.
 */
export function BRReportar({
  torneoId,
  numero,
  jugadores,
  inicial,
}: {
  torneoId: string;
  numero: number;
  /** Jugadores del torneo: el último puesto posible. */
  jugadores: number;
  inicial: { puesto: number; kills: number } | null;
}) {
  const router = useRouter();
  const bracketHref = `/torneo/${torneoId}/bracket`;
  const [puesto, setPuesto] = useState(inicial?.puesto ?? 1);
  const [kills, setKills] = useState(inicial?.kills ?? 0);
  const [captura, setCaptura] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const chipPuesto = puesto <= 3 ? String(puesto) : puesto <= 10 ? "top10" : null;
  const chipKills = kills >= 6 ? "6" : [0, 2, 4].includes(kills) ? String(kills) : null;

  function elegirPuesto([v]: string[]) {
    if (!v) return;
    // «Top 10» lleva al primer puesto fuera del podio; se ajusta con − / +.
    setPuesto(v === "top10" ? Math.min(4, jugadores) : Number(v));
  }

  function enviar() {
    setEnviando(true);
    // Sin backend todavía: el reporte llega al organizador al conectar Supabase.
    toast.success("Resultado enviado", {
      description: `Partida ${numero}: ${puesto}° con ${kills} ${kills === 1 ? "kill" : "kills"}. El organizador lo valida.`,
    });
    router.push(bracketHref);
  }

  return (
    <>
      <Topbar
        title="Reportar resultado"
        subtitle={`Partida ${numero} · Battle royale`}
        leading="close"
        fallbackHref={bracketHref}
        onLeadingClick={() => router.push(bracketHref)}
      />

      <div className="mt-5 flex flex-col gap-4">
        <section aria-labelledby="puesto-titulo" className="rounded-lg border border-line bg-surface p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 id="puesto-titulo" className="text-h3 text-ink">
                Tu puesto final
              </h2>
              <p className="text-caption text-ink-3">Posición al terminar la partida</p>
            </div>
            <Stepper value={puesto} onChange={setPuesto} min={1} max={jugadores} label="puesto final" />
          </div>
          <ChipGroup
            label="Puestos rápidos"
            options={CHIPS_PUESTO}
            value={chipPuesto ? [chipPuesto] : []}
            onValueChange={elegirPuesto}
            className="mt-4"
          />
        </section>

        <section aria-labelledby="kills-titulo" className="rounded-lg border border-line bg-surface p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 id="kills-titulo" className="text-h3 text-ink">
                Tus kills
              </h2>
              <p className="text-caption text-ink-3">+1 pt por cada eliminación</p>
            </div>
            <Stepper
              value={kills}
              onChange={setKills}
              min={0}
              max={Math.max(0, jugadores - 1)}
              label="kills"
            />
          </div>
          <ChipGroup
            label="Kills rápidas"
            options={CHIPS_KILLS}
            value={chipKills ? [chipKills] : []}
            onValueChange={([v]) => v && setKills(Math.min(Number(v), jugadores - 1))}
            className="mt-4"
          />
        </section>

        <UploadZone
          titulo="Sube la captura de la tabla final"
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
          <Button className="w-full" disabled={enviando} onClick={enviar}>
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
