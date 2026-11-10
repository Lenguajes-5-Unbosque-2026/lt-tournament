import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ChatTorneo } from "@/components/chat-torneo";
import { getChat } from "@/lib/mock-competir";
import { jugadorActualId } from "@/lib/sesion";

/** Chat del torneo (J15): un solo chat público por torneo. */
async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chat = getChat(id, await jugadorActualId());
  if (!chat) notFound();
  return <ChatTorneo chat={chat} />;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      <ChatPage params={params} />
    </Suspense>
  );
}
