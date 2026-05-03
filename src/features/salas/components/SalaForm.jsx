import { useState } from "react";
import Swal from "sweetalert2";

const SalaForm = ({ onCreate }) => {
  const [numeroSala, setNumeroSala] = useState("");
  const [capacidad] = useState(16); // fijo

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!numeroSala) {
      Swal.fire("Error", "Número de sala requerido", "error");
      return;
    }

    onCreate({
      numeroSala: Number(numeroSala),
      capacidad,
    });

    setNumeroSala("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="number"
        placeholder="Número de sala"
        value={numeroSala}
        onChange={(e) => setNumeroSala(e.target.value)}
      />

      <button type="submit">Crear Sala</button>
    </form>
  );
};

export default SalaForm;