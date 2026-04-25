import { useDeletePelicula } from "../hooks/useDelete";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";

const PeliculaCard = ({ pelicula, onEdit }) => {
  const { mutate: eliminar } = useDeletePelicula();
  const user = useCurrentUser();

  const isAdmin =
    user?.rol?.nombre === "ADMIN" || user?.rol?.nombre === "EMPLEADO";

  return (
    <div style={styles.card}>
      <img
        src={`http://localhost:8080/uploads/${pelicula.poster}`}
        alt={pelicula.nombre}
        style={styles.image}
      />

      <div style={styles.content}>
        <h3>{pelicula.nombre}</h3>
        <p>{pelicula.descripcion}</p>

        <p><strong>Duración:</strong> {pelicula.duracion} min</p>
        <p><strong>Clasificación:</strong> {pelicula.clasificacion?.nombre}</p>

        {/* 🔥 SOLO SI ES ADMIN */}
        {isAdmin && (
          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button onClick={() => onEdit(pelicula)}>
              Editar
            </button>

            <button
  onClick={() => {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar "${pelicula.nombre}"?`
    );

    if (confirmar) {
      eliminar(pelicula.idPelicula);
    }
  }}
>
  Eliminar
</button>
          </div>
        )}
      </div>
    </div>
  );
};


const styles = {
  card: {
    width: "250px",
     background: "var(--color-bg)",
    color: "var(--color-white)",
    border: "1px solid var(--color-secondary)",
    borderRadius: "10px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
  },
  image: {
    width: "100%",
    height: "350px",
    objectFit: "cover",
  },
  content: {
    padding: "10px",
  },
};

export default PeliculaCard;