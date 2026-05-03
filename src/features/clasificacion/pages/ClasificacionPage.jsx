import { useState } from "react";
import Swal from "sweetalert2";
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
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Seguro que quieres eliminar esta clasificación?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        remove.mutate(id, {
          // 🔴 ERROR DEL BACKEND
          onError: (error) => {
            Swal.fire("Error", error.response?.data || "No se puede eliminar la clasificación", "error");
          }
        });
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