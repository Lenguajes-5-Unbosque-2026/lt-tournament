"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { useEliminacion } from "@/components/eliminacion-provider";
import { RegistrarPartido } from "@/components/registrar-partido";
import { Topbar } from "@/components/topbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { cuadro, jugadorPorId } from "@/lib/eliminacion";

/**
 * Registrar resultado (O13): no hay empates; al confirmar, el ganador pasa
 * al partido siguiente del cuadro.
 */
export function EliminacionRegistrar({ llaveId }: { llaveId: string }) {
  const { torneo, registrarLlave } = useEliminacion();
  const base = `/org/torneos/${torneo.id}/bracket`;
  const rondas = cuadro(torneo);
  const llave = rondas.flatMap((r) => r.llaves).find((l) => l.id === llaveId);
  const a = jugadorPorId(torneo, llave?.aId ?? null);
  const b = jugadorPorId(torneo, llave?.bId ?? null);

  if (!llave || !a || !b) {
    return (
      <>
        <Topbar title="Registrar resultado" leading="close" fallbackHref={base} />
        <Alert variant="warning" className="mt-6">
          <TriangleAlert aria-hidden />
          <AlertTitle>Este partido aún no se puede registrar</AlertTitle>
          <AlertDescription>Falta definir a uno de los jugadores.</AlertDescription>
        </Alert>
        <Link href={base} className={`${buttonVariants()} mt-4 w-full`}>
          Ir al bracket
        </Link>
      </>
    );
  }

  const ronda = llave.tercerPuesto ? "Tercer puesto" : rondas[llave.ronda - 1].nombre;

  return (
    <RegistrarPartido
      volverHref={base}
      subtitulo={`${ronda} · Partido ${llave.orden}`}
      a={a}
      b={b}
      reportes={torneo.reportes.filter((r) => r.partidoId === llave.id)}
      inicial={
        llave.marcadorA !== null && llave.marcadorB !== null
          ? { a: llave.marcadorA, b: llave.marcadorB }
          : null
      }
      pruebaInicial={llave.prueba}
      permiteEmpate={false}
      detalleResultado={(g) => (g ? `Ganador sugerido: ${g.nombre}.` : "")}
      onConfirmar={(x, y, prueba) => registrarLlave(llave, x, y, prueba)}
    />
  );
}
