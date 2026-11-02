"use client";

import { useEffect, useRef } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Subir archivo (portada, captura): zona punteada con ícono. Elegir una
 * imagen muestra su vista previa; `onChange` recibe una URL local o `null`.
 */
export function UploadZone({
  titulo,
  ayuda,
  previewUrl,
  onChange,
  className,
}: {
  titulo: string;
  ayuda: string;
  previewUrl: string | null;
  onChange: (previewUrl: string | null) => void;
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
        <img src={previewUrl} alt="Vista previa de la portada" className="absolute inset-0 size-full object-cover" />
      ) : (
        <>
          <span className="flex size-11 items-center justify-center rounded-md bg-primary-soft text-primary">
            <Upload className="size-icon-btn" aria-hidden />
          </span>
          <span className="text-strong text-ink">{titulo}</span>
          <span className="text-caption text-ink-3">{ayuda}</span>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="sr-only"
        onChange={(e) => elegir(e.target.files?.[0])}
      />
    </label>
  );
}
