"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { KeyValueList } from "@/components/key-value-list";
import { Topbar } from "@/components/topbar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AHORA } from "@/lib/ahora";
import { formatFechaHora } from "@/lib/format";

/** Lo que el diálogo necesita saber del torneo (todo serializable). */
export type TorneoACancelar = {
  id: string;
  nombre: string;
  fechaInicio: string;
  inscritos: number;
  cupos: number;
};

/**
 * Cancelar torneo (O18): diálogo de confirmación sobre un resumen del
 * torneo. Solo se cancela antes de generar el bracket. Avisa a los inscritos
 * (automático) y, si se marca, publica un mensaje en el chat. Todavía no
 * guarda: el torneo pasa a «Cancelado» al conectar Supabase.
 */
export function CancelarTorneo({ torneo }: { torneo: TorneoACancelar }) {
  const router = useRouter();
  const [abierto, setAbierto] = useState(true);
  const [mensaje, setMensaje] = useState(true);
  const [cancelando, setCancelando] = useState(false);

  // «Copa Relámpago Bogotá» → «Copa Relámpago» para que quepa en el título.
  const corto = torneo.nombre.split(" ").slice(0, 2).join(" ");

  function volver() {
    setAbierto(false);
    router.back();
  }

  function cancelar() {
    setCancelando(true);
    toast.success("Torneo cancelado", {
      description: `Avisamos a los ${torneo.inscritos} inscritos${mensaje ? " y publicamos tu mensaje en el chat" : ""}.`,
    });
    router.push("/org/panel");
  }

  return (
    <>
      {/* El Resumen del torneo (O07) aún no está construido: detrás va su encabezado. */}
      <Topbar
        title={corto}
        subtitle={`Publicado · ${formatFechaHora(torneo.fechaInicio, AHORA)}`}
        fallbackHref="/org/panel"
        actions={
          <Button variant="glass" size="icon" aria-label="Más opciones">
            <MoreHorizontal />
          </Button>
        }
      />
      <KeyValueList
        className="mt-5"
        rows={[
          { label: "Inscritos", value: `${torneo.inscritos}/${torneo.cupos}` },
          { label: "Inicio", value: formatFechaHora(torneo.fechaInicio, AHORA) },
        ]}
      />

      <AlertDialog open={abierto} onOpenChange={(a) => (a ? setAbierto(true) : volver())}>
        <AlertDialogContent>
          <span className="mx-auto flex size-13 items-center justify-center rounded-md bg-warning-soft text-warning">
            <TriangleAlert className="size-icon-nav" aria-hidden />
          </span>
          <AlertDialogTitle className="mt-4">¿Cancelar la {corto}?</AlertDialogTitle>
          <AlertDialogDescription>
            Se notificará a los {torneo.inscritos} inscritos y el torneo pasará a «Cancelado».
            Podrás duplicarlo después.
          </AlertDialogDescription>

          <label className="mt-5 flex cursor-pointer items-center gap-3 text-left">
            <Checkbox checked={mensaje} onCheckedChange={setMensaje} />
            <span className="text-small text-ink-2">Enviar un mensaje a los inscritos</span>
          </label>

          <AlertDialogFooter>
            <Button variant="danger" disabled={cancelando} onClick={cancelar}>
              Cancelar torneo
            </Button>
            <Button variant="secondary" onClick={volver}>
              Volver
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
