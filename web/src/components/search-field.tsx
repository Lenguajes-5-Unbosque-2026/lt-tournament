"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

/**
 * Buscador con botón de filtros (design/ui kit.md §5.7, «Búsqueda»): ícono
 * a la izquierda y botón de filtros en acento a la derecha. `activos` pinta
 * un punto cuando hay filtros aplicados.
 */
export function SearchField({
  value,
  onValueChange,
  onOpenFilters,
  activos = false,
  placeholder,
}: {
  value: string;
  onValueChange: (value: string) => void;
  onOpenFilters: () => void;
  activos?: boolean;
  placeholder: string;
}) {
  return (
    <InputGroup className="h-auto min-h-13 rounded-md border-line bg-surface py-1 pr-1.5 pl-1 dark:bg-surface">
      <InputGroupAddon>
        <Search className="size-icon-btn" aria-hidden />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        aria-label="Buscar torneos"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="h-11 text-body text-ink placeholder:text-ink-3"
      />
      <InputGroupAddon align="inline-end">
        <Button
          size="icon"
          aria-label={activos ? "Filtros (hay filtros aplicados)" : "Filtros"}
          onClick={onOpenFilters}
          className="relative size-10 rounded-sm"
        >
          <SlidersHorizontal />
          {activos && (
            <span
              aria-hidden
              className="absolute -top-1 -right-1 size-2 rounded-full bg-ink ring-2 ring-surface"
            />
          )}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
