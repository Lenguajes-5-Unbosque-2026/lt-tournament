"use client"

import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cn } from "cn"

// Barra de progreso del kit (§5.16): pista de 6 px en surface-3 y relleno de acento.
function Progress({
  className,
  value,
  tone = "accent",
  ...props
}: ProgressPrimitive.Root.Props & { tone?: "accent" | "success" }) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn("w-full", className)}
      {...props}
    >
      <ProgressPrimitive.Track
        data-slot="progress-track"
        className="relative flex h-1.5 w-full items-center overflow-hidden rounded-full bg-surface-3"
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "h-full rounded-full transition-[width] duration-(--dur-bar) ease-out",
            tone === "success" ? "bg-success" : "bg-primary"
          )}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

export { Progress }
