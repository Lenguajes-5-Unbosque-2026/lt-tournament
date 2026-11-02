import { cn } from "@/lib/utils";

/** Logo «LT»: cuadrado del acento con resplandor y las letras en display. */
export function LogoLt({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="LT Tournament"
      className={cn(
        "flex size-26 items-center justify-center rounded-xl bg-primary shadow-[0_0_48px_rgba(var(--accent-rgb),.45)]",
        className,
      )}
    >
      <span className="font-display text-display-xl text-on-primary italic">LT</span>
    </div>
  );
}
