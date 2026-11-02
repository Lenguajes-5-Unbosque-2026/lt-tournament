import { StepProgress } from "@/components/step-progress";
import { Topbar } from "@/components/topbar";

const SUBTITULOS = ["Información", "Formato", "Fecha y reglas", "Revisar y publicar"];

/**
 * Encabezado del asistente «Crear torneo»: topbar con «Paso N de 4 · …» y la
 * barra de 4 pasos. El paso 1 cierra con X; los demás vuelven al paso anterior.
 */
export function WizardHeader({
  paso,
  fallbackHref,
  onLeadingClick,
}: {
  paso: 1 | 2 | 3 | 4;
  fallbackHref: string;
  onLeadingClick?: () => void;
}) {
  return (
    <>
      <Topbar
        title="Crear torneo"
        subtitle={`Paso ${paso} de 4 · ${SUBTITULOS[paso - 1]}`}
        leading={paso === 1 ? "close" : "back"}
        fallbackHref={fallbackHref}
        onLeadingClick={onLeadingClick}
      />
      <div className="mt-3">
        <StepProgress current={paso} />
      </div>
    </>
  );
}
