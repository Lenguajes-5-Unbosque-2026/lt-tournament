"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { Crown, Gamepad2, type LucideIcon } from "lucide-react";

const MODOS: { value: "jugador" | "organizador"; titulo: string; descripcion: string; icon: LucideIcon }[] = [
  { value: "jugador", titulo: "Jugador", descripcion: "Explora y compite", icon: Gamepad2 },
  { value: "organizador", titulo: "Organizador", descripcion: "Crea y gestiona", icon: Crown },
];

/**
 * Tarjetas de modo de la app (Jugador · Organizador): una activa, con el
 * radio arriba a la derecha. Cambiar de modo cambia el acento de color.
 */
export function ModeCards({
  value,
  onValueChange,
}: {
  value: "jugador" | "organizador";
  onValueChange: (value: "jugador" | "organizador") => void;
}) {
  return (
    <RadioGroup
      aria-label="Modo de la app"
      value={value}
      onValueChange={(v) => onValueChange(v as "jugador" | "organizador")}
      className="grid grid-cols-2 gap-3"
    >
      {MODOS.map(({ value: v, titulo, descripcion, icon: Icon }) => (
        <Radio.Root
          key={v}
          value={v}
          className="group relative flex flex-col items-start rounded-lg border-2 border-line bg-surface p-4 text-left outline-none transition-colors duration-(--dur-fast) ease-out focus-visible:ring-2 focus-visible:ring-ring data-checked:border-primary data-checked:bg-primary-soft"
        >
          <span className="flex size-10 items-center justify-center rounded-sm bg-surface-3 text-ink-2 group-data-checked:bg-primary-soft group-data-checked:text-primary">
            <Icon className="size-icon-btn" aria-hidden />
          </span>
          <span className="absolute top-4 right-4 flex size-6 items-center justify-center rounded-full border-2 border-line-strong group-data-checked:border-primary">
            <Radio.Indicator className="size-3 rounded-full bg-primary" />
          </span>
          <span className="mt-3 text-strong text-ink">{titulo}</span>
          <span className="text-caption text-ink-3">{descripcion}</span>
        </Radio.Root>
      ))}
    </RadioGroup>
  );
}
