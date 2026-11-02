"use client";

import { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { compartirEnlace } from "@/lib/compartir";
import { cn } from "@/lib/utils";

/** Compartir el torneo desde el Detalle (J09, J12). */
export function ShareButton({ titulo }: { titulo: string }) {
  return (
    <Button
      variant="glass"
      size="icon"
      aria-label="Compartir torneo"
      onClick={() => compartirEnlace(titulo, window.location.href)}
    >
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
