"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

/**
 * Diálogo al cerrar el asistente con la X: guardar el borrador o descartar
 * los cambios (decisión de la spec; falta en Figma). Ambas salidas vuelven
 * al Panel. Por ahora el borrador no se guarda en la base de datos.
 */
export function ExitWizardDialog({
  open,
  onOpenChange,
  onSaveDraft,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Guarda el borrador; `false` si falló y no hay que salir. */
  onSaveDraft?: () => Promise<boolean>;
}) {
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogTitle>¿Salir sin publicar?</AlertDialogTitle>
        <AlertDialogDescription>
          Puedes guardar lo que llevas como borrador y retomarlo después desde tu panel.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <Button
            onClick={async () => {
              if (onSaveDraft && !(await onSaveDraft())) return;
              toast.success("Borrador guardado");
              router.push("/org/panel");
            }}
          >
            Guardar borrador
          </Button>
          <Button variant="danger" onClick={() => router.push("/org/panel")}>
            Descartar cambios
          </Button>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Seguir editando
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
