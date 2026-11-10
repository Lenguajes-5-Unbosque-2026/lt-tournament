"use client";

import { useRouter } from "next/navigation";
import { Segment } from "@/components/segment";

/**
 * Segmento Jugador / Organizador del Perfil: cambia de modo. La pantalla
 * actual es la del modo `actual`; elegir el otro lleva a su pantalla de inicio
 * (el cambio completo vive en «Ajustes y modo», J23, todavía sin construir).
 */
export function ModeSwitch({ actual }: { actual: "jugador" | "organizador" }) {
  const router = useRouter();

  return (
    <Segment
      label="Modo de la cuenta"
      options={[
        { value: "jugador", label: "Jugador" },
        { value: "organizador", label: "Organizador" },
      ]}
      value={actual}
      onValueChange={(v) => {
        if (v === "organizador") router.push("/org/panel");
      }}
    />
  );
}
