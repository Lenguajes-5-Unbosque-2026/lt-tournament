"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "cn"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-3", className)}
      {...props}
    />
  )
}

// Radio del kit (§5.8): 24 × 24 circular, borde de 2 px y punto interno de 12 px.
function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "relative flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-line-strong outline-none transition-colors duration-(--dur-fast) ease-out after:absolute after:-inset-2 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed data-checked:border-primary",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="size-3 rounded-full bg-primary"
      />
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
