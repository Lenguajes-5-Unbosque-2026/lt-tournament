import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Etiqueta de estado (.tag) y pill (design/ui kit.md §5.6 y §6). Las variantes
// de color van por estado; `tag` agrega el punto de 6 px y `live` lo hace pulsar.
const badgeVariants = cva(
  "inline-flex h-5.5 w-fit shrink-0 items-center justify-center gap-1.5 rounded-full px-2.5 text-overline font-semibold whitespace-nowrap uppercase",
  {
    variants: {
      variant: {
        success: "bg-success-soft text-success",
        info: "bg-info-soft text-info",
        warning: "bg-warning-soft text-warning",
        danger: "bg-danger-soft text-danger",
        accent: "bg-primary-soft text-primary",
        neutral: "bg-surface-3 text-ink-2",
      },
      dot: {
        true: "before:size-1.5 before:rounded-full before:bg-current before:content-['']",
        false: "",
      },
      live: {
        true: "before:animate-pulse before:[animation-duration:var(--pulse-live)]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "neutral",
      dot: true,
      live: false,
    },
  }
)

function Badge({
  className,
  variant,
  dot,
  live,
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, dot, live }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
