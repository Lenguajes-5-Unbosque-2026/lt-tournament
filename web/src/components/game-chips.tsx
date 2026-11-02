"use client";

import { ChipGroup } from "@/components/chip";

const TODOS = "todos";

/**
 * Chips «Todos · juego · juego…» para filtrar rápido por juego. Elegir
 * un chip reemplaza la selección; «Todos» la limpia. Si hay varios
 * juegos elegidos (desde Filtros), ningún chip aparece marcado.
 */
export function GameChips({
  juegos,
  selected,
  onChange,
  label = "Juego",
  className,
}: {
  juegos: { id: string; nombre: string }[];
  selected: string[];
  onChange: (juegos: string[]) => void;
  label?: string;
  className?: string;
}) {
  const value = selected.length === 0 ? [TODOS] : selected.length === 1 ? selected : [];

  return (
    <ChipGroup
      label={label}
      className={className}
      options={[
        { value: TODOS, label: "Todos" },
        ...juegos.map((j) => ({ value: j.id, label: j.nombre })),
      ]}
      value={value}
      onValueChange={(v) => {
        const elegido = v.find((x) => !value.includes(x));
        onChange(elegido && elegido !== TODOS ? [elegido] : []);
      }}
    />
  );
}
