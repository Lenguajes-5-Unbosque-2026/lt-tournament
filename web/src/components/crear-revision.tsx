"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { TriangleAlert, Ticket, Zap } from "lucide-react";
import { toast } from "sonner";
import { useCrearTorneo } from "@/components/crear-torneo-provider";
import { EditableSummary } from "@/components/editable-summary";
import { FeaturedTournamentCard } from "@/components/featured-tournament-card";
import { WizardHeader } from "@/components/wizard-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { AHORA } from "@/lib/ahora";
import {
  CHECKIN_MINUTOS,
  cuposDelBorrador,
  inicioDelBorrador,
  minutosDelBorrador,
  nombreFormatoBorrador,
} from "@/lib/crear-config";
import { formatFechaHora } from "@/lib/format";
import type { Juego, Organizador, Torneo } from "@/lib/types";

const TIPOS = {
  uno_vs_uno: "1 vs 1",
  battle_royale: "Battle royale",
  por_puntos: "Por puntos",
} as const;

/** Paso 4 de 4 · Revisar y publicar (O05): vista previa, resumen editable y publicar. */
export function CrearRevision({
  juegos,
  organizador,
}: {
  juegos: Juego[];
  organizador: Organizador;
}) {
  const router = useRouter();
  const { borrador: b } = useCrearTorneo();
  const juego = juegos.find((j) => j.id === b.juegoId);
  const inicio = inicioDelBorrador(b);

  // Si se recargó la página, el borrador en memoria se perdió: vuelve a empezar.
  if (!juego || !inicio || b.nombre.trim() === "" || !b.fechaReglas.cierre) {
    return (
      <>
        <WizardHeader paso={4} fallbackHref="/org/crear/fecha" />
        <Alert variant="warning" className="mt-6">
          <TriangleAlert aria-hidden />
          <AlertTitle>Faltan datos del torneo</AlertTitle>
          <AlertDescription>Completa los pasos anteriores para poder publicarlo.</AlertDescription>
        </Alert>
        <Link href="/org/crear" className={`${buttonVariants()} mt-4 w-full`}>
          Ir al paso 1
        </Link>
      </>
    );
  }

  const cupos = cuposDelBorrador(b);
  const tipo = TIPOS[b.tipo];
  const formato =
    b.tipo === "battle_royale"
      ? b.battleRoyale.formato
      : b.tipo === "por_puntos"
        ? b.porPuntos.formato
        : b.unoVsUno.formato;
  const unidad = b.tipo === "por_puntos" ? "participantes" : "jugadores";
  const detalleCupos =
    b.tipo === "battle_royale"
      ? `${cupos} ${unidad} · ${b.battleRoyale.partidas} partidas`
      : b.tipo === "por_puntos"
        ? `${cupos} ${unidad} · ${b.porPuntos.rondas} rondas`
        : `${cupos} ${unidad} · ${tipo}`;

  // Así lo verá el jugador en Explorar: abierto, sin inscritos todavía.
  const vistaPrevia: Torneo = {
    id: "borrador",
    nombre: b.nombre.trim(),
    juego,
    organizador,
    imagen: juego.imagen,
    tipoJuego: b.tipo === "uno_vs_uno" ? "equipo_vs_equipo" : b.tipo,
    jugadoresPorEquipo: 1,
    cupos,
    inscritos: 0,
    fechaInicio: inicio,
    estado: "abierto",
    ciudad: "Bogotá",
  };

  return (
    <>
      <WizardHeader paso={4} fallbackHref="/org/crear/fecha" />
      <p className="mt-4 text-small text-ink-2">Así lo verán los jugadores en Explorar.</p>

      <div className="mt-4">
        <FeaturedTournamentCard
          torneo={vistaPrevia}
          ahora={AHORA}
          vistaPrevia
          imagenLocal={b.portadaUrl}
        />
      </div>

      <div className="mt-4">
        <EditableSummary
          rows={[
            { label: "Formato", value: `${tipo} · ${nombreFormatoBorrador(formato)}`, href: "/org/crear/formato" },
            { label: "Cupos", value: detalleCupos, href: "/org/crear/formato" },
            { label: "Fecha", value: formatFechaHora(inicio, ""), href: "/org/crear/fecha" },
            {
              label: "Tiempo por partida",
              value: `${minutosDelBorrador(b)} minutos`,
              href: "/org/crear/formato",
            },
            {
              label: "Check-in",
              value: b.fechaReglas.checkinObligatorio
                ? `${CHECKIN_MINUTOS} min antes`
                : "No es obligatorio",
              href: "/org/crear/fecha",
            },
          ]}
        />
      </div>

      <Alert variant="success" className="mt-4">
        <Ticket aria-hidden />
        <AlertTitle>Inscripción gratuita</AlertTitle>
        <AlertDescription>
          Se publicará en Explorar y podrás compartir el enlace.
        </AlertDescription>
      </Alert>

      <div className="mt-4 flex flex-col gap-3">
        <Button className="w-full" onClick={() => router.push("/org/crear/publicado")}>
          <Zap />
          Publicar torneo
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => {
            toast.success("Borrador guardado");
            router.push("/org/panel");
          }}
        >
          Guardar como borrador
        </Button>
      </div>
    </>
  );
}
