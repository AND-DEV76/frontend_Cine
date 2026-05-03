import { useEffect, useState } from "react";
import { getAsientosBySala } from "../api/salaApi";
import SalaMatrix from "./SalaMatrix";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro de eliminar la sala ${sala.numeroSala}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(sala.idSala);
      }
    });
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