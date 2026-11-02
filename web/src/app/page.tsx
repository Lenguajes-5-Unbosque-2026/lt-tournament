import { redirect } from "next/navigation";

// La pantalla de entrada del jugador es Inicio (J06). El acceso y registro
// (J00 a J05) se conectan aquí cuando se construya ese flujo.
export default function RootPage() {
  redirect("/inicio");
}
