import { useState } from "react";

const SalaForm = ({ onCreate }) => {
  const [numeroSala, setNumeroSala] = useState("");
  const [capacidad] = useState(16); // fijo

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!numeroSala) {
      alert("Número de sala requerido");
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