import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Clock, Calendar, Ticket } from "lucide-react";
import { CheckList } from "@/components/check-list";
import { FavoriteButton, ShareButton } from "@/components/detail-actions";
import { EnrollmentCard, WaitlistActions } from "@/components/enrollment-actions";
import type { ResumenTorneo } from "@/components/enrollment-sheet";
import { GameArt } from "@/components/game-art";
import { KeyValueList } from "@/components/key-value-list";
import { OrganizerCard } from "@/components/organizer-card";
import { Stat } from "@/components/stat";
import { StatusTag } from "@/components/status-tag";
import { Topbar } from "@/components/topbar";
import { Progress } from "@/components/ui/progress";
import { AHORA } from "@/lib/ahora";
import {
  formatDia,
  formatDiaCorto,
  formatDiaSemana,
  formatHora,
} from "@/lib/format";
import { getInscripcionPropia, getJugadorActual, getTorneoDetalle } from "@/lib/mock";
import { etiquetaEstado, modalidad, nombreFormato } from "@/lib/torneo";

const PUESTOS = ["1er puesto", "2do puesto", "3er puesto"];

/** Detalle del torneo (J09), o su variante «Torneo lleno» (J12). */
async function DetalleTorneo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const torneo = getTorneoDetalle(id);
  if (!torneo) notFound();

  const jugador = getJugadorActual();
  const propia = getInscripcionPropia(id);
  const estado = etiquetaEstado(torneo);
  const lleno = estado === "lleno";
  const yaInscrito = propia?.estado === "confirmada" || propia?.estado === "pendiente";
  const cerrada =
    torneo.estado !== "abierto" ||
    new Date(torneo.cierreInscripciones).getTime() <= new Date(AHORA).getTime();

  const resumen: ResumenTorneo = {
    id: torneo.id,
    nombre: torneo.nombre,
    imagen: torneo.imagen,
    color1: torneo.juego.color1,
    color2: torneo.juego.color2,
    abreviatura: torneo.juego.abreviatura,
    detalle: `${formatDia(torneo.fechaInicio)} · ${formatHora(torneo.fechaInicio)} · ${modalidad(torneo)}`,
  };

  const premios = torneo.puntos.map((pts, i) => ({
    label: PUESTOS[i],
    value: i === 0 && torneo.premio ? torneo.premio : `${pts} pts`,
    tone: i === 0 ? ("gold" as const) : ("default" as const),
  }));
  const quedan = torneo.cupos - torneo.inscritos;

  return (
    <>
      <Topbar
        title="Detalle"
        fallbackHref="/explorar"
        actions={
          <>
            {!lleno && <FavoriteButton />}
            <ShareButton titulo={torneo.nombre} />
          </>
        }
      />

      <GameArt
        src={torneo.imagen}
        color1={torneo.juego.color1}
        color2={torneo.juego.color2}
        abreviatura={torneo.juego.abreviatura}
        rounded="rounded-lg"
        sizes="(max-width: 390px) 100vw, 390px"
        className="mt-4 h-45 w-full"
      />

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
        <StatusTag estado={estado} />
        <span className="text-caption text-ink-2">
          {[torneo.juego.nombre, modalidad(torneo), !lleno && nombreFormato(torneo.formato)]
            .filter(Boolean)
            .join(" · ")}
        </span>
      </div>

      <h2 className="mt-4 font-display text-display-l text-ink uppercase italic">
        {torneo.nombre}
      </h2>

      {lleno ? (
        <WaitlistActions
          inscritos={torneo.inscritos}
          cupos={torneo.cupos}
          posicionInicial={propia?.estado === "espera" ? propia.posicionEspera : null}
          siguientePosicion={torneo.enEspera + 1}
          similaresHref={`/explorar?juego=${torneo.juego.id}`}
        />
      ) : (
        <>
          <div className="mt-5 grid grid-cols-3 gap-2.5">
            <Stat icon={Calendar} value={formatDiaCorto(torneo.fechaInicio)} label="Fecha" />
            <Stat icon={Clock} value={formatHora(torneo.fechaInicio)} label="Hora" />
            <Stat icon={Ticket} value="Gratis" label="Entrada" tone="success" />
          </div>

          <div className="mt-5">
            <div className="flex items-baseline justify-between">
              <p className="text-strong text-ink">
                {torneo.inscritos} / {torneo.cupos} inscritos
              </p>
              <p className="text-caption text-primary">
                Quedan {quedan} {quedan === 1 ? "cupo" : "cupos"}
              </p>
            </div>
            <Progress
              value={(torneo.inscritos / torneo.cupos) * 100}
              aria-label="Cupos ocupados"
              className="mt-3"
            />
          </div>

          <h3 className="mt-6 mb-3 text-h2 text-ink">Premios</h3>
          <KeyValueList rows={premios} />

          {torneo.reglas.length > 0 && (
            <>
              <h3 className="mt-6 mb-3 text-h2 text-ink">Reglas</h3>
              <CheckList items={torneo.reglas} />
            </>
          )}

          <div className="mt-6">
            <EnrollmentCard
              torneo={resumen}
              gamertag={jugador.nombreUsuario}
              situacion={yaInscrito ? "inscrito" : cerrada ? "cerrada" : "abierta"}
              cierre={`Cierra ${formatDiaSemana(torneo.cierreInscripciones)} ${formatHora(torneo.cierreInscripciones)}`}
              // Solo el bracket battle royale (BR · J1) existe por ahora.
              bracketHref={
                torneo.estado === "en_curso" && torneo.tipoJuego === "battle_royale"
                  ? `/torneo/${torneo.id}/bracket`
                  : undefined
              }
            />
          </div>
        </>
      )}

      {!lleno && (
        <div className="mt-4">
          <OrganizerCard
            organizador={torneo.organizador}
            torneos={torneo.torneosDelOrganizador}
          />
        </div>
      )}
    </>
  );
}


export default function DetalleTorneoPage({ params }: { params: Promise<{ id: string }> }) {
  // params es dato de la petición: con cacheComponents va dentro de Suspense.
  return (
    <Suspense>
      <DetalleTorneo params={params} />
    </Suspense>
  );
}
