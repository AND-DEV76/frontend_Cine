import { usePeliculas } from "../hooks/usePeliculas";
import PeliculaCard from "./PeliculaCard";

const PeliculaList = ({ goTo }) => {
  const { data, isLoading, isError } = usePeliculas();

  if (isLoading) return <p style={{ color: "white" }}>Cargando películas...</p>;
  if (isError) return <p style={{ color: "red" }}>Error al cargar películas</p>;

  return (
    <div style={styles.container}>
      {data.map((peli) => (
        <PeliculaCard
          key={peli.idPelicula}
          pelicula={peli}
          onEdit={() => goTo(`/peliculas/edit/${peli.idPelicula}`)}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    justifyContent: "center",
  },
};

export default PeliculaList;