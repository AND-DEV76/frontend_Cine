import "../../../styles/user.css";

const GeneroTable = ({ generos, onEdit, onDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {generos.map((g) => (
          <tr key={g.id_genero}>
            <td>{g.id_genero}</td>
            <td>{g.nombre}</td>
            <td>
              <button onClick={() => onEdit(g)}>Editar</button>
              <button onClick={() => onDelete(g.id_genero)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GeneroTable;