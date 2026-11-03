"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { useLiga } from "@/components/liga-provider";
import { RegistrarPartido } from "@/components/registrar-partido";
import { Topbar } from "@/components/topbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { jugadorPorId } from "@/lib/liga";

/**
 * Registrar resultado (PTS · O3): ganador o empate, con los puntos que suma
 * cada jugador a la tabla.
 */
export function LigaRegistrar({ partidoId }: { partidoId: string }) {
  const { torneo, registrarPartido } = useLiga();
  const base = `/org/torneos/${torneo.id}/bracket`;
  const partido = torneo.partidos.find((p) => p.id === partidoId);
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

  const { victoria, empate, derrota } = torneo.puntos;
  const pts = (n: number) => `${n} ${n === 1 ? "pt" : "pts"}`;

  return (
    <RegistrarPartido
      volverHref={base}
      subtitulo={`Ronda ${partido.ronda} · ${a.nombre} vs ${b.nombre}`}
      a={a}
      b={b}
      reportes={torneo.reportes.filter((r) => r.partidoId === partidoId)}
      inicial={
        partido.marcadorA !== null && partido.marcadorB !== null
          ? { a: partido.marcadorA, b: partido.marcadorB }
          : null
      }
      pruebaInicial={partido.prueba}
      permiteEmpate
      detalleResultado={(g) =>
        g
          ? `${g.nombre} suma ${pts(victoria)} · ${(g.id === a.id ? b : a).nombre} suma ${derrota}.`
          : `Empate: cada uno suma ${pts(empate)}.`
      }
      onConfirmar={(x, y, prueba) => registrarPartido(partidoId, x, y, prueba)}
    />
  );
}
