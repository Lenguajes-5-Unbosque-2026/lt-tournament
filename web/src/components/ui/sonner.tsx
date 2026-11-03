"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon } from "lucide-react"

// Toast del kit (§5.24): la app es oscura siempre, así que no usa next-themes.
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="bottom-center"
      duration={2400}
      icons={{
        success: <CircleCheckIcon className="size-icon-btn text-success" />,
        info: <InfoIcon className="size-icon-btn text-info" />,
        warning: <TriangleAlertIcon className="size-icon-btn text-warning" />,
        error: <OctagonXIcon className="size-icon-btn text-danger" />,
      }}
      style={
        {
          "--normal-bg": "var(--color-surface-3)",
          "--normal-text": "var(--color-text)",
          "--normal-border": "var(--color-border-strong)",
          "--border-radius": "var(--radius-md)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
