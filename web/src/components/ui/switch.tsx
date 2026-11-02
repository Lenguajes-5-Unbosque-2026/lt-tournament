"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "cn"

// Switch del kit (§5.8): 50 × 30, perilla de 24; con acento al activarse.
function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer relative inline-flex h-7.5 w-12.5 shrink-0 items-center rounded-full bg-surface-3 p-0.75 transition-colors duration-(--dur-fast) ease-out outline-none after:absolute after:-inset-y-2 after:-inset-x-1 focus-visible:ring-2 focus-visible:ring-ring data-checked:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-6 rounded-full bg-ink-2 transition-transform duration-(--dur-fast) ease-out data-checked:translate-x-5 data-checked:bg-on-primary"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
