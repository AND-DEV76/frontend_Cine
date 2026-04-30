import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "../components/Navbar";
import PeliculasPage from "../features/peliculas/pages/PeliculasPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

import AdminPanelPage from "../features/admin/pages/AdminPanelPage";
import UsuariosPage from "../features/usuarios/pages/UsuariosPage";
import PeliculaForm from "../features/peliculas/pages/PeliculaForm";

import ClasificacionPage from "../features/clasificacion/pages/ClasificacionPage";
import PeliculaEditForm from "../features/peliculas/pages/PeliculaEditForm";



import GeneroPage from "../features/genero/pages/GeneroPage";

const queryClient = new QueryClient();

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  // USUARIO DESDE LOCALSTORAGE
  const user = JSON.parse(localStorage.getItem("user"));

  // VALIDACIÓN DE ROL
  const isAdmin =
    user &&
    (user.rol.nombre === "ADMIN" ||
      user.rol.nombre === "EMPLEADO");

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ background: "#121212", minHeight: "100vh" }}>
        
        {/* NAVBAR */}
        <Navbar />

        {/* RUTAS PÚBLICAS */}
        {path === "/" && <PeliculasPage />}
        {path === "/login" && <LoginPage />}
        {path === "/register" && <RegisterPage />}
        {path === "/peliculas/new" && <PeliculaForm />}
     
          

          {path.startsWith("/peliculas/edit/") && <PeliculaEditForm />}


        {/* RUTAS PROTEGIDAS */}
        {path === "/admin" &&
          (isAdmin ? <AdminPanelPage /> : <LoginPage />)}
          {path === "/admin/generos" &&
  (isAdmin ? <GeneroPage /> : <LoginPage />)}

        {path === "/admin/usuarios" &&
          (isAdmin ? <UsuariosPage /> : <LoginPage />)}

          {path === "/admin/clasificaciones" &&
  (isAdmin ? <ClasificacionPage /> : <LoginPage />)}

      </div>
    </QueryClientProvider>
  );
}

export default App;