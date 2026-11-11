"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Info, TriangleAlert } from "lucide-react";
import { ScoreVersus } from "@/components/score-versus";
import { Topbar } from "@/components/topbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { marcadorDe, type PartidoIncidencia } from "@/lib/incidencia";

/**
 * Resultado en disputa, vista del jugador (D1): los dos reportes no
 * coinciden y el organizador decidirá. El marcador es el que reportó el
 * propio jugador y ya no se edita: solo corrige si el organizador pide una
 * nueva captura.
 */
export function DisputaJugador({
  partido,
  yoId,
}: {
  partido: PartidoIncidencia;
  /** Jugador que mira la pantalla (uno de los dos del partido). */
  yoId: string;
}) {
  const router = useRouter();
  const bracket = `/torneo/${partido.torneoId}/bracket`;
  const rival = yoId === partido.a.id ? partido.b : partido.a;
  const mio = partido.reportes.find((r) => r.jugador.id === yoId);
  const suyo = partido.reportes.find((r) => r.jugador.id === rival.id);
  // Sin reporte propio (se abre desde un aviso), se muestra el del rival.
  const base = mio ?? suyo ?? partido.reportes[0];

  return (
    <>
      <Topbar
        title="Resultado en disputa"
        subtitle={partido.subtitulo}
        leading="close"
        fallbackHref={bracket}
        onLeadingClick={() => router.push(bracket)}
      />

      <div className="mt-5 flex flex-col gap-4">
        <ScoreVersus
          a={partido.a}
          b={partido.b}
          marcadorA={base?.marcadorA ?? 0}
          marcadorB={base?.marcadorB ?? 0}
          onChange={() => {}}
          disabled
        />

        <Alert variant="warning">
          <TriangleAlert aria-hidden />
          <AlertTitle>Los reportes no coinciden</AlertTitle>
          <AlertDescription>
            {mio && suyo
              ? `Tú reportaste ${marcadorDe(mio)} y ${rival.nombre} reportó ${marcadorDe(suyo)}. `
              : partido.reportes
                  .map((r) => `${r.jugador.nombre} reportó ${marcadorDe(r)}`)
                  .join(" y ") + ". "}
            El organizador revisará las pruebas y decidirá.
          </AlertDescription>
        </Alert>

        <Alert variant="info">
          <Info aria-hidden />
          <AlertTitle>Te avisaremos cuando decida</AlertTitle>
          <AlertDescription>
            La prueba oficial aparecerá en el bracket con «Ver prueba».
          </AlertDescription>
        </Alert>

        <div className="flex flex-col gap-3">
          <Link
            href={`/torneo/${partido.torneoId}/chat`}
            className={`${buttonVariants()} w-full`}
          >
            Ir al chat del torneo
          </Link>
          <Link href={bracket} className={`${buttonVariants({ variant: "secondary" })} w-full`}>
            Volver al bracket
          </Link>
        </div>
      </div>
    </>
  );
}
