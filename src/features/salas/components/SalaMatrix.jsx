import "../../../styles/salas.css";

const SalaMatrix = ({ asientos }) => {
  const filas = ["A", "B", "C", "D"];

  return (
    <div className="matrix">
      {filas.map((fila) => (
        <div key={fila} className="fila">
          {asientos
            .filter((a) => a.fila === fila)
            .sort((a, b) => a.numero - b.numero)
            .map((a) => (
              <div key={a.idAsiento} className="asiento">
                {fila}{a.numero}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default SalaMatrix;