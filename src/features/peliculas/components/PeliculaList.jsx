import { usePeliculas } from "../hooks/usePeliculas";
import PeliculaCard from "./PeliculaCard";

const PeliculaList = ({ goTo }) => {
  const { data, isLoading, isError } = usePeliculas();

  if (isLoading) return <p>Cargando películas...</p>;
  if (isError) return <p>Error al cargar películas</p>;

  return (
    <div className="pelicula-list">
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

export default PeliculaList;