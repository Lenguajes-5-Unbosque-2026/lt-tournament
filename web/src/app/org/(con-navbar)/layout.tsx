import { AppShell } from "@/components/app-shell";

export default function OrgLayout({ children }: { children: React.ReactNode }) {
  return <AppShell mode="org">{children}</AppShell>;
}
