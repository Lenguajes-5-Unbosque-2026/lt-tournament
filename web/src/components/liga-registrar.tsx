"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, CircleCheck, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { useLiga } from "@/components/liga-provider";
import { PlayerAvatar } from "@/components/player-avatar";
import { ScoreVersus } from "@/components/score-versus";
import { Topbar } from "@/components/topbar";
import { UploadZone } from "@/components/upload-zone";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AHORA } from "@/lib/ahora";
import { rutaImagen } from "@/lib/battle-royale";
import { formatHace } from "@/lib/format";
import { jugadorPorId, marcador } from "@/lib/liga";
import { cn } from "@/lib/utils";

/**
 * Registrar resultado (PTS · O3): el organizador ajusta el marcador, lo
 * compara con los reportes de los dos jugadores, confirma el resultado
 * (ganador o empate) y sube la prueba que verán los jugadores.
 */
export function LigaRegistrar({ partidoId }: { partidoId: string }) {
  const router = useRouter();
  const { torneo, registrarPartido } = useLiga();
  const base = `/org/torneos/${torneo.id}/bracket`;
  const partido = torneo.partidos.find((p) => p.id === partidoId);
  const reportes = torneo.reportes.filter((r) => r.partidoId === partidoId);

  // Arranca con lo registrado o, si no hay, con el primer reporte.
  const [marcadorA, setMarcadorA] = useState(partido?.marcadorA ?? reportes[0]?.marcadorA ?? 0);
  const [marcadorB, setMarcadorB] = useState(partido?.marcadorB ?? reportes[0]?.marcadorB ?? 0);
  // Una URL local (blob:) se libera al salir de O3: solo se muestra la del mock.
  const [prueba, setPrueba] = useState<string | null>(() =>
    partido?.prueba && !partido.prueba.startsWith("blob:") ? rutaImagen(partido.prueba) : null,
  );
  const [confirmado, setConfirmado] = useState<string | null>(null);

  const a = jugadorPorId(torneo, partido?.aId ?? null);
  const b = jugadorPorId(torneo, partido?.bId ?? null);
  if (!partido || !a || !b) {
    return (
      <>
        <Topbar title="Registrar resultado" leading="close" fallbackHref={base} />
        <Alert variant="warning" className="mt-6">
          <TriangleAlert aria-hidden />
          <AlertTitle>No existe ese partido</AlertTitle>
          <AlertDescription>Vuelve a la tabla de posiciones.</AlertDescription>
        </Alert>
        <Link href={base} className={`${buttonVariants()} mt-4 w-full`}>
          Ir a la tabla de posiciones
        </Link>
      </>
    );
  }

  const ganador = marcadorA > marcadorB ? a : marcadorB > marcadorA ? b : null;
  // Clave del resultado que se confirma: cambia si cambia el marcador.
  const resultado = ganador ? ganador.id : "empate";
  const { victoria, empate, derrota } = torneo.puntos;
  const coinciden =
    reportes.length === 2 &&
    reportes[0].marcadorA === reportes[1].marcadorA &&
    reportes[0].marcadorB === reportes[1].marcadorB;
  const igualAlMarcador = (r: (typeof reportes)[number]) =>
    r.marcadorA === marcadorA && r.marcadorB === marcadorB;

  function cambiarMarcador(x: number, y: number) {
    setMarcadorA(x);
    setMarcadorB(y);
  }

  function confirmar() {
    registrarPartido(partidoId, marcadorA, marcadorB, prueba);
    toast.success("Resultado registrado", {
      description: ganador
        ? `${ganador.nombre} suma ${victoria} pts a la tabla.`
        : `Empate: cada uno suma ${empate} ${empate === 1 ? "pt" : "pts"}.`,
    });
    router.push(base);
  }

  return (
    <>
      <Topbar
        title="Registrar resultado"
        subtitle={`Ronda ${partido.ronda} · ${a.nombre} vs ${b.nombre}`}
        leading="close"
        fallbackHref={base}
        onLeadingClick={() => router.push(base)}
      />

      <div className="mt-5">
        <ScoreVersus a={a} b={b} marcadorA={marcadorA} marcadorB={marcadorB} onChange={cambiarMarcador} />
      </div>

      {reportes.length > 0 && (
        <section aria-labelledby="reportes-titulo" className="mt-6">
          <h2 id="reportes-titulo" className="text-h2 text-ink">
            Reportes de los jugadores
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5">
            {reportes.map((r) => {
              const j = jugadorPorId(torneo, r.jugadorId);
              if (!j) return null;
              const ok = igualAlMarcador(r);
              return (
                <li
                  key={r.jugadorId}
                  className="flex items-center gap-3 rounded-lg border border-line bg-surface p-3.5"
                >
                  <PlayerAvatar imagen={j.imagen} color1={j.color1} color2={j.color2} className="size-11" />
                  <div className="min-w-0 flex-1">
                    <p className="text-strong text-ink">
                      {j.nombre} reportó {marcador(r.marcadorA, r.marcadorB)}
                    </p>
                    <p className="text-caption text-ink-3">
                      {formatHace(r.creadoEn, AHORA)}
                      {r.captura && " · con captura"}
                      {!ok && <span className="text-warning"> · distinto al marcador</span>}
                    </p>
                  </div>
                  {r.captura ? (
                    // Captura del mock: miniatura fija de 48 px.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={rutaImagen(r.captura)}
                      alt={`Captura de ${j.nombre}`}
                      className="size-12 shrink-0 rounded-sm object-cover"
                    />
                  ) : ok ? (
                    <Check className="size-icon-btn shrink-0 text-success" aria-label="Coincide con el marcador" />
                  ) : (
                    <TriangleAlert className="size-icon-btn shrink-0 text-warning" aria-label="Distinto al marcador" />
                  )}
                </li>
              );
            })}
          </ul>

          {coinciden ? (
            <Alert variant="success" className="mt-3">
              <CircleCheck aria-hidden />
              <AlertTitle>Los reportes coinciden</AlertTitle>
              <AlertDescription>
                {ganador
                  ? `${ganador.nombre} suma ${victoria} pts · ${(ganador.id === a.id ? b : a).nombre} suma ${derrota}.`
                  : `Empate: cada uno suma ${empate} ${empate === 1 ? "pt" : "pts"}.`}
              </AlertDescription>
            </Alert>
          ) : (
            reportes.length === 2 && (
              <Alert variant="warning" className="mt-3">
                <TriangleAlert aria-hidden />
                <AlertTitle>Los reportes no coinciden</AlertTitle>
                <AlertDescription>
                  Revisa la captura con los jugadores. Tú decides el resultado final.
                </AlertDescription>
              </Alert>
            )
          )}
        </section>
      )}

      <RadioGroup
        aria-label="Resultado del partido"
        value={confirmado === resultado ? resultado : ""}
        onValueChange={(v) => setConfirmado(v as string)}
        className="mt-4"
      >
        <label
          className={cn(
            "flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors duration-(--dur-fast) ease-out",
            confirmado === resultado ? "border-primary bg-primary-soft" : "border-line bg-surface",
          )}
        >
          <RadioGroupItem value={resultado} />
          <span className="text-strong text-ink">
            {ganador ? `Ganador: ${ganador.nombre}` : `Empate · ${empate} ${empate === 1 ? "pt" : "pts"} cada uno`}
          </span>
        </label>
      </RadioGroup>

      <UploadZone
        variant="row"
        className="mt-4"
        titulo="Prueba del resultado"
        ayuda="Los jugadores la verán en el bracket con «Ver prueba»."
        alt="Prueba del resultado"
        previewUrl={prueba}
        onChange={setPrueba}
      />

      <div className="mt-5 flex flex-col gap-3">
        <Button className="w-full" disabled={confirmado !== resultado} onClick={confirmar}>
          <Check />
          Confirmar resultado
        </Button>
        <Link href={base} className={`${buttonVariants({ variant: "secondary" })} w-full`}>
          Cancelar
        </Link>
      </div>
    </>
  );
}
