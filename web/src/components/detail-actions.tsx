"use client";

import { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Compartir: la hoja nativa del celular y, si no existe, copia el enlace. */
export function ShareButton({ titulo }: { titulo: string }) {
  async function compartir() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: titulo, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Enlace copiado");
      }
    } catch {
      // El jugador cerró la hoja de compartir: no es un error.
    }
  }

  return (
    <Button variant="glass" size="icon" aria-label="Compartir torneo" onClick={compartir}>
      <Share2 />
    </Button>
  );
}

/** Corazón para guardar el torneo. Sin pantalla de guardados todavía (spec, pregunta 5). */
export function FavoriteButton() {
  const [activo, setActivo] = useState(false);

  return (
    <Button
      variant="glass"
      size="icon"
      aria-label={activo ? "Quitar de guardados" : "Guardar torneo"}
      aria-pressed={activo}
      onClick={() => setActivo((a) => !a)}
      className={cn(activo && "border-primary-line bg-primary-soft text-primary")}
    >
      <Heart className={cn(activo && "fill-current")} />
    </Button>
  );
}
