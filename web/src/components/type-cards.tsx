"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { ChartNoAxesColumn, Target, Users, type LucideIcon } from "lucide-react";
import { TIPOS, type TipoTorneo } from "@/lib/crear-config";

const ICONOS: Record<TipoTorneo, LucideIcon> = {
  uno_vs_uno: Users,
  battle_royale: Target,
  por_puntos: ChartNoAxesColumn,
};

/** Tarjetas de tipo de juego (1 vs 1, Battle royale, Por puntos): una sola activa. */
export function TypeCards({
  value,
  onValueChange,
}: {
  value: TipoTorneo;
  onValueChange: (value: TipoTorneo) => void;
}) {
  return (
    <RadioGroup
      aria-label="Tipo de juego"
      value={value}
      onValueChange={(v) => onValueChange(v as TipoTorneo)}
      className="grid grid-cols-3 gap-2.5"
    >
      {TIPOS.map((t) => {
        const Icon = ICONOS[t.value];
        return (
          <Radio.Root
            key={t.value}
            value={t.value}
            disabled={t.pronto}
            className="group flex flex-col items-start gap-2 rounded-md border border-line-strong bg-surface p-3 text-left outline-none transition-colors duration-(--dur-fast) ease-out focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60 data-checked:border-primary data-checked:bg-primary-soft"
          >
            <Icon className="size-icon-btn text-ink-2 group-data-checked:text-primary" aria-hidden />
            <span className="text-strong text-ink">{t.titulo}</span>
            <span className="text-caption text-ink-3">
              {t.descripcion}
            </span>
          </Radio.Root>
        );
      })}
    </RadioGroup>
  );
}
