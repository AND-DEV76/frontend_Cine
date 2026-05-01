import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../features/auth/hooks/useCurrentUser";
import { useLogout } from "../features/auth/hooks/useLogout";
import mascotImg from "../assets/minipekka.png";
import "../styles/navbar.css";

const Navbar = () => {
  const user = useCurrentUser();
  const { logout } = useLogout();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTo = (path) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <nav className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-brand" onClick={() => goTo("/")}>
        <img src={mascotImg} alt="Cinema Royale" className="nav-brand-icon" />
        <span className="brand-text">
          Cinema<span className="brand-royale">Royale</span>
        </span>
      </div>

      <div className="nav-links">
        <span className="nav-link" onClick={() => goTo("/")}>Inicio</span>
        <span className="nav-link" onClick={() => goTo("/cartelera")}>Cartelera</span>
      </div>

      <div className="nav-user">
        {!user ? (
          <button className="btn-royale btn-primary" onClick={() => goTo("/login")}>
            Iniciar Sesión
          </button>
        ) : (
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <span className="user-greeting">
              Hola, <span className="user-name">{user.username}</span>
            </span>

            {(user.rol.nombre === "ADMIN" || user.rol.nombre === "EMPLEADO") && (
              <button className="btn-royale btn-ghost" onClick={() => goTo("/admin")}>
                Administración
              </button>
            )}

            <button className="btn-royale btn-ghost" onClick={logout}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;