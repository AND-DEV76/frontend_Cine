import PeliculaList from "../components/PeliculaList";

const PeliculasPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", color: "white" }}>
         Cartelera
      </h1>

      <PeliculaList />
    </div>
  );
};

export default PeliculasPage;