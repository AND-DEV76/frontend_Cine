import React from "react";
import { useCurrentUser } from "../features/auth/hooks/useCurrentUser";
import { useLogout } from "../features/auth/hooks/useLogout";

const Navbar = () => {
  const user = useCurrentUser();
  const { logout } = useLogout();

  const goTo = (path) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <nav style={{ ...styles.nav, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
      
      <div style={styles.logo}> CinemaRoyale</div>

      {!user ? (
        <button style={styles.button} onClick={() => goTo("/login")}>
          Iniciar Sesión
        </button>
      ) : (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span>👤 {user.username}</span>

          {(user.rol.nombre === "ADMIN" ||
            user.rol.nombre === "EMPLEADO") && (
            <button style={styles.button} onClick={() => goTo("/admin")}>
              Panel Admin
            </button>
          )}

          <button style={styles.button} onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    background: "var(--color-bg)",
    color: "var(--color-white)",
    borderBottom: "2px solid var(--color-secondary)",
  },
  logo: {
    color: "var(--color-primary)",
    fontSize: "22px",
    fontWeight: "bold",
  },


 
  button: {
    background: "var(--color-primary)",
    border: "none",
    padding: "10px 18px",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  }

};

export default Navbar;