import { useState } from "react";
import { useUsuarios } from "../hooks/useUsuarios";
import UsuarioTable from "../components/UsuarioTable";
import UsuarioForm from "../components/UsuarioForm";

//union con roels


import { useRoles } from "../../roles/hooks/useRoles";
import RolTable from "../../roles/components/RolTable";
import RolForm from "../../roles/components/RolForm";

const UsuariosPage = () => {
  const { data, isLoading } = useUsuarios();
  const [selectedUser, setSelectedUser] = useState(null);
  
  //roles como lso de comer
  const { data: roles } = useRoles();
const [selectedRol, setSelectedRol] = useState(null);


  if (isLoading) return <p>Cargando...</p>;

  return (
    <div style={{
  display: "flex",
  flexDirection: "column", // 🔥 CLAVE
  gap: "40px",
  padding: "20px",
  background: "var(--color-white)"
}}>

  {/* USUARIOS */}
  <div style={{ display: "flex", gap: "20px" }}>
    <div style={{ flex: 2 }}>
      <h2>Usuarios</h2>
      <UsuarioTable usuarios={data} onEdit={setSelectedUser} />
    </div>

    <div style={{ flex: 1 }}>
      <UsuarioForm
        selectedUser={selectedUser}
        clearSelection={() => setSelectedUser(null)}
      />
    </div>
  </div>

  {/* ROLES */}
  <div style={{ display: "flex", gap: "20px" }}>
    <div style={{ flex: 2 }}>
      <h2>Roles</h2>
      <RolTable roles={roles || []} onEdit={setSelectedRol} />
    </div>

    <div style={{ flex: 1 }}>
      <RolForm
        selectedRol={selectedRol}
        clearSelection={() => setSelectedRol(null)}
      />
    </div>
  </div>

</div>
  );
};

export default UsuariosPage;