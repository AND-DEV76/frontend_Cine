import PeliculaList from "../components/PeliculaList";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import "../../../styles/pelicula.css";

const PeliculasPage = () => {
  const user = useCurrentUser();

  const goTo = (path) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };

  const isAdmin =
    user?.rol?.nombre === "ADMIN" || user?.rol?.nombre === "EMPLEADO";

  return (
    <div className="pelicula-page">
      <h1 className="pelicula-title">Cartelera</h1>

      {isAdmin && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button
            className="pelicula-add-btn"
            onClick={() => goTo("/peliculas/new")}
          >
            + Agregar Película
          </button>
        </div>
      )}

      <PeliculaList goTo={goTo} />
    </div>
  );
};

export default PeliculasPage;