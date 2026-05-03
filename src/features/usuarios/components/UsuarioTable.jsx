import { useDeleteUsuario } from "../hooks/useDeleteUsuario";

const UsuarioTable = ({ usuarios, onEdit }) => {
  const { mutate: deleteUser } = useDeleteUsuario();

  const handleDelete = (id) => {
  if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
    deleteUser(id);
  }
};
  return (
    <table style={{ width: "100%", background: "var(--color-surface)", color: "var(--color-text)", borderRadius: "10px", overflow: "hidden" }}>
      <thead style={{ background: "var(--color-table-header)" }}>
        <tr>
          <th>Username</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {usuarios.map((u) => (
          <tr key={u.idUsuario}>
            <td>{u.username}</td>
            <td>{u.nombre}</td>
            <td>{u.email}</td>
            <td>{u.rol.nombre}</td>

            <td>
              <button
                style={{ background: "var(--color-secondary)" }}
                onClick={() => onEdit(u)}
              >
                Editar
              </button>
              
              <button
  style={{ background: "var(--color-danger)", marginLeft: "5px", color: "#fff" }}
  onClick={() => handleDelete(u.idUsuario)}
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

export default UsuarioTable;