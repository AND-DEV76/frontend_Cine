import { useState } from "react";
import { useCreatePelicula } from "../hooks/useCreatePelicula";
import { useClasificaciones } from "../hooks/useClasificaciones";
import { useGeneros } from "../hooks/useGeneros";
import { useCreatePeliculaGenero } from "../hooks/useCreatePeliculaGenero";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import "../../../styles/pelicula.css";

const PeliculaForm = () => {
  const user = useCurrentUser();
  const { mutate, isLoading } = useCreatePelicula();
  const { data: clasificaciones = [] } = useClasificaciones();
  const { data: generos = [] } = useGeneros();
  const { mutate: crearRelacion } = useCreatePeliculaGenero();

  const [form, setForm] = useState({
    nombre: "",
    duracion: "",
    idClasificacion: "",
    descripcion: "",
    poster: null,
  });

  const [generosSeleccionados, setGenerosSeleccionados] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "poster") {
      setForm({ ...form, poster: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.duracion || !form.idClasificacion) {
      alert("Todos los campos obligatorios deben llenarse");
      return;
    }

    if (isNaN(form.duracion)) {
      alert("La duración debe ser un número");
      return;
    }

    if (!user) {
      alert("Usuario no autenticado");
      return;
    }

    const data = new FormData();
    data.append("nombre", form.nombre);
    data.append("duracion", form.duracion);
    data.append("idClasificacion", form.idClasificacion);
    data.append("descripcion", form.descripcion);
    data.append("poster", form.poster);
    data.append("creadoPor", user.idUsuario);

    mutate(data, {
      onSuccess: (res) => {
        const peliculaId = res.data.idPelicula;

        generosSeleccionados.forEach((idGenero) => {
          crearRelacion({
            idPelicula: peliculaId,
            idGenero,
          });
        });

        alert("Película creada correctamente 🎬");

        setForm({
          nombre: "",
          duracion: "",
          idClasificacion: "",
          descripcion: "",
          poster: null,
        });
        setGenerosSeleccionados([]);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="pelicula-form">
      <h2>Nueva Película</h2>

      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        className="pelicula-input"
      />

      <input
        name="duracion"
        placeholder="Duración (min)"
        value={form.duracion}
        onChange={handleChange}
        className="pelicula-input"
      />

      <select
        name="idClasificacion"
        value={form.idClasificacion}
        onChange={handleChange}
        className="pelicula-input"
      >
        <option value="">Seleccionar clasificación</option>
        {clasificaciones.map((c) => (
          <option key={c.id_clasificacion} value={c.id_clasificacion}>
            {c.nombre}
          </option>
        ))}
      </select>

      <input
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
        className="pelicula-input"
      />

      <div className="pelicula-generos">
        {generos.map((g) => (
          <label key={g.id_genero}>
            <input
              type="checkbox"
              value={g.id_genero}
              checked={generosSeleccionados.includes(String(g.id_genero))}
              onChange={(e) => {
                const value = e.target.value;

                if (e.target.checked) {
                  setGenerosSeleccionados([...generosSeleccionados, value]);
                } else {
                  setGenerosSeleccionados(
                    generosSeleccionados.filter((id) => id !== value)
                  );
                }
              }}
            />
            {g.nombre}
          </label>
        ))}
      </div>

      <input
        type="file"
        name="poster"
        onChange={handleChange}
        className="pelicula-input"
      />

      <button type="submit" disabled={isLoading} className="pelicula-button">
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default PeliculaForm;