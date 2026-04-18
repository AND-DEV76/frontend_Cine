import { useState, useEffect } from "react";
import { useCreateRol } from "../hooks/useCreateRol";
import { useUpdateRol } from "../hooks/useUpdateRol";

const RolForm = ({ selectedRol, clearSelection }) => {
  const { mutate: createRol } = useCreateRol();
  const { mutate: updateRol } = useUpdateRol();

  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedRol) setNombre(selectedRol.nombre);
  }, [selectedRol]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre) {
      setError("Nombre requerido");
      return;
    }

    if (selectedRol) {
      updateRol({ id: selectedRol.idRol, data: { nombre } });
      clearSelection();
    } else {
      createRol({ nombre });
    }

    limpiar();
  };

  const limpiar = () => {
    setNombre("");
    setError("");
    clearSelection();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      
      <h3>{selectedRol ? "Editar Rol" : "Nuevo Rol"}</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Nombre del rol"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <button style={{ background: "var(--color-primary)", color: "#fff" }}>
        Guardar
      </button>

      <button type="button" onClick={limpiar}>
        Limpiar
      </button>
    </form>
  );
};

export default RolForm;