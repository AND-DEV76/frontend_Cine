import { useEffect, useState } from "react";
import { getFunciones, createFuncion, deleteFuncion } from "../api/funcionApi";
import Swal from "sweetalert2";

export const useFunciones = () => {

  const [funciones, setFunciones] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    const data = await getFunciones();
    setFunciones(data);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (data, resetForm) => {
    try {
      setError("");
      await createFuncion(data);

      resetForm(); // 🔥 LIMPIAR FORM
      load();

    } catch (err) {
      setError(err.message); // 🔥 MOSTRAR ERROR BACKEND
    }
  };

  const remove = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Eliminar función?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    
    if (result.isConfirmed) {
      await deleteFuncion(id);
      load();
    }
  };

  return { funciones, create, remove, error };
};