"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Ticket, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { EnrollmentSheet, type ResumenTorneo } from "@/components/enrollment-sheet";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";

/**
 * Bloque de acción del Detalle (J09) cuando se puede inscribir, o cuando
 * ya está inscrito o las inscripciones cerraron. Abre la hoja J10.
 */
export function EnrollmentCard({
  torneo,
  gamertag,
  situacion,
  cierre,
}: {
  torneo: ResumenTorneo;
  gamertag: string;
  situacion: "abierta" | "cerrada" | "inscrito";
  /** «Cierra Sáb 6:00 pm» */
  cierre: string;
}) {
  const [abierta, setAbierta] = useState(false);

  return (
    <section
      aria-label="Inscripción"
      className="rounded-lg border border-primary-line bg-linear-to-b from-primary/10 to-primary/2 p-4"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-strong text-ink">
          {situacion === "inscrito" ? "Ya estás inscrito" : "Inscripción gratis"}
        </p>
        <p className="text-caption text-ink-3">
          {situacion === "cerrada" ? "Inscripciones cerradas" : situacion === "abierta" && cierre}
        </p>
      </div>

      {situacion === "inscrito" ? (
        <Link
          href={`/torneo/${torneo.id}/inscripcion`}
          className={`${buttonVariants({ variant: "secondary" })} mt-3 w-full`}
        >
          Ver mi inscripción
        </Link>
      ) : (
        <Button
          className="mt-3 w-full"
          disabled={situacion === "cerrada"}
          onClick={() => setAbierta(true)}
        >
          <Ticket />
          Inscribirme
        </Button>
      )}

      <EnrollmentSheet
        open={abierta}
        onOpenChange={setAbierta}
        torneo={torneo}
        gamertag={gamertag}
      />
    </section>
  );
}

/**
 * Variante «Torneo lleno» (J12): aviso de cupos agotados, lista de espera y
 * «Ver torneos similares». Unirse cambia el botón a «En lista de espera · #N»
 * y muestra un toast.
 */
export function WaitlistActions({
  inscritos,
  cupos,
  posicionInicial,
  siguientePosicion,
  similaresHref,
}: {
  inscritos: number;
  cupos: number;
  /** Posición si el jugador ya estaba en la lista. */
  posicionInicial: number | null;
  /** Posición que tendría si se une ahora. */
  siguientePosicion: number;
  similaresHref: string;
}) {
  const [posicion, setPosicion] = useState(posicionInicial);

  function unirse() {
    setPosicion(siguientePosicion);
    toast.success(`Estás en la lista de espera · #${siguientePosicion}`);
  }

  return (
    <div className="mt-5 flex flex-col gap-3">
      <Alert variant="warning">
        <TriangleAlert aria-hidden />
        <AlertTitle>Cupos agotados</AlertTitle>
        <AlertDescription>
          {inscritos}/{cupos} inscritos. Únete a la lista de espera y te avisamos si se
          libera un cupo.
        </AlertDescription>
      </Alert>

      <div className="flex items-center gap-3 rounded-lg border border-line bg-surface p-3.5">
        <span className="flex size-9 items-center justify-center rounded-sm bg-info-soft text-info">
          <Clock className="size-icon-btn" aria-hidden />
        </span>
        <div>
          <p className="text-strong text-ink">Lista de espera</p>
          <p className="text-caption text-ink-3">
            {posicion ? `Estás en el puesto #${posicion}` : `Serías el #${siguientePosicion}`} ·
            suele liberarse 1 de cada 5 cupos
          </p>
        </div>
      </div>

      <Button disabled className="w-full">
        Inscribirme
      </Button>
      <Button
        variant="secondary"
        className="w-full"
        disabled={posicion !== null}
        onClick={unirse}
      >
        <Clock />
        {posicion ? `En lista de espera · #${posicion}` : "Unirme a la lista de espera"}
      </Button>

      <Link
        href={similaresHref}
        className={`${buttonVariants({ variant: "ghost", size: "sm" })} self-center`}
      >
        Ver torneos similares
      </Link>
    </div>
  );
}
