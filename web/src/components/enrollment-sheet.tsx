"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";
import { GameArt } from "@/components/game-art";
import { KeyValueList } from "@/components/key-value-list";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";

/** Lo que la hoja necesita saber del torneo (todo serializable desde el servidor). */
export type ResumenTorneo = {
  id: string;
  nombre: string;
  imagen: string;
  color1: string;
  color2: string;
  abreviatura: string;
  /** «Sáb 4 Oct · 7:00 pm · 1 vs 1» */
  detalle: string;
};

/**
 * Hoja «Confirma tu inscripción» (J10) sobre el Detalle. La inscripción es
 * gratuita e individual; se exige aceptar las reglas. Al confirmar pasa a
 * «Inscripción confirmada» (J11).
 */
export function EnrollmentSheet({
  open,
  onOpenChange,
  torneo,
  gamertag,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  torneo: ResumenTorneo;
  gamertag: string;
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} showSwipeHandle>
      <DrawerContent className="mx-auto! w-full max-w-phone">
        {open && <EnrollmentForm torneo={torneo} gamertag={gamertag} />}
      </DrawerContent>
    </Drawer>
  );
}

function EnrollmentForm({
  torneo,
  gamertag,
}: {
  torneo: ResumenTorneo;
  gamertag: string;
}) {
  const router = useRouter();
  const [acepta, setAcepta] = useState(false);
  const [enviando, setEnviando] = useState(false);

  function confirmar() {
    setEnviando(true);
    router.push(`/torneo/${torneo.id}/inscripcion`);
  }

  return (
    <div className="overflow-y-auto px-screen pt-2.5 pb-8.5">
      <DrawerTitle className="mt-2 text-h1 text-ink normal-case not-italic">
        Confirma tu inscripción
      </DrawerTitle>

      <div className="mt-4 flex items-center gap-3 rounded-lg border border-line bg-surface p-3">
        <GameArt
          src={torneo.imagen}
          color1={torneo.color1}
          color2={torneo.color2}
          abreviatura={torneo.abreviatura}
          className="size-12"
          sizes="48px"
        />
        <div className="min-w-0">
          <p className="truncate text-strong text-ink">{torneo.nombre}</p>
          <p className="text-caption text-ink-3">{torneo.detalle}</p>
        </div>
      </div>

      <KeyValueList
        className="mt-4"
        rows={[
          { label: "Gamertag", value: gamertag },
          { label: "Entrada", value: "Gratis", tone: "success" },
        ]}
      />

      <label className="mt-5 flex cursor-pointer items-start gap-3">
        <Checkbox checked={acepta} onCheckedChange={setAcepta} className="mt-0.5" />
        <span className="text-body text-ink-2">
          Acepto las reglas del torneo y el check-in obligatorio
        </span>
      </label>

      <Alert variant="info" className="mt-5">
        <Info aria-hidden />
        <AlertTitle>Puedes cancelar hasta 1 h antes</AlertTitle>
        <AlertDescription>Así liberas tu cupo para la lista de espera.</AlertDescription>
      </Alert>

      <div className="mt-5 flex flex-col gap-3">
        <Button className="w-full" disabled={!acepta || enviando} onClick={confirmar}>
          Confirmar inscripción
        </Button>
        <DrawerClose render={<Button variant="secondary" className="w-full" />}>
          Cancelar
        </DrawerClose>
      </div>
    </div>
  );
}
