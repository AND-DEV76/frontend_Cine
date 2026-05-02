import { useEffect, useState } from "react";
import { getFunciones, createFuncion, deleteFuncion } from "../api/funcionApi";

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
    if (confirm("¿Eliminar función?")) {
      await deleteFuncion(id);
      load();
    }
  };

  return { funciones, create, remove, error };
};