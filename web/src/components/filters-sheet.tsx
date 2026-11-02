"use client";

import { useState } from "react";
import { ChipGroup } from "@/components/chip";
import { Segment } from "@/components/segment";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Switch } from "@/components/ui/switch";
import {
  SIN_FILTROS,
  type FiltroFecha,
  type Filtros,
} from "@/lib/torneo";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filtros: Filtros;
  /** Opciones del filtro «Juego». */
  juegos: { id: string; nombre: string }[];
  /** Cuántos torneos dejaría un conjunto de filtros (para «Ver N resultados»). */
  contar: (filtros: Filtros) => number;
  onApply: (filtros: Filtros) => void;
};

// MVP individual: la única modalidad es 1 vs 1 (specs/jugador-descubrir-e-inscribirse).
const MODALIDADES = [{ value: "1", label: "1 vs 1" }];

const FECHAS: { value: FiltroFecha; label: string }[] = [
  { value: "hoy", label: "Hoy" },
  { value: "semana", label: "Esta semana" },
  { value: "mes", label: "Este mes" },
];

/** Hoja de filtros (J08) sobre Explorar. Los cambios se aplican con «Ver N resultados». */
export function FiltersSheet(props: Props) {
  // Se remonta al abrir para partir siempre de los filtros aplicados.
  return (
    <Drawer open={props.open} onOpenChange={props.onOpenChange} showSwipeHandle>
      <DrawerContent className="mx-auto! w-full max-w-phone">
        {props.open && <FiltersForm {...props} />}
      </DrawerContent>
    </Drawer>
  );
}

function FiltersForm({ onOpenChange, filtros, juegos, contar, onApply }: Props) {
  const [borrador, setBorrador] = useState<Filtros>(filtros);
  const cambiar = (parcial: Partial<Filtros>) =>
    setBorrador((b) => ({ ...b, ...parcial }));
  const limpiar = () => setBorrador(SIN_FILTROS);
  const resultados = contar(borrador);

  return (
    <div className="overflow-y-auto px-screen pt-2.5 pb-8.5">
      <div className="flex items-center justify-between">
        <DrawerTitle>Filtros</DrawerTitle>
        <Button variant="link" size="xs" className="px-0" onClick={limpiar}>
          Limpiar
        </Button>
      </div>

      <Section titulo="Juego">
        <ChipGroup
          label="Juego"
          multiple
          options={juegos.map((j) => ({ value: j.id, label: j.nombre }))}
          value={borrador.juegos}
          onValueChange={(juegos) => cambiar({ juegos })}
        />
      </Section>

      <Section titulo="Modalidad">
        <ChipGroup
          label="Modalidad"
          multiple
          options={MODALIDADES}
          value={borrador.modalidades.map(String)}
          onValueChange={(v) => cambiar({ modalidades: v.map(Number) })}
        />
      </Section>

      <Section titulo="Fecha">
        <Segment
          label="Fecha"
          options={FECHAS}
          value={borrador.fecha}
          onValueChange={(fecha) => cambiar({ fecha: fecha as FiltroFecha | null })}
        />
      </Section>

      <div className="mt-4 flex flex-col gap-3">
        <SwitchRow
          titulo="Solo con cupos disponibles"
          descripcion="Oculta torneos llenos"
          checked={borrador.soloConCupos}
          onCheckedChange={(soloConCupos) => cambiar({ soloConCupos })}
        />
        <SwitchRow
          titulo="Cerca de mí"
          descripcion="Bogotá · radio de 10 km"
          checked={borrador.cercaDeMi}
          onCheckedChange={(cercaDeMi) => cambiar({ cercaDeMi })}
        />
      </div>

      <div className="mt-4 grid grid-cols-[1fr_1.4fr] gap-3">
        <Button variant="secondary" onClick={limpiar}>
          Limpiar
        </Button>
        <Button
          onClick={() => {
            onApply(borrador);
            onOpenChange(false);
          }}
        >
          Ver {resultados} {resultados === 1 ? "resultado" : "resultados"}
        </Button>
      </div>
    </div>
  );
}

function Section({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h3 className="mb-3 text-overline text-ink-3 uppercase">{titulo}</h3>
      {children}
    </section>
  );
}

function SwitchRow({
  titulo,
  descripcion,
  checked,
  onCheckedChange,
}: {
  titulo: string;
  descripcion: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-md border border-line bg-surface px-4 py-3.5">
      <span>
        <span className="block text-strong text-ink">{titulo}</span>
        <span className="block text-caption text-ink-3">{descripcion}</span>
      </span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} aria-label={titulo} />
    </label>
  );
}
