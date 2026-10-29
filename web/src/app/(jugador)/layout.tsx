import { AppShell } from "@/components/app-shell";

export default function JugadorLayout({ children }: { children: React.ReactNode }) {
  return <AppShell mode="player">{children}</AppShell>;
}
