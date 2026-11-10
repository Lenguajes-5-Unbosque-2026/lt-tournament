import { Suspense } from "react";
import { ChatOrganizadorCargado } from "@/components/chat-organizador-cargado";

/** Chat · Anuncio (O14) de un torneo. `?mencion=Nombre` arranca el mensaje con «@Nombre» (desde O09). */
async function Chat({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mencion?: string }>;
}) {
  const [{ id }, { mencion }] = await Promise.all([params, searchParams]);
  return <ChatOrganizadorCargado torneoId={id} mencion={mencion} />;
}

export default function ChatPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mencion?: string }>;
}) {
  return (
    <Suspense>
      <Chat params={params} searchParams={searchParams} />
    </Suspense>
  );
}
