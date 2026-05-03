import { useDeleteUsuario } from "../hooks/useDeleteUsuario";
import Swal from "sweetalert2";

const UsuarioTable = ({ usuarios, onEdit }) => {
  const { mutate: deleteUser } = useDeleteUsuario();

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Seguro que deseas eliminar este usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id);
      }
    });
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