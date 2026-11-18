import { Suspense } from "react";
import { PageHead } from "@/components/page-head";
import { ChatOrganizadorCargado } from "@/components/chat-organizador-cargado";
import { getTorneosDelOrganizador } from "@/lib/mock";
import { getTorneosDelOrganizadorSupabase } from "@/lib/supabase-torneos";
import { organizadorActualId } from "@/lib/sesion";

/**
 * Chat del organizador (pestaña «Chat» de la barra): el chat de su torneo
 * activo, el próximo que está abierto, en check-in o en curso.
 */
async function Chat() {
  const organizadorId = await organizadorActualId();
  let torneos;
  try {
    torneos = await getTorneosDelOrganizadorSupabase(organizadorId);
  } catch {
    torneos = getTorneosDelOrganizador(organizadorId);
  }
  const activo = torneos.find(
    (t) => t.estado === "abierto" || t.estado === "checkin" || t.estado === "en_curso",
  );
  if (!activo) {
    return (
      <>
        <PageHead title="Chat" />
        <p className="mt-10 text-center text-small text-ink-3">
          Cuando publiques un torneo, su chat aparece aquí.
        </p>
      </>
    );
  }
  return <ChatOrganizadorCargado torneoId={activo.id} />;
}

export default function OrgChatPage() {
  return (
    <Suspense>
      <Chat />
    </Suspense>
  );
}
