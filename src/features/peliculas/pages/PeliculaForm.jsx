import { useState } from "react";
import { useCreatePelicula } from "../hooks/useCreatePelicula";
import { useClasificaciones } from "../hooks/useClasificaciones";
import { useGeneros } from "../hooks/useGeneros";
import { useCreatePeliculaGenero } from "../hooks/useCreatePeliculaGenero";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import "../../../styles/pelicula.css";
import Swal from 'sweetalert2';

const PeliculaForm = () => {
  const user = useCurrentUser();

  const { mutateAsync: crearPeliculaAsync, isPending: isLoading } = useCreatePelicula();
  const { data: clasificaciones = [] } = useClasificaciones();
  const { data: generos = [] } = useGeneros();
  const { crearRelacionAsync } = useCreatePeliculaGenero();

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

  const handleGeneroChange = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      setGenerosSeleccionados((prev) => [...prev, value]);
    } else {
      setGenerosSeleccionados((prev) =>
        prev.filter((id) => id !== value)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.duracion || !form.idClasificacion || !form.descripcion) {
      Swal.fire('Advertencia', 'Todos los campos obligatorios deben llenarse', 'warning');
      return;
    }

    if (isNaN(form.duracion)) {
      Swal.fire('Advertencia', 'La duración debe ser un número', 'warning');
      return;
    }

    if (!user) {
      Swal.fire('Error', 'Usuario no autenticado', 'error');
      return;
    }

    // 🆕 VALIDACIÓN GÉNEROS
    if (generosSeleccionados.length === 0) {
      Swal.fire('Advertencia', 'Debes seleccionar al menos un género', 'warning');
      return;
    }

    // 🆕 VALIDACIÓN POSTER
    if (!form.poster) {
      Swal.fire('Advertencia', 'Debes seleccionar una imagen (poster)', 'warning');
      return;
    }

    const data = new FormData();
    data.append("nombre", form.nombre);
    data.append("duracion", form.duracion);
    data.append("idClasificacion", form.idClasificacion);
    data.append("descripcion", form.descripcion);
    data.append("poster", form.poster);
    data.append("creadoPor", user.idUsuario);

    try {
      const res = await crearPeliculaAsync(data);

      console.log("RESPUESTA COMPLETA:", res);

      const peliculaId = res?.data?.idPelicula || res?.idPelicula;

      if (!peliculaId) {
        throw new Error("No se pudo obtener el ID de la película");
      }

      console.log("PELÍCULA ID:", peliculaId);

      // 🔥 RELACIONES
      for (const idGenero of generosSeleccionados) {
        const payload = {
          idPelicula: peliculaId,
          idGenero: Number(idGenero),
        };

        console.log("ENVIANDO RELACIÓN:", payload);

        await crearRelacionAsync(payload);
      }

      Swal.fire('Éxito', 'Película y géneros guardados correctamente', 'success');

      // RESET
      setForm({
        nombre: "",
        duracion: "",
        idClasificacion: "",
        descripcion: "",
        poster: null,
      });

      setGenerosSeleccionados([]);

    } catch (error) {
      console.error("ERROR COMPLETO:", error);
      console.error("RESPONSE DATA:", error.response?.data);

      Swal.fire('Error', 'Error al guardar la película', 'error');
    }
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

      {/* 🎬 GÉNEROS */}
      <div className="pelicula-generos">
        {generos.map((g) => (
          <label key={g.id_genero}>
            <input
              type="checkbox"
              value={g.id_genero}
              checked={generosSeleccionados.includes(String(g.id_genero))}
              onChange={handleGeneroChange}
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