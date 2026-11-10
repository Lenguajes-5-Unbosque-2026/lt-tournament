"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, CircleCheck, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { useBracketBR } from "@/components/bracket-br-provider";
import { PlayerAvatar } from "@/components/player-avatar";
import { StandingsTable, type FilaPosiciones } from "@/components/standings-table";
import { Stepper } from "@/components/stepper";
import { Topbar } from "@/components/topbar";
import { UploadZone } from "@/components/upload-zone";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { puntosPartida, rutaImagen, type JugadorBR } from "@/lib/battle-royale";
import { cn } from "@/lib/utils";

type Celda = { puesto: number | null; kills: number };

/**
 * Registrar resultados (BR · O3): el organizador llena la tabla de la
 * partida (toca una fila para editar puesto y kills), la compara con los
 * reportes de los jugadores, confirma al ganador y sube la captura de la
 * tabla final, que los jugadores verán con «Ver prueba».
 */
export function BRRegistrar({ numero }: { numero: number }) {
  const router = useRouter();
  const { torneo, registrarPartida } = useBracketBR();
  const base = `/org/torneos/${torneo.id}/bracket`;
  const partida = torneo.partidas.find((p) => p.numero === numero);

  // La tabla arranca con lo registrado o, si no hay, con lo que reportaron.
  const [celdas, setCeldas] = useState<Record<string, Celda>>(() =>
    Object.fromEntries(
      torneo.jugadores.map((j) => {
        const r = torneo.resultados.find(
          (x) => x.partidaId === partida?.id && x.jugadorId === j.id,
        );
        return [j.id, { puesto: r?.puesto ?? null, kills: r?.kills ?? 0 }];
      }),
    ),
  );
  const [reportes] = useState(() =>
    torneo.resultados.filter((r) => r.partidaId === partida?.id && r.estado === "reportado"),
  );
  // Una URL local (blob:) se libera al salir de O3: solo se muestra la del mock.
  const [captura, setCaptura] = useState<string | null>(() =>
    partida?.prueba && !partida.prueba.startsWith("blob:") ? rutaImagen(partida.prueba) : null,
  );
  const [ganadorConfirmado, setGanadorConfirmado] = useState<string | null>(null);
  const [editando, setEditando] = useState<JugadorBR | null>(null);

  if (!partida || partida.estado === "pendiente") {
    return (
      <>
        <Topbar title="Registrar resultados" leading="close" fallbackHref={base} />
        <Alert variant="warning" className="mt-6">
          <TriangleAlert aria-hidden />
          <AlertTitle>{partida ? "La partida aún no empieza" : "No existe esa partida"}</AlertTitle>
          <AlertDescription>Vuelve a la tabla de partidas.</AlertDescription>
        </Alert>
        <Link href={base} className={`${buttonVariants()} mt-4 w-full`}>
          Ir a la tabla de partidas
        </Link>
      </>
    );
  }

  const ordenados = [...torneo.jugadores].sort((a, b) => {
    const pa = celdas[a.id].puesto ?? Infinity;
    const pb = celdas[b.id].puesto ?? Infinity;
    return pa - pb || a.nombre.localeCompare(b.nombre);
  });
  const filas: FilaPosiciones[] = ordenados.map((j) => {
    const { puesto, kills } = celdas[j.id];
    return {
      jugador: j,
      posicion: puesto,
      valores: puesto ? [`${puesto}°`, String(kills)] : ["—", "—"],
      puntos: puesto ? puntosPartida(puesto, kills, torneo.puntosPorKill) : null,
    };
  });

  const puestos = Object.values(celdas).flatMap((c) => (c.puesto ? [c.puesto] : []));
  const faltan = torneo.jugadores.length - puestos.length;
  const repetidos = puestos.length !== new Set(puestos).size;
  const ganador = torneo.jugadores.find((j) => celdas[j.id].puesto === 1);
  const coincide = (r: (typeof reportes)[number]) =>
    celdas[r.jugadorId].puesto === r.puesto && celdas[r.jugadorId].kills === r.kills;
  const todosCoinciden = reportes.every(coincide);
  const listo = faltan === 0 && !repetidos && !!ganador && ganadorConfirmado === ganador.id;

  function guardar(jugadorId: string, celda: Celda) {
    setCeldas((c) => ({ ...c, [jugadorId]: celda }));
    setEditando(null);
  }

  function confirmar() {
    registrarPartida(
      numero,
      torneo.jugadores.map((j) => ({
        jugadorId: j.id,
        puesto: celdas[j.id].puesto!,
        kills: celdas[j.id].kills,
      })),
      captura,
    );
    toast.success(`Partida ${numero} registrada`, {
      description: `Ganador: ${ganador!.nombre}. La tabla general ya está actualizada.`,
    });
    router.push(base);
  }

  return (
    <>
      <Topbar
        title="Registrar resultados"
        subtitle={`Partida ${numero} · Battle royale`}
        leading="close"
        fallbackHref={base}
        onLeadingClick={() => router.push(base)}
      />

      <div className="mt-5">
        <StandingsTable
          etiqueta={`Resultados de la partida ${numero}`}
          columnas={["Puesto", "Kills"]}
          filas={filas}
          onFilaClick={(id) => setEditando(torneo.jugadores.find((j) => j.id === id) ?? null)}
        />
        <p className="mt-3 text-caption text-ink-3">
          Toca una fila para editar puesto y kills · {torneo.jugadores.length} jugadores
          {faltan > 0 && <span className="text-warning"> · faltan {faltan}</span>}
        </p>
      </div>

      {repetidos && (
        <Alert variant="danger" className="mt-4">
          <TriangleAlert aria-hidden />
          <AlertTitle>Hay puestos repetidos</AlertTitle>
          <AlertDescription>Cada jugador debe tener un puesto distinto.</AlertDescription>
        </Alert>
      )}

      {reportes.length > 0 && (
        <section aria-labelledby="reportes-titulo" className="mt-6">
          <h2 id="reportes-titulo" className="text-h2 text-ink">
            Reportes de los jugadores
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5">
            {reportes.map((r) => {
              const j = torneo.jugadores.find((x) => x.id === r.jugadorId);
              if (!j) return null;
              const ok = coincide(r);
              return (
                <li
                  key={r.jugadorId}
                  className="flex items-center gap-3 rounded-lg border border-line bg-surface p-3.5"
                >
                  <PlayerAvatar imagen={j.imagen} color1={j.color1} color2={j.color2} className="size-11" />
                  <div className="min-w-0 flex-1">
                    <p className="text-strong text-ink">
                      {j.nombre} reportó {r.puesto}° · {r.kills} kills
                    </p>
                    <p className="text-caption text-ink-3">
                      {r.captura ? "Con captura" : "Sin captura"}
                      {!ok && <span className="text-warning"> · distinto a la tabla</span>}
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
                    <Check className="size-icon-btn shrink-0 text-success" aria-label="Coincide con la tabla" />
                  ) : (
                    <TriangleAlert className="size-icon-btn shrink-0 text-warning" aria-label="No coincide con la tabla" />
                  )}
                </li>
              );
            })}
          </ul>

          {todosCoinciden ? (
            <Alert variant="success" className="mt-3">
              <CircleCheck aria-hidden />
              <AlertTitle>Los reportes coinciden con la tabla</AlertTitle>
              {ganador && <AlertDescription>Ganador de la partida: {ganador.nombre}.</AlertDescription>}
            </Alert>
          ) : (
            <Alert variant="warning" className="mt-3">
              <TriangleAlert aria-hidden />
              <AlertTitle>Hay reportes distintos a la tabla</AlertTitle>
              <AlertDescription>
                Revisa la captura con los jugadores. Tú decides el resultado final.
              </AlertDescription>
            </Alert>
          )}
        </section>
      )}

      <div className="mt-4">
        {ganador ? (
          <RadioGroup
            aria-label="Ganador de la partida"
            value={ganadorConfirmado === ganador.id ? ganador.id : ""}
            onValueChange={(v) => setGanadorConfirmado(v as string)}
          >
            <label
              className={cn(
                "flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors duration-(--dur-fast) ease-out",
                ganadorConfirmado === ganador.id
                  ? "border-primary bg-primary-soft"
                  : "border-line bg-surface",
              )}
            >
              <RadioGroupItem value={ganador.id} />
              <span className="text-strong text-ink">Ganador de la partida: {ganador.nombre}</span>
            </label>
          </RadioGroup>
        ) : (
          <p className="rounded-lg border border-line bg-surface p-4 text-small text-ink-3">
            Asigna el 1.° puesto para confirmar al ganador.
          </p>
        )}
      </div>

      <UploadZone
        variant="row"
        className="mt-4"
        titulo="Captura de la tabla final"
        ayuda="Los jugadores la verán en el bracket con «Ver prueba»."
        alt="Captura de la tabla final"
        previewUrl={captura}
        onChange={setCaptura}
      />

      <div className="mt-5 flex flex-col gap-3">
        <Button className="w-full" disabled={!listo} onClick={confirmar}>
          <Check />
          Confirmar resultados
        </Button>
        <Link href={base} className={`${buttonVariants({ variant: "secondary" })} w-full`}>
          Cancelar
        </Link>
      </div>

      <EditarFila
        jugador={editando}
        celda={editando ? celdas[editando.id] : null}
        siguientePuesto={siguienteLibre(puestos)}
        jugadores={torneo.jugadores.length}
        onGuardar={guardar}
        onCerrar={() => setEditando(null)}
      />
    </>
  );
}

function siguienteLibre(puestos: number[]) {
  let p = 1;
  while (puestos.includes(p)) p++;
  return p;
}

/** Hoja para editar el puesto y las kills de una fila. */
function EditarFila({
  jugador,
  celda,
  siguientePuesto,
  jugadores,
  onGuardar,
  onCerrar,
}: {
  jugador: JugadorBR | null;
  celda: Celda | null;
  siguientePuesto: number;
  jugadores: number;
  onGuardar: (jugadorId: string, celda: Celda) => void;
  onCerrar: () => void;
}) {
  return (
    <Drawer open={jugador !== null} onOpenChange={(open) => !open && onCerrar()} showSwipeHandle>
      <DrawerContent className="mx-auto! w-full max-w-phone">
        {jugador && celda && (
          <FormularioFila
            key={jugador.id}
            jugador={jugador}
            inicial={{
              puesto: celda.puesto ?? Math.min(siguientePuesto, jugadores),
              kills: celda.kills,
            }}
            jugadores={jugadores}
            onGuardar={onGuardar}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
}

function FormularioFila({
  jugador,
  inicial,
  jugadores,
  onGuardar,
}: {
  jugador: JugadorBR;
  inicial: { puesto: number; kills: number };
  jugadores: number;
  onGuardar: (jugadorId: string, celda: Celda) => void;
}) {
  const [puesto, setPuesto] = useState(inicial.puesto);
  const [kills, setKills] = useState(inicial.kills);

  return (
    <div className="overflow-y-auto px-screen pt-2.5 pb-8.5">
      <div className="mt-2 flex items-center gap-3">
        <PlayerAvatar imagen={jugador.imagen} color1={jugador.color1} color2={jugador.color2} className="size-10" />
        <DrawerTitle className="text-h1 text-ink normal-case not-italic">{jugador.nombre}</DrawerTitle>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface p-4">
          <p className="text-h3 text-ink">Puesto</p>
          <Stepper value={puesto} onChange={setPuesto} min={1} max={jugadores} label="puesto" />
        </div>
        <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface p-4">
          <p className="text-h3 text-ink">Kills</p>
          <Stepper value={kills} onChange={setKills} min={0} max={Math.max(0, jugadores - 1)} label="kills" />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <Button className="w-full" onClick={() => onGuardar(jugador.id, { puesto, kills })}>
          Guardar
        </Button>
        <DrawerClose render={<Button variant="secondary" className="w-full" />}>Cancelar</DrawerClose>
      </div>
    </div>
  );
}
