"use client";

import { useId } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Campo de fecha u hora (.field, design/ui kit.md §5.7). Se ve como un campo
 * con ícono y el valor ya formateado («Sáb 4 Oct»); debajo lleva el selector
 * nativo del celular, invisible, que recibe el toque.
 */
export function DateTimeField({
  label,
  icon: Icon,
  type,
  value,
  display,
  placeholder,
  onValueChange,
  min,
  ayuda,
  invalid = false,
}: {
  label: string;
  icon: LucideIcon;
  type: "date" | "time" | "datetime-local";
  /** Valor crudo del input: AAAA-MM-DD, HH:mm o AAAA-MM-DDTHH:mm. */
  value: string;
  /** Texto formateado que se muestra; vacío si aún no se elige. */
  display: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  min?: string;
  ayuda?: string;
  invalid?: boolean;
}) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="text-label text-ink-2">
        {label}
      </label>
      <div
        className={cn(
          "relative mt-2 flex min-h-13 items-center gap-3 rounded-md border bg-surface px-4 transition-colors duration-(--dur-fast) ease-out focus-within:ring-1",
          invalid
            ? "border-danger ring-danger"
            : "border-line focus-within:border-primary focus-within:ring-primary",
        )}
      >
        <Icon className="size-icon-btn shrink-0 text-ink-3" aria-hidden />
        <span className={cn("truncate text-body", display ? "text-ink" : "text-ink-3")}>
          {display || placeholder}
        </span>
        <input
          id={id}
          type={type}
          value={value}
          min={min}
          aria-invalid={invalid}
          onChange={(e) => onValueChange(e.target.value)}
          onClick={(e) => {
            // Abre el selector al tocar cualquier parte del campo.
            try {
              e.currentTarget.showPicker();
            } catch {
              // Navegador sin showPicker: el toque enfoca el campo igual.
            }
          }}
          className="absolute inset-0 size-full cursor-pointer opacity-0"
        />
      </div>
      {ayuda && (
        <p className={cn("mt-2 text-caption", invalid ? "text-danger" : "text-ink-3")}>{ayuda}</p>
      )}
    </div>
  );
}
