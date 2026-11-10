import { Suspense } from "react";
import { BRRegistrar } from "@/components/br-registrar";

/** Registrar resultados (BR · O3) de la partida `numero`. */
async function Registrar({ params }: { params: Promise<{ numero: string }> }) {
  const { numero } = await params;
  return <BRRegistrar numero={Number(numero)} />;
}

export default function RegistrarPage({
  params,
}: PageProps<"/org/torneos/[id]/bracket/registrar/[numero]">) {
  return (
    <Suspense>
      <Registrar params={params} />
    </Suspense>
  );
}
