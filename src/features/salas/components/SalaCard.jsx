import { useEffect, useState } from "react";
import { getAsientosBySala } from "../api/salaApi";
import SalaMatrix from "./SalaMatrix";

const SalaCard = ({ sala, onDelete }) => {
  const [asientos, setAsientos] = useState([]);

  useEffect(() => {
    getAsientosBySala(sala.idSala)
      .then((data) => {
        if (Array.isArray(data)) {
          setAsientos(data);
        } else {
          setAsientos([]);
        }
      })
      .catch(() => setAsientos([]));
  }, [sala.idSala]);

  // 🔥 AQUÍ VA TU FUNCIÓN
  const handleDelete = () => {
    const confirmar = window.confirm(
      `¿Estás seguro de eliminar la sala ${sala.numeroSala}?`
    );

    if (confirmar) {
      onDelete(sala.idSala);
    }
  };

  return (
    <div className="sala-card">
      <h3>Sala {sala.numeroSala}</h3>
      <p>Capacidad: {sala.capacidad}</p>

      <SalaMatrix asientos={asientos} />

      {/* 🔥 CAMBIO AQUÍ */}
      <button onClick={handleDelete}>
        Eliminar
      </button>
    </div>
  );
};

export default SalaCard;