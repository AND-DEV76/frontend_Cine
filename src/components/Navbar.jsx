import React, { useState, useEffect, useRef } from "react";
import { useCurrentUser } from "../features/auth/hooks/useCurrentUser";
import { useLogout } from "../features/auth/hooks/useLogout";
import { FiSun, FiMoon, FiUser, FiBookOpen, FiSettings, FiLogOut, FiChevronDown } from "react-icons/fi";
import mascotImg from "../assets/logo.png";
import "../styles/navbar.css";

const Navbar = ({ theme, toggleTheme }) => {
  const user = useCurrentUser();
  const { logout } = useLogout();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goTo = (path) => {
    setDropdownOpen(false);
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

      <div className="nav-user" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {theme === "dark" ? <FiSun /> : <FiMoon />}
        </button>

        {!user ? (
          <button className="btn-royale btn-primary" onClick={() => goTo("/login")}>
            Iniciar Sesión
          </button>
        ) : (
          <div className="user-dropdown-container" ref={dropdownRef}>
            <div 
              className="user-dropdown-trigger" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="user-avatar">
                <FiUser />
              </div>
              <span className="user-name-short">{user.username}</span>
              <FiChevronDown className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} />
            </div>

            {dropdownOpen && (
              <div className="user-dropdown-menu">
                <div className="dropdown-header">
                  <span className="dropdown-greeting">Hola,</span>
                  <span className="dropdown-username">{user.username}</span>
                  <span className="dropdown-role">{user.rol.nombre}</span>
                </div>
                
                <div className="dropdown-divider"></div>

                <button className="dropdown-item" onClick={() => goTo("/mis-boletos")}>
                  <FiBookOpen className="dropdown-icon" />
                  Mis Boletos
                </button>

                {(user.rol.nombre === "ADMIN" || user.rol.nombre === "EMPLEADO") && (
                  <button className="dropdown-item" onClick={() => goTo("/admin")}>
                    <FiSettings className="dropdown-icon" />
                    Administración
                  </button>
                )}

                <div className="dropdown-divider"></div>

                <button className="dropdown-item dropdown-item--danger" onClick={() => { setDropdownOpen(false); logout(); }}>
                  <FiLogOut className="dropdown-icon" />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;