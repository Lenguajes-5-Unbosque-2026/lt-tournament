import { RegistroForm } from "@/components/registro-form";
import { getIdsOcupados } from "@/lib/mock";

export default function RegistroPage() {
  return <RegistroForm idsOcupados={getIdsOcupados()} />;
}
