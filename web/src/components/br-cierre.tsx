"use client";

import { useRouter } from "next/navigation";
import { Crosshair, Flag, Gamepad2, Info, Share2, TriangleAlert, Users } from "lucide-react";
import { toast } from "sonner";
import { useBracketBR } from "@/components/bracket-br-provider";
import { CheckList } from "@/components/check-list";
import { Podium } from "@/components/podium";
import { Stat } from "@/components/stat";
import { Topbar } from "@/components/topbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { compartirEnlace } from "@/lib/compartir";
import { confirmados, estadoCierre, tablaGeneral } from "@/lib/battle-royale";

/**
 * Cierre y podio (BR · O4): podio con los puntos de ranking del torneo,
 * resumen, lista de verificación y «Finalizar y publicar resultados». Solo
 * se puede cerrar con todas las partidas registradas.
 */
export function BRCierre() {
  const router = useRouter();
  const { torneo, publicado, publicar } = useBracketBR();
  const { registradas, completa, listo } = estadoCierre(torneo);
  const podio = tablaGeneral(torneo).slice(0, 3);
  const kills = confirmados(torneo).reduce((s, r) => s + r.kills, 0);
  const n = torneo.jugadores.length;

  function finalizar() {
    publicar();
    toast.success("Resultados publicados", {
      description: `El historial y los rankings de los ${n} jugadores ya están actualizados.`,
    });
    router.push("/org/panel");
  }

  return (
    <>
      <Topbar
        title="Cerrar torneo"
        subtitle={torneo.nombre}
        fallbackHref={`/org/torneos/${torneo.id}/bracket`}
      />

      <h2 className="mt-5 font-display text-display-xl text-ink uppercase italic">
        {listo ? "¡Final registrada!" : "Faltan resultados"}
      </h2>

      <div className="mt-6">
        <Podium
          puestos={podio.map((f, i) => ({
            nombre: f.jugador.nombre,
            imagen: f.jugador.imagen,
            color1: f.jugador.color1,
            color2: f.jugador.color2,
            detalle: `+${torneo.premios[i]} pts`,
          }))}
        />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2.5">
        <Stat icon={Users} value={String(n)} label="Jugadores" />
        <Stat icon={Gamepad2} value={String(torneo.partidas.length)} label="Partidas" />
        <Stat icon={Crosshair} value={String(kills)} label="Kills" />
      </div>

      <div className="mt-4 rounded-lg border border-line bg-surface p-4">
        <CheckList
          items={[
            { texto: "Todos los resultados registrados", hecho: registradas },
            { texto: "Tabla final completa", hecho: completa },
            { texto: "Puntos de ranking calculados", hecho: listo },
          ]}
        />
      </div>

      {listo ? (
        <Alert variant="info" className="mt-4">
          <Info aria-hidden />
          <AlertTitle>Al cerrar se actualiza todo</AlertTitle>
          <AlertDescription>
            Historial y rankings de los {n} jugadores se actualizan al instante.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="warning" className="mt-4">
          <TriangleAlert aria-hidden />
          <AlertTitle>Aún no puedes cerrar el torneo</AlertTitle>
          <AlertDescription>
            Registra todas las partidas desde la tabla de partidas. El podio es provisional.
          </AlertDescription>
        </Alert>
      )}

      <div className="mt-5 flex flex-col gap-3">
        <Button className="w-full" disabled={!listo || publicado} onClick={finalizar}>
          <Flag />
          {publicado ? "Resultados publicados" : "Finalizar y publicar resultados"}
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => compartirEnlace(torneo.nombre, `https://${torneo.enlace}`)}
        >
          <Share2 />
          Compartir resultados
        </Button>
      </div>
    </>
  );
}
