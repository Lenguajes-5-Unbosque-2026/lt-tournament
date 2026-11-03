import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Botón del kit (design/ui kit.md §5.1 y §5.2): 4 variantes, tamaños L · S · XS
// y botón de ícono. Para ancho completo (dock) se pasa className="w-full".
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 border border-transparent font-semibold whitespace-nowrap transition-[transform,background-color] duration-(--dur-fast) ease-out outline-none select-none focus-visible:ring-2 focus-visible:ring-ring active:scale-98 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-disabled-bg disabled:text-disabled-text [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-on-primary hover:bg-primary-pressed active:bg-primary-pressed",
        secondary:
          "border-line-strong bg-surface-2 text-ink hover:bg-surface-3",
        ghost:
          "text-primary hover:bg-primary-soft active:bg-primary-soft",
        danger:
          "bg-danger text-on-primary hover:bg-danger-pressed active:bg-danger-pressed",
        // Botón de ícono: vidrio con borde (.iconbtn).
        glass:
          "border-line bg-glass text-ink backdrop-blur-md hover:bg-surface-3",
        link: "text-primary hover:underline",
      },
      size: {
        default:
          "h-13 rounded-md px-5.5 text-button-l [&_svg]:size-icon-btn",
        sm: "h-9.5 rounded-sm px-4 text-button-s [&_svg]:size-icon-btn-s",
        xs: "h-8 rounded-sm px-3 text-label font-semibold [&_svg]:size-icon-btn-s",
        icon: "size-touch rounded-md [&_svg]:size-icon-btn",
        "icon-sm": "size-9 rounded-sm [&_svg]:size-icon-btn-s",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
