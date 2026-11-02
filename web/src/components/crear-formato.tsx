"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCrearTorneo } from "@/components/crear-torneo-provider";
import { OptionGroup } from "@/components/option-group";
import { QuantityField } from "@/components/quantity-field";
import { SwitchRow } from "@/components/switch-row";
import { TypeCards } from "@/components/type-cards";
import { WizardHeader } from "@/components/wizard-header";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ATAJOS,
  FORMATOS_BATTLE_ROYALE,
  FORMATOS_UNO_VS_UNO,
  RANGOS,
  limitePorNivel,
  type FormatoOpcion,
  type TipoTorneo,
} from "@/lib/crear-config";

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h2 className="mb-3 text-overline text-ink-3 uppercase">{titulo}</h2>
      {children}
    </section>
  );
}

function opciones(formatos: FormatoOpcion[]) {
  return formatos.map((f) => ({
    value: f.value,
    titulo: f.titulo,
    descripcion: f.descripcion,
    recomendado: f.recomendado,
    deshabilitado: f.fueraDelMvp,
  }));
}

/**
 * Paso 2 de 4 · Formato (O03, O03b y sus variantes de cantidad personalizada):
 * tipo de juego, formato y cantidades. «Por puntos» (O03c) aún no está construido.
 */
export function CrearFormato() {
  const router = useRouter();
  const { borrador, actualizar, nivel } = useCrearTorneo();
  const limite = limitePorNivel(nivel);
  const { unoVsUno: uno, battleRoyale: br } = borrador;

  return (
    <>
      <WizardHeader paso={2} fallbackHref="/org/crear" />

      <Seccion titulo="Tipo de juego">
        <TypeCards
          value={borrador.tipo}
          onValueChange={(tipo: TipoTorneo) => actualizar({ tipo })}
        />
      </Seccion>

      {borrador.tipo === "uno_vs_uno" && (
        <>
          <Seccion titulo="Formato">
            <OptionGroup
              label="Formato"
              value={uno.formato}
              onValueChange={(formato) => actualizar({ unoVsUno: { ...uno, formato } })}
              options={opciones(FORMATOS_UNO_VS_UNO)}
            />
          </Seccion>
          <div className="mt-4 flex flex-col gap-4">
            <QuantityField
              titulo="Cupos"
              ayuda="Jugadores · potencias de 2"
              value={uno.cupos}
              onChange={(cupos) => actualizar({ unoVsUno: { ...uno, cupos } })}
              {...RANGOS.cuposUnoVsUno}
              limite={limite}
              atajos={ATAJOS.cupos}
              unidad="jugadores"
              pista={`Entre ${RANGOS.cuposUnoVsUno.min} y ${RANGOS.cuposUnoVsUno.max}. Si no es potencia de 2, se juega una ronda previa para completar el cuadro.`}
            />
            <QuantityField
              titulo="Tiempo por partida"
              ayuda="Minutos · el reloj corre al iniciar"
              value={uno.minutos}
              onChange={(minutos) => actualizar({ unoVsUno: { ...uno, minutos } })}
              {...RANGOS.minutos}
              atajos={ATAJOS.minutosUnoVsUno}
              sufijoAtajo="′"
              unidad="minutos"
              pista={`Entre ${RANGOS.minutos.min} y ${RANGOS.minutos.max} minutos.`}
            />
          </div>
        </>
      )}

      {borrador.tipo === "battle_royale" && (
        <>
          <Seccion titulo="Formato">
            <OptionGroup
              label="Formato"
              value={br.formato}
              onValueChange={(formato) => actualizar({ battleRoyale: { ...br, formato } })}
              options={opciones(FORMATOS_BATTLE_ROYALE)}
            />
          </Seccion>
          <div className="mt-4 flex flex-col gap-4">
            <QuantityField
              titulo="Jugadores"
              ayuda="Máximo 100 jugadores por partida"
              value={br.jugadores}
              onChange={(jugadores) => actualizar({ battleRoyale: { ...br, jugadores } })}
              {...RANGOS.jugadoresBr}
              limite={limite}
              atajos={ATAJOS.jugadoresBr}
              unidad="jugadores"
              pista={`Entre ${RANGOS.jugadoresBr.min} y ${RANGOS.jugadoresBr.max} jugadores por partida.`}
            />
            <QuantityField
              titulo="Número de partidas"
              ayuda="Los puntos se suman entre partidas"
              value={br.partidas}
              onChange={(partidas) => actualizar({ battleRoyale: { ...br, partidas } })}
              {...RANGOS.partidasBr}
              atajos={ATAJOS.partidasBr}
              unidad="partidas"
              pista={`Entre ${RANGOS.partidasBr.min} y ${RANGOS.partidasBr.max} partidas.`}
            />
            <QuantityField
              titulo="Tiempo por partida"
              ayuda="Minutos · la zona cierra al final"
              value={br.minutos}
              onChange={(minutos) => actualizar({ battleRoyale: { ...br, minutos } })}
              {...RANGOS.minutos}
              atajos={ATAJOS.minutosBr}
              sufijoAtajo="′"
              unidad="minutos"
              pista={`Entre ${RANGOS.minutos.min} y ${RANGOS.minutos.max} minutos.`}
            />
            <SwitchRow
              titulo="Puntos por eliminación"
              descripcion="Posición + 1 pt por cada kill"
              checked={br.puntosPorEliminacion}
              onCheckedChange={(puntosPorEliminacion) =>
                actualizar({ battleRoyale: { ...br, puntosPorEliminacion } })
              }
            />
          </div>
        </>
      )}

      <p className="mt-5 text-caption text-ink-3">
        Usa una opción rápida o toca «Otro» para escribir la cantidad que quieras. También puedes
        ajustar con − / +.
      </p>

      <div className="mt-4 grid grid-cols-[1fr_1.4fr] gap-3">
        <Link href="/org/crear" className={buttonVariants({ variant: "secondary" })}>
          Atrás
        </Link>
        <Button onClick={() => router.push("/org/crear/fecha")}>Continuar</Button>
      </div>
    </>
  );
}
