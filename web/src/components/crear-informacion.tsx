"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trophy } from "lucide-react";
import { toast } from "sonner";
import { useCrearTorneo } from "@/components/crear-torneo-provider";
import { ExitWizardDialog } from "@/components/exit-wizard-dialog";
import { GamePicker } from "@/components/game-picker";
import { TextAreaField, TextField } from "@/components/text-field";
import { UploadZone } from "@/components/upload-zone";
import { WizardHeader } from "@/components/wizard-header";
import { Button } from "@/components/ui/button";
import { MAX_DESCRIPCION, MAX_NOMBRE } from "@/lib/crear-config";
import type { Juego } from "@/lib/types";

/** Paso 1 de 4 · Información (O02): portada, juego, nombre y descripción. */
export function CrearInformacion({ juegos }: { juegos: Juego[] }) {
  const router = useRouter();
  const { borrador, actualizar } = useCrearTorneo();
  const [saliendo, setSaliendo] = useState(false);
  const juego = juegos.find((j) => j.id === borrador.juegoId);
  const completo = borrador.nombre.trim() !== "" && juego !== undefined;

  return (
    <>
      <WizardHeader paso={1} fallbackHref="/org/panel" onLeadingClick={() => setSaliendo(true)} />

      <UploadZone
        titulo="Sube la portada"
        ayuda="Recomendado 1200×750 · JPG o PNG"
        previewUrl={borrador.portadaUrl}
        onChange={(portadaUrl) => actualizar({ portadaUrl })}
        className="mt-4"
      />

      <h2 className="mt-5 mb-3 text-label text-ink-2">Juego</h2>
      <GamePicker
        label="Juego"
        juegos={juegos}
        value={borrador.juegoId}
        onValueChange={(juegoId) => actualizar({ juegoId })}
      />
      {juego && (
        <p className="mt-4 text-caption text-ink-3">
          Con {juego.nombre} puedes crear torneos de cualquier tipo. En el siguiente paso
          eliges: 1 vs 1, Battle royale o Por puntos.
        </p>
      )}

      <div className="mt-5">
        <TextField
          label="Nombre del torneo"
          icon={Trophy}
          value={borrador.nombre}
          onValueChange={(nombre) => actualizar({ nombre })}
          maxLength={MAX_NOMBRE}
          placeholder="Copa Relámpago Bogotá"
          ayuda={null}
        />
      </div>
      <div className="mt-5">
        <TextAreaField
          label="Descripción"
          icon={Pencil}
          value={borrador.descripcion}
          onValueChange={(descripcion) => actualizar({ descripcion })}
          maxLength={MAX_DESCRIPCION}
          placeholder="Torneo 1v1 de FC 25 para la comunidad de Bogotá."
          ayuda="Cuenta qué hace especial tu torneo"
        />
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <Button
          className="w-full"
          disabled={!completo}
          onClick={() => router.push("/org/crear/formato")}
        >
          Continuar
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => {
            toast.success("Borrador guardado");
            router.push("/org/panel");
          }}
        >
          Guardar borrador
        </Button>
      </div>

      <ExitWizardDialog open={saliendo} onOpenChange={setSaliendo} />
    </>
  );
}
