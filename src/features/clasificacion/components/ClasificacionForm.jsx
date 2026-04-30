import { useState, useEffect } from "react";
import "../../../styles/user.css";

const ClasificacionForm = ({ onSubmit, selected, clear }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (selected) {
      setNombre(selected.nombre);
      setDescripcion(selected.descripcion);
    }
  }, [selected]);

  const handleSubmit = () => {
    if (!nombre.trim() || !descripcion.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }

    onSubmit({ nombre, descripcion });
    setNombre("");
    setDescripcion("");
  };

  return (
    <div className="form">
      <h3>{selected ? "Editar Clasificación" : "Nueva Clasificación"}</h3>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <div className="form-buttons">
        <button onClick={handleSubmit}>
          {selected ? "Actualizar" : "Crear"}
        </button>

        <button
          onClick={() => {
            setNombre("");
            setDescripcion("");
            clear();
          }}
        >
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default ClasificacionForm;