"use client";

import { useRouter } from "next/navigation";
import { Flag, Info, Share2, TriangleAlert, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { CheckList } from "@/components/check-list";
import { Podium, type PuestoPodio } from "@/components/podium";
import { Stat } from "@/components/stat";
import { Topbar } from "@/components/topbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { compartirEnlace } from "@/lib/compartir";

/**
 * Cierre y podio (BR · O4, PTS · O4, y sirve para O15): «¡Final
 * registrada!», podio, tres datos, lista de verificación y «Finalizar y
 * publicar resultados». Solo deja cerrar con todo registrado (`listo`).
 */
export function CierreTorneo({
  nombre,
  enlace,
  volverHref,
  podio,
  stats,
  checks,
  participantes,
  unidad,
  publicado,
  onPublicar,
}: {
  nombre: string;
  /** «lt.gg/liga-relampago» */
  enlace: string;
  volverHref: string;
  podio: PuestoPodio[];
  stats: { icon: LucideIcon; value: string; label: string }[];
  checks: { texto: string; hecho: boolean }[];
  participantes: number;
  /** «jugadores» o «participantes» */
  unidad: string;
  publicado: boolean;
  onPublicar: () => void;
}) {
  const router = useRouter();
  const listo = checks.every((c) => c.hecho);

  function finalizar() {
    onPublicar();
    toast.success("Resultados publicados", {
      description: `El historial y los rankings de los ${participantes} ${unidad} ya están actualizados.`,
    });
    router.push("/org/panel");
  }

  return (
    <>
      <Topbar title="Cerrar torneo" subtitle={nombre} fallbackHref={volverHref} />

      <h2 className="mt-5 font-display text-display-xl text-ink uppercase italic">
        {listo ? "¡Final registrada!" : "Faltan resultados"}
      </h2>

      <div className="mt-6">
        <Podium puestos={podio} />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2.5">
        {stats.map((s) => (
          <Stat key={s.label} icon={s.icon} value={s.value} label={s.label} />
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-line bg-surface p-4">
        <CheckList items={checks} />
      </div>

      {listo ? (
        <Alert variant="info" className="mt-4">
          <Info aria-hidden />
          <AlertTitle>Al cerrar se actualiza todo</AlertTitle>
          <AlertDescription>
            Historial y rankings de los {participantes} {unidad} se actualizan al instante.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="warning" className="mt-4">
          <TriangleAlert aria-hidden />
          <AlertTitle>Aún no puedes cerrar el torneo</AlertTitle>
          <AlertDescription>
            Registra todos los resultados desde el bracket. El podio es provisional.
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
          onClick={() => compartirEnlace(nombre, `https://${enlace}`)}
        >
          <Share2 />
          Compartir resultados
        </Button>
      </div>
    </>
  );
}
