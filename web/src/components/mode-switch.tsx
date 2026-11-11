"use client";

import { useRouter } from "next/navigation";
import { Segment } from "@/components/segment";

/**
 * Segmento Jugador / Organizador del perfil: la pantalla actual es la del
 * modo `actual`; elegir el otro lleva a su pantalla de inicio (el cambio
 * completo vive en «Ajustes y cuenta», J23).
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
        if (v === "organizador" && actual !== "organizador") router.push("/org/panel");
        if (v === "jugador" && actual !== "jugador") router.push("/inicio");
      }}
    />
  );
}
