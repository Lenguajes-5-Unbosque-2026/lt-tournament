"use client";

import { useEffect, useRef } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Subir archivo (portada, captura): zona punteada con ícono. Elegir una
 * imagen muestra su vista previa; `onChange` recibe una URL local o `null`.
 * `variant="row"` es la versión compacta de una fila (miniatura · texto ·
 * ícono de subir) que usa «Captura de la tabla final» en BR · O3.
 */
export function UploadZone({
  titulo,
  ayuda,
  previewUrl,
  onChange,
  alt = "Vista previa de la portada",
  variant = "block",
  className,
}: {
  titulo: string;
  ayuda: string;
  previewUrl: string | null;
  onChange: (previewUrl: string | null) => void;
  /** Texto alternativo de la vista previa. */
  alt?: string;
  variant?: "block" | "row";
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const urlActual = useRef<string | null>(null);

  // Libera la vista previa anterior al cambiar o al salir de la pantalla.
  useEffect(() => {
    return () => {
      if (urlActual.current) URL.revokeObjectURL(urlActual.current);
    };
  }, []);

  function elegir(archivo: File | undefined) {
    if (!archivo) return;
    if (urlActual.current) URL.revokeObjectURL(urlActual.current);
    urlActual.current = URL.createObjectURL(archivo);
    onChange(urlActual.current);
  }

  const input = (
    <input
      ref={inputRef}
      type="file"
      accept="image/jpeg,image/png"
      className="sr-only"
      onChange={(e) => elegir(e.target.files?.[0])}
    />
  );

  if (variant === "row") {
    return (
      <label
        className={cn(
          "flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-primary-line bg-primary-soft/40 p-3 transition-colors duration-(--dur-fast) ease-out focus-within:ring-2 focus-within:ring-ring hover:border-primary",
          className,
        )}
      >
        {previewUrl ? (
          // Vista previa local (blob:) o imagen del mock: next/image no aporta aquí.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt={alt} className="size-14 shrink-0 rounded-sm object-cover" />
        ) : (
          <span className="flex size-14 shrink-0 items-center justify-center rounded-sm bg-surface-2 text-ink-3">
            <Upload className="size-icon-btn" aria-hidden />
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block text-strong text-ink">{titulo}</span>
          <span className="block text-caption text-ink-3">{ayuda}</span>
        </span>
        <Upload className="size-icon-btn shrink-0 text-primary" aria-hidden />
        {input}
      </label>
    );
  }

  return (
    <label
      className={cn(
        "relative flex h-44 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-dashed border-line-strong text-center transition-colors duration-(--dur-fast) ease-out focus-within:ring-2 focus-within:ring-ring hover:border-primary-line",
        className,
      )}
    >
      {previewUrl ? (
        // La vista previa es una URL local (blob:): next/image no la optimiza.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={previewUrl} alt={alt} className="absolute inset-0 size-full object-cover" />
      ) : (
        <>
          <span className="flex size-11 items-center justify-center rounded-md bg-primary-soft text-primary">
            <Upload className="size-icon-btn" aria-hidden />
          </span>
          <span className="text-strong text-ink">{titulo}</span>
          <span className="text-caption text-ink-3">{ayuda}</span>
        </>
      )}
      {input}
    </label>
  );
}
