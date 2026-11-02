"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Topbar (design/ui kit.md §4): volver o cerrar a la izquierda, título al
 * centro y acciones a la derecha. «Volver» regresa a la pantalla anterior
 * real; si se abrió la pantalla directo, va a `fallbackHref`.
 */
export function Topbar({
  title,
  leading = "back",
  fallbackHref,
  actions,
}: {
  title: string;
  leading?: "back" | "close";
  fallbackHref: string;
  actions?: React.ReactNode;
}) {
  const router = useRouter();
  const Icon = leading === "back" ? ChevronLeft : X;

  function volver() {
    if (window.history.length > 1) router.back();
    else router.push(fallbackHref);
  }

  return (
    <header className="grid min-h-touch grid-cols-[1fr_auto_1fr] items-center gap-2">
      <Button
        variant="glass"
        size="icon"
        aria-label={leading === "back" ? "Volver" : "Cerrar"}
        onClick={volver}
        className="justify-self-start"
      >
        <Icon />
      </Button>
      <h1 className="text-h2 text-ink">{title}</h1>
      <div className="flex items-center gap-2 justify-self-end">{actions}</div>
    </header>
  );
}
