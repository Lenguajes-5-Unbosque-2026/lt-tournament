"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { Check } from "lucide-react";
import { GameArt } from "@/components/game-art";
import type { Juego } from "@/lib/types";

/**
 * Selector de juegos (gamePicker): rejilla de portadas con check en la
 * elegida. Un solo juego a la vez.
 */
export function GamePicker({
  juegos,
  value,
  onValueChange,
  label,
}: {
  juegos: Juego[];
  value: string;
  onValueChange: (id: string) => void;
  label: string;
}) {
  return (
    <RadioGroup
      aria-label={label}
      value={value}
      onValueChange={(v) => onValueChange(v as string)}
      className="grid grid-cols-3 gap-3"
    >
      {juegos.map((j) => (
        <Radio.Root
          key={j.id}
          value={j.id}
          className="group flex flex-col items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="relative block w-full rounded-md ring-2 ring-transparent transition-shadow duration-(--dur-fast) ease-out group-data-checked:ring-primary">
            <GameArt
              src={j.imagen}
              color1={j.color1}
              color2={j.color2}
              abreviatura={j.abreviatura}
              className="h-16 w-full"
              sizes="120px"
            />
            <Radio.Indicator className="absolute top-1.5 right-1.5 flex size-5.5 items-center justify-center rounded-sm bg-primary text-on-primary">
              <Check className="size-icon-chip" strokeWidth={3} aria-hidden />
            </Radio.Indicator>
          </span>
          <span className="text-caption text-ink-2 group-data-checked:text-ink">{j.nombre}</span>
        </Radio.Root>
      ))}
    </RadioGroup>
  );
}
