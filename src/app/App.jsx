import { useEffect, useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "../components/Navbar";
import PeliculasPage from "../features/peliculas/pages/PeliculasPage";
import LoginPage from "../features/auth/pages/LoginPage";

import AdminPanelPage from "../features/admin/pages/AdminPanelPage";
import UsuariosPage from "../features/usuarios/pages/UsuariosPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import PeliculaForm from "../features/peliculas/pages/PeliculaForm";

import Footer from "../components/Footer";
import LandingPage from "../features/landing/pages/LandingPage";

import ClasificacionPage from "../features/clasificacion/pages/ClasificacionPage";
import PeliculaEditForm from "../features/peliculas/pages/PeliculaEditForm";
import GeneroPage from "../features/genero/pages/GeneroPage";
import SalasPage from "../features/salas/pages/SalasPage";
import FuncionesPage from "../features/funciones/pages/FuncionesPage";
import PeliculaDetallePage from "../features/funciones/pages/PeliculaDetallePage";
import CheckoutPage from "../features/checkout/pages/CheckoutPage";
import MisBoletosPage from "../features/checkout/pages/MisBoletosPage";
import NotFoundPage from "../pages/NotFoundPage";

const queryClient = new QueryClient();

// Known routes for 404 detection
const KNOWN_ROUTES = [
  "/",
  "/cartelera",
  "/login",
  "/register",
  "/checkout",
  "/mis-boletos",
  "/peliculas/new",
  "/admin",
  "/admin/usuarios",
  "/admin/generos",
  "/admin/clasificaciones",
  "/admin/salas",
  "/admin/funciones",
];

const isDynamicRoute = (path) =>
  path.startsWith("/pelicula/") || path.startsWith("/peliculas/edit/");

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

  const [theme, setTheme] = useState(localStorage.getItem("app-theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback((e) => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    // Create radial flash overlay from click position
    const overlay = document.createElement("div");
    overlay.className = `theme-transition-overlay theme-transition-overlay--to-${nextTheme}`;

    // Center the radial gradient on the click position
    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? window.innerHeight / 2;
    overlay.style.setProperty("--tx", `${x}px`);
    overlay.style.setProperty("--ty", `${y}px`);

    document.body.appendChild(overlay);
    overlay.addEventListener("animationend", () => overlay.remove());

    setTheme(nextTheme);
  }, [theme]);

  // USUARIO DESDE LOCALSTORAGE
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    localStorage.removeItem("user");
  }

  // VALIDACIÓN DE ROL
  const isAdmin =
    user?.rol?.nombre === "ADMIN" ||
    user?.rol?.nombre === "EMPLEADO";

  // Check if current path matches any known route
  const isKnown = KNOWN_ROUTES.includes(path) || isDynamicRoute(path);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ background: "var(--color-bg)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        
        {/* NAVBAR */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {/* CONTENIDO DINÁMICO (Con padding-top para que el navbar fijo no lo tape, excepto en el landing) */}
        <div style={{ flex: 1, paddingTop: path === '/' ? '0' : '80px' }}>
          {path === "/" && <LandingPage />}
          {path === "/cartelera" && <PeliculasPage />}
          {path === "/login" && <LoginPage />}
          {path === "/register" && <RegisterPage />}
          
          {path.startsWith("/pelicula/") && !path.includes("/edit/") && <PeliculaDetallePage />}
          {path === "/checkout" && <CheckoutPage />}
          {path === "/mis-boletos" && <MisBoletosPage />}
          {path === "/peliculas/new" && <PeliculaForm />}
          {path.startsWith("/peliculas/edit/") && <PeliculaEditForm />}

          {path === "/admin/salas" && (isAdmin ? <SalasPage /> : <LoginPage />)}

          {path === "/admin" && (isAdmin ? <AdminPanelPage /> : <LoginPage />)}
          {path === "/admin/usuarios" && (isAdmin ? <UsuariosPage /> : <LoginPage />)}
          {path === "/admin/generos" && (isAdmin ? <GeneroPage /> : <LoginPage />)}
          {path === "/admin/clasificaciones" && (isAdmin ? <ClasificacionPage /> : <LoginPage />)}

          {path === "/admin/funciones" && (isAdmin ? <FuncionesPage /> : <LoginPage />)}

          {/* 404 — Not Found */}
          {!isKnown && <NotFoundPage />}
        </div>

        {/* FOOTER */}
        <Footer />
        
      </div>
    </QueryClientProvider>
  );
}

export default App;