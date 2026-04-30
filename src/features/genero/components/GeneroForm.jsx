import { useState, useEffect } from "react";
import "../../../styles/user.css";

const GeneroForm = ({ onSubmit, selected, clear }) => {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (selected) {
      setNombre(selected.nombre);
    }
  }, [selected]);

  const handleSubmit = () => {
    if (!nombre.trim()) return;
    onSubmit({ nombre });
    setNombre("");
  };

  return (
    <div className="form">
      <h3>{selected ? "Editar Género" : "Nuevo Género"}</h3>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <div className="form-buttons">
        <button onClick={handleSubmit}>
          {selected ? "Actualizar" : "Crear"}
        </button>

        <button
          onClick={() => {
            setNombre("");
            clear();
          }}
        >
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default GeneroForm;