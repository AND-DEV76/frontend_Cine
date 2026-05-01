import { useState } from "react";
import { registerRequest } from "../api/authApi";
import Swal from 'sweetalert2';

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    nombre: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const validar = () => {
    if (!form.username || !form.nombre || !form.email || !form.password) {
      setError("Todos los campos son obligatorios");
      return false;
    }

    if (!form.email.includes("@")) {
      setError("Email inválido");
      return false;
    }

    if (form.password.length < 4) {
      setError("Password mínimo 4 caracteres");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validar()) return;

    try {
      await registerRequest({
        ...form,
        idRol: 2 // 🔥 CLIENTE
      });

      Swal.fire('Éxito', 'Usuario creado correctamente', 'success').then(() => {
        window.location.href = "/login";
      });

    } catch {
      setError("Error al registrar");
    }
  };

  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <h2>Registro</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input placeholder="Username"
        onChange={(e) => setForm({...form, username: e.target.value})}/>

      <input placeholder="Nombre"
        onChange={(e) => setForm({...form, nombre: e.target.value})}/>

      <input placeholder="Email"
        onChange={(e) => setForm({...form, email: e.target.value})}/>

      <input type="password" placeholder="Password"
        onChange={(e) => setForm({...form, password: e.target.value})}/>

      <button type="submit">Registrarse</button>

      <p
        className="link"
        onClick={() => (window.location.href = "/login")}
      >
        Ya tengo cuenta
      </p>
    </form>
  );
};

export default RegisterForm;