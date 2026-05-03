import { useDeleteRol } from "../hooks/useDeleteRol";

const RolTable = ({ roles, onEdit }) => {
  const { mutate: deleteRol } = useDeleteRol();

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar este rol?")) {
      deleteRol(id);
    }
  };

  return (
    <table style={{ width: "100%", background: "var(--color-surface)", color: "var(--color-text)", borderRadius: "10px", overflow: "hidden" }}>
      <thead style={{ background: "var(--color-table-header)" }}>
        <tr>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {roles.map((r) => (
          <tr key={r.idRol}>
            <td>{r.nombre}</td>

            <td>
              <button
                onClick={() => onEdit(r)}
                style={{ background: "var(--color-secondary)" }}
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(r.idRol)}
                style={{ background: "var(--color-danger)", marginLeft: "5px", color: "#fff" }}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RolTable;