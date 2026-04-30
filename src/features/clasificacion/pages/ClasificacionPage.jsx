import { useState } from "react";
import "../../../styles/clasificacion.css";

import ClasificacionTable from "../components/ClasificacionTable";
import ClasificacionForm from "../components/ClasificacionForm";

import {
  useClasificaciones,
  useCreateClasificacion,
  useUpdateClasificacion,
  useDeleteClasificacion,
} from "../hooks/useClasificacion";

const ClasificacionPage = () => {
  const { data = [] } = useClasificaciones();

  const create = useCreateClasificacion();
  const update = useUpdateClasificacion();
  const remove = useDeleteClasificacion();

  const [selected, setSelected] = useState(null);

  // ✅ GUARDAR / ACTUALIZAR
  const handleSubmit = (form) => {
    if (selected) {
      update.mutate({
        id: selected.id_clasificacion,
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
    if (!window.confirm("¿Seguro que quieres eliminar esta clasificación?")) {
      return;
    }

    remove.mutate(id, {
      // 🔴 ERROR DEL BACKEND
      onError: (error) => {
        alert(
          error.response?.data ||
          "No se puede eliminar la clasificación"
        );
      }
    });
  };

  return (
    <div className="container">
      <div className="grid-2">

        {/* TABLA */}
        <ClasificacionTable
          data={data}
          onEdit={setSelected}
          onDelete={handleDelete} // ✅ IMPORTANTE
        />

        {/* FORMULARIO */}
        <ClasificacionForm
          onSubmit={handleSubmit}
          selected={selected}
          clear={() => setSelected(null)}
        />

      </div>
    </div>
  );
};

export default ClasificacionPage;