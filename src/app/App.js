import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "../components/Navbar";
import PeliculasPage from "../features/peliculas/pages/PeliculasPage";
import LoginPage from "../features/auth/pages/LoginPage";

import AdminPanelPage from "../features/admin/pages/AdminPanelPage";
import UsuariosPage from "../features/usuarios/pages/UsuariosPage";
import RegisterPage from "../features/auth/pages/RegisterPage";


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

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ background: "#121212", minHeight: "100vh" }}>
        
        {/* NAVBAR */}
        <Navbar />

        {/* CONTENIDO DINÁMICO */}
        {path === "/" && <PeliculasPage />}
        {path === "/login" && <LoginPage />}
        {path === "/admin" && <h1>Panel Administrativo</h1>}
        {path === "/admin" && <AdminPanelPage />}
        {path === "/admin/usuarios" && <UsuariosPage />}
         {path === "/register" && <RegisterPage />}


      </div>
    </QueryClientProvider>
  );
}

export default App;