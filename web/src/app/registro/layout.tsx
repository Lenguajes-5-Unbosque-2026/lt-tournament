import { RegistroProvider } from "@/components/registro-provider";

// Los dos pasos del registro (J03 y J02) comparten lo que el usuario va escribiendo.
export default function RegistroLayout({ children }: { children: React.ReactNode }) {
  return <RegistroProvider>{children}</RegistroProvider>;
}
