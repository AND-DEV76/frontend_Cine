import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const { mutate: login } = useLogin();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    login(form, {
      onSuccess: (user) => {
        if (
          user.rol.nombre === "ADMIN" ||
          user.rol.nombre === "EMPLEADO"
        ) {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      },
      onError: () => setError("Credenciales incorrectas")
    });
  };

  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button type="submit">Entrar</button>

      <p
        className="link"
        onClick={() => (window.location.href = "/register")}
      >
        Crear cuenta
      </p>
    </form>
  );
};

export default LoginForm;