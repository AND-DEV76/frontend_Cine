import "../../../styles/user.css";

const ClasificacionTable = ({ data, onEdit, onDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {data.map((c) => (
          <tr key={c.id_clasificacion}>
            <td>{c.id_clasificacion}</td>
            <td>{c.nombre}</td>
            <td>{c.descripcion}</td>
            <td>
              <button onClick={() => onEdit(c)}>Editar</button>
              <button onClick={() => onDelete(c.id_clasificacion)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClasificacionTable;