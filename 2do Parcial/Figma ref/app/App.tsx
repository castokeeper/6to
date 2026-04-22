import { RouterProvider } from "react-router";
import { mobileRouter } from "./mobile-routes";

// Aplicación móvil Pawsome - Red Social para Mascotas
// Cumple con todos los requerimientos técnicos de Figma
export default function App() {
  return <RouterProvider router={mobileRouter} />;
}
