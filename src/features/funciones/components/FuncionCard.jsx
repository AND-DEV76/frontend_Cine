const FuncionCard = ({ funcion, onDelete }) => {

  // 🔥 formatea hora bonita
  const formatHora = (hora) => {
    if (!hora) return "";

    // si viene LocalDateTime
    const date = new Date(hora);

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 🔥 OCULTAR FECHA (NO SE MUESTRA)
  // simplemente NO la usamos

  return (
    <div className="funcion-card">

      <img
        src={funcion.poster}
        alt={funcion.nombrePelicula}
        className="poster"
      />

      <div className="info">

        <h3>{funcion.nombrePelicula}</h3>

        <p> Sala: {funcion.numeroSala}</p>

        {/* ❌ FECHA OCULTA (NO SE MUESTRA) */}

        {/* ✔ SOLO HORA BONITA */}
        <p> {formatHora(funcion.hora)}</p>

        <button onClick={() => onDelete(funcion.idFuncion)}>
          Eliminar
        </button>

      </div>
    </div>
  );
};

export default FuncionCard;