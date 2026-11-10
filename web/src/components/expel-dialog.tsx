"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

/**
 * Confirmar expulsión (O10): diálogo con el aviso de que no se puede deshacer
 * y un motivo opcional que se le avisa al jugador.
 */
export function ExpelDialog({
  nombre,
  onConfirm,
  onCancel,
}: {
  /** Jugador a expulsar; `null` cierra el diálogo. */
  nombre: string | null;
  onConfirm: (motivo: string) => void;
  onCancel: () => void;
}) {
  const [motivo, setMotivo] = useState("");

  return (
    <AlertDialog
      open={nombre !== null}
      onOpenChange={(abierto) => {
        if (!abierto) {
          setMotivo("");
          onCancel();
        }
      }}
    >
      <AlertDialogContent>
        <span className="mx-auto flex size-13 items-center justify-center rounded-md bg-danger-soft text-danger">
          <TriangleAlert className="size-icon-nav" aria-hidden />
        </span>
        <AlertDialogTitle className="mt-4">¿Expulsar a {nombre}?</AlertDialogTitle>
        <AlertDialogDescription>
          Perderá su cupo y no podrá volver a inscribirse en este torneo. Esta acción no se puede
          deshacer.
        </AlertDialogDescription>

        <label className="mt-5 block text-left text-label text-ink-2" htmlFor="motivo-expulsion">
          Motivo (opcional)
        </label>
        <input
          id="motivo-expulsion"
          type="text"
          value={motivo}
          maxLength={120}
          onChange={(e) => setMotivo(e.target.value)}
          placeholder="Ej: no respetó las reglas"
          className="mt-2 min-h-13 w-full rounded-md border border-line bg-surface px-4 text-body text-ink outline-none transition-colors duration-(--dur-fast) ease-out placeholder:text-ink-3 focus:border-primary focus:ring-1 focus:ring-primary"
        />

        <AlertDialogFooter>
          <Button
            variant="danger"
            onClick={() => {
              onConfirm(motivo.trim());
              setMotivo("");
            }}
          >
            Sí, expulsar
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
