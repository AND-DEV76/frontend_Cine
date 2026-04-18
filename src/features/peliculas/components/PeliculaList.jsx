import { usePeliculas } from "../hooks/usePeliculas";
import PeliculaCard from "./PeliculaCard";

const PeliculaList = () => {
  const { data, isLoading, isError } = usePeliculas();

  if (isLoading) return <p>Cargando películas...</p>;
  if (isError) return <p>Error al cargar películas</p>;

  return (
    <div style={styles.container}>
      {data.map((peli) => (
        <PeliculaCard key={peli.idPelicula} pelicula={peli} />
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