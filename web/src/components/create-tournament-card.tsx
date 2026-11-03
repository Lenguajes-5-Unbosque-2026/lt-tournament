import Link from "next/link";
import { Plus, Trophy } from "lucide-react";
import { Render3D } from "@/components/render-3d";
import { buttonVariants } from "@/components/ui/button";

/** Tarjeta «Crea un nuevo torneo» del Panel (O01): lleva al paso 1 del asistente (O02). */
export function CreateTournamentCard() {
  return (
    <section
      aria-labelledby="crear-torneo-titulo"
      className="relative overflow-hidden rounded-lg border border-primary-line bg-linear-to-b from-primary/10 to-primary/2 p-5"
    >
      <div className="max-w-[60%]">
        <h2
          id="crear-torneo-titulo"
          className="font-display text-display-m text-ink uppercase italic"
        >
          Crea un nuevo torneo
        </h2>
        <p className="mt-2 text-small text-ink-2">
          4 pasos · menos de 5 minutos. Publícalo y compártelo.
        </p>
        <Link href="/org/crear" className={`${buttonVariants({ size: "sm" })} mt-4`}>
          <Plus />
          Empezar
        </Link>
      </div>
      <Render3D icon={Trophy} className="absolute -right-4 bottom-2 size-36" />
    </section>
  );
}
