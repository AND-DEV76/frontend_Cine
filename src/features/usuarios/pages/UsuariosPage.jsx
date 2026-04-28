import { useState } from "react";
import { useUsuarios } from "../hooks/useUsuarios";
import UsuarioTable from "../components/UsuarioTable";
import UsuarioForm from "../components/UsuarioForm";

import { useRoles } from "../../roles/hooks/useRoles";
import RolTable from "../../roles/components/RolTable";
import RolForm from "../../roles/components/RolForm";

import "../../../styles/user.css";

const UsuariosPage = () => {
  const { data, isLoading } = useUsuarios();
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: roles } = useRoles();
  const [selectedRol, setSelectedRol] = useState(null);

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div className="usuarios-container">

      {/* USUARIOS */}
      <div className="usuarios-section">
        <div className="usuarios-table">
          <h2>Usuarios</h2>
          <UsuarioTable usuarios={data} onEdit={setSelectedUser} />
        </div>

        <div className="usuarios-form">
          <UsuarioForm
            selectedUser={selectedUser}
            clearSelection={() => setSelectedUser(null)}
          />
        </div>
      </div>

      {/* ROLES */}
      <div className="usuarios-section">
        <div className="usuarios-table">
          <h2>Roles</h2>
          <RolTable roles={roles || []} onEdit={setSelectedRol} />
        </div>

        <div className="usuarios-form">
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