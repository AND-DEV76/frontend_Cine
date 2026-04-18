const PeliculaCard = ({ pelicula }) => {
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
        <p><strong>Clasificación:</strong> {pelicula.clasificacion}</p>
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