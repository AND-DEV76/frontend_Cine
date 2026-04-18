import { useState, useEffect } from "react";
import { useCreateUsuario } from "../hooks/useCreateUsuario";
import { useUpdateUsuario } from "../hooks/useUpdateUsuario";
import axios from "axios";

const UsuarioForm = ({ selectedUser, clearSelection }) => {
  const { mutate: createUser } = useCreateUsuario();
  const { mutate: updateUser } = useUpdateUsuario();

  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "",
    nombre: "",
    email: "",
    password: "",
    idRol: ""
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/roles")
      .then(res => setRoles(res.data));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setForm({
        username: selectedUser.username,
        nombre: selectedUser.nombre,
        email: selectedUser.email,
        password: "",
        idRol: selectedUser.rol.idRol
      });
    }
  }, [selectedUser]);

  const validar = () => {
    if (!form.username || !form.nombre || !form.email) {
      setError("Todos los campos son obligatorios");
      return false;
    }

    if (!form.email.includes("@")) {
      setError("Email inválido");
      return false;
    }

    if (!selectedUser && form.password.length < 4) {
      setError("Password mínimo 4 caracteres");
      return false;
    }

    if (!form.idRol) {
      setError("Seleccione un rol");
      return false;
    }

    setError("");
    return true;
  };

const handleSubmit = (e) => {
  e.preventDefault();

  if (!validar()) return;

  if (selectedUser) {
    updateUser(
      {
        id: selectedUser.idUsuario,
        data: form
      },
      {
        onSuccess: () => {
          limpiar();
        }
      }
    );
  } else {
    createUser(form, {
      onSuccess: () => {
        limpiar();
      }
    });
  }
};

  const limpiar = () => {
    setForm({
      username: "",
      nombre: "",
      email: "",
      password: "",
      idRol: ""
    });
    clearSelection();
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      
      <h3>{selectedUser ? "Editar Usuario" : "Nuevo Usuario"}</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input placeholder="Username"
        value={form.username}
        onChange={e => setForm({...form, username: e.target.value})}
      />

      <input placeholder="Nombre"
        value={form.nombre}
        onChange={e => setForm({...form, nombre: e.target.value})}
      />

      <input placeholder="Email"
        value={form.email}
        onChange={e => setForm({...form, email: e.target.value})}
      />

      <input type="password" placeholder="Password"
        onChange={e => setForm({...form, password: e.target.value})}
      />

      <select value={form.idRol}
        onChange={e => setForm({...form, idRol: e.target.value})}>
        <option value="">Seleccione Rol</option>
        {roles.map(r => (
          <option key={r.idRol} value={r.idRol}>
            {r.nombre}
          </option>
        ))}
      </select>

      <button type="submit" style={{ background: "var(--color-primary)", color: "#fff" }}>
        Guardar
      </button>

      <button type="button" onClick={limpiar}>
        Limpiar
      </button>

    </form>
  );
};

export default UsuarioForm;