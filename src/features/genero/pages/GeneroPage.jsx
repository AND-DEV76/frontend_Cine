import { useState } from "react";
import "../../../styles/genero.css";

import GeneroTable from "../components/GeneroTable";
import GeneroForm from "../components/GeneroForm";

import {
  useGeneros,
  useCreateGenero,
  useUpdateGenero,
  useDeleteGenero,
} from "../hooks/useGenero";

const GeneroPage = () => {
  const { data: generos = [] } = useGeneros();

  const create = useCreateGenero();
  const update = useUpdateGenero();
  const remove = useDeleteGenero();

  const [selected, setSelected] = useState(null);

  // ✅ CREATE / UPDATE
  const handleSubmit = (form) => {
    if (selected) {
      update.mutate({
        id: selected.id_genero,
        data: form,
      });
    } else {
      create.mutate(form);
    }
    setSelected(null);
  };

  // 🔥 DELETE CON CONFIRMACIÓN + ERROR
  const handleDelete = (id) => {

    // 🟡 Confirmación
    if (!window.confirm("¿Seguro que quieres eliminar este género?")) {
      return;
    }

    remove.mutate(id, {
      // 🔴 ERROR DEL BACKEND
      onError: (error) => {
        alert(
          error.response?.data ||
          "No se puede eliminar el género"
        );
      }
    });
  };

  return (
    <div className="container">
      <div className="grid-2">

        {/* TABLA */}
        <GeneroTable
          generos={generos}
          onEdit={setSelected}
          onDelete={handleDelete} // ✅ IMPORTANTE
        />

        {/* FORMULARIO */}
        <GeneroForm
          onSubmit={handleSubmit}
          selected={selected}
          clear={() => setSelected(null)}
        />

      </div>
    </div>
  );
};

export default GeneroPage;