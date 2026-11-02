"use client";

import { useId } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Comun = {
  label: string;
  icon: LucideIcon;
  value: string;
  onValueChange: (value: string) => void;
  maxLength: number;
  placeholder?: string;
  /** Texto bajo el campo. Si es `null` se muestra el contador «n/60 caracteres». */
  ayuda?: string | null;
  /** Mensaje de error concreto: pinta el campo y la ayuda en danger. */
  error?: string;
  type?: "text" | "email";
  autoComplete?: string;
};

const CAJA =
  "mt-2 flex gap-3 rounded-md border bg-surface px-4 transition-colors duration-(--dur-fast) ease-out focus-within:ring-1";

function colorCaja(error?: string) {
  return error
    ? "border-danger ring-danger"
    : "border-line focus-within:border-primary focus-within:ring-primary";
}

/** Campo de texto (.field, design/ui kit.md §5.7): label, ícono, ayuda o contador. */
export function TextField({ icon: Icon, ...props }: Comun) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-label text-ink-2">
        {props.label}
      </label>
      <div className={cn(CAJA, colorCaja(props.error), "min-h-13 items-center")}>
        <Icon className="size-icon-btn shrink-0 text-ink-3" aria-hidden />
        <input
          id={id}
          type={props.type ?? "text"}
          autoComplete={props.autoComplete}
          aria-invalid={props.error ? true : undefined}
          value={props.value}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          onChange={(e) => props.onValueChange(e.target.value)}
          className="min-w-0 flex-1 bg-transparent py-3 text-body text-ink outline-none placeholder:text-ink-3"
        />
      </div>
      <Ayuda {...props} />
    </div>
  );
}

/** Variante multilínea del campo de texto (descripción). */
export function TextAreaField({ icon: Icon, ...props }: Comun) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-label text-ink-2">
        {props.label}
      </label>
      <div className={cn(CAJA, colorCaja(props.error), "min-h-24 items-start py-3")}>
        <Icon className="mt-0.5 size-icon-btn shrink-0 text-ink-3" aria-hidden />
        <textarea
          id={id}
          rows={3}
          value={props.value}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          onChange={(e) => props.onValueChange(e.target.value)}
          className="field-sizing-content min-h-16 min-w-0 flex-1 resize-none bg-transparent text-body text-ink outline-none placeholder:text-ink-3"
        />
      </div>
      <Ayuda {...props} />
    </div>
  );
}

function Ayuda({
  ayuda,
  error,
  value,
  maxLength,
}: Pick<Comun, "ayuda" | "error" | "value" | "maxLength">) {
  const texto = error ?? ayuda ?? `${value.length}/${maxLength} caracteres`;
  return <p className={cn("mt-2 text-caption", error ? "text-danger" : "text-ink-3")}>{texto}</p>;
}
