"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Check } from "lucide-react";
import { GameArt } from "@/components/game-art";
import type { Juego } from "@/lib/types";

/**
 * Selector de juegos de varias opciones (gamePicker): rejilla de 2 columnas
 * con portada, anillo de acento y check en los elegidos.
 */
export function GameMultiPicker({
  juegos,
  value,
  onValueChange,
  label,
}: {
  juegos: Juego[];
  value: string[];
  onValueChange: (ids: string[]) => void;
  label: string;
}) {
  return (
    <ToggleGroup
      aria-label={label}
      multiple
      value={value}
      onValueChange={onValueChange}
      className="grid grid-cols-2 gap-x-4 gap-y-3"
    >
      {juegos.map((j) => (
        <Toggle
          key={j.id}
          value={j.id}
          className="group flex flex-col items-start gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="relative block w-full rounded-md ring-2 ring-transparent transition-shadow duration-(--dur-fast) ease-out group-data-pressed:ring-primary">
            <GameArt
              src={j.imagen}
              color1={j.color1}
              color2={j.color2}
              abreviatura={j.abreviatura}
              className="h-28 w-full"
              sizes="(max-width: 390px) 50vw, 180px"
            />
            <span className="absolute top-2 right-2 hidden size-6 items-center justify-center rounded-sm bg-primary text-on-primary group-data-pressed:flex">
              <Check className="size-icon-chip" strokeWidth={3} aria-hidden />
            </span>
          </span>
          <span className="text-small text-ink">{j.nombre}</span>
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
