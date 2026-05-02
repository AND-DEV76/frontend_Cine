import { useEffect, useState } from "react";
import { useFunciones } from "../hooks/useFunciones";

import FuncionForm from "../components/FuncionForm";
import FuncionCard from "../components/FuncionCard";
import "../../../styles/funciones.css";

const FuncionesPage = () => {

  const { funciones, create, remove, error } = useFunciones();

  const [peliculas, setPeliculas] = useState([]);
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/peliculas")
      .then(r => r.json())
      .then(setPeliculas);

    fetch("http://localhost:8080/api/salas")
      .then(r => r.json())
      .then(setSalas);
  }, []);

  return (
    <div className="funciones-container">

      <h1>🎬 Funciones</h1>

      {/* 🔥 ERROR DEL BACKEND */}
      {error && (
        <div style={{
          background: "#ff4d4d",
          color: "white",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px"
        }}>
          {error}
        </div>
      )}

      <FuncionForm
        onSubmit={create}
        peliculas={peliculas}
        salas={salas}
      />

      <div className="grid">
        {funciones.map(f => (
          <FuncionCard
            key={f.idFuncion}
            funcion={f}
            onDelete={remove}
          />
        ))}
      </div>

    </div>
  );
};

export default FuncionesPage;