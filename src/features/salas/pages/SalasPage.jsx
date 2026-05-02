import "../../../styles/salas.css";
import { useSalas, useCreateSala, useDeleteSala } from "../hooks/useSalas";
import SalaCard from "../components/SalaCard";
import SalaForm from "../components/SalaForm";

const SalasPage = () => {
  const { data: salas = [] } = useSalas();
  const createSala = useCreateSala();
  const deleteSala = useDeleteSala();

  return (
    <div className="salas-container">

      <h2>Salas</h2>

      <SalaForm onCreate={createSala.mutate} />

      <div className="salas-grid">
        {salas.map((sala) => (
          <SalaCard
            key={sala.idSala}
            sala={sala}
            onDelete={deleteSala.mutate}
          />
        ))}
      </div>
    </div>
  );
};

export default SalasPage;