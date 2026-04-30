import { useState, useEffect } from "react";
import { useUpdatePelicula } from "../hooks/useUpdatePelicula";
import { useClasificaciones } from "../hooks/useClasificaciones";
import { useGeneros } from "../hooks/useGeneros";
import { useCreatePeliculaGenero } from "../hooks/useCreatePeliculaGenero";
import { usePeliculas } from "../hooks/usePeliculas";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";

const PeliculaEditForm = () => {
  const user = useCurrentUser();

  const { mutateAsync: updatePeliculaAsync, isPending: isLoading } = useUpdatePelicula();
  const { crearRelacionAsync } = useCreatePeliculaGenero();

  const { data: peliculas = [] } = usePeliculas();
  const { data: clasificaciones = [] } = useClasificaciones();
  const { data: generos = [] } = useGeneros();

  const [form, setForm] = useState({
    nombre: "",
    duracion: "",
    idClasificacion: "",
    descripcion: "",
    poster: null,
  });

  const [generosSeleccionados, setGenerosSeleccionados] = useState([]);
  const [peliculaId, setPeliculaId] = useState(null);

  // obtener ID desde URL
  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/").pop();
    setPeliculaId(Number(id));
  }, []);

  // cargar datos
  useEffect(() => {
    if (!peliculaId || peliculas.length === 0) return;

    const peli = peliculas.find(p => Number(p.idPelicula) === Number(peliculaId));
    if (!peli) return;

    setForm({
      nombre: peli.nombre || "",
      duracion: peli.duracion || "",
      idClasificacion: peli.idClasificacion || "",
      descripcion: peli.descripcion || "",
      poster: null,
    });

    setGenerosSeleccionados(
      peli.generos ? peli.generos.map(id => String(id)) : []
    );

  }, [peliculaId, peliculas]);

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
      setGenerosSeleccionados(prev => [...prev, value]);
    } else {
      setGenerosSeleccionados(prev =>
        prev.filter(id => id !== value)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // mismas validaciones que tu form original
    if (!form.nombre || !form.duracion || !form.idClasificacion || !form.descripcion) {
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

    if (generosSeleccionados.length === 0) {
      alert("Debes seleccionar al menos un género");
      return;
    }

    const data = new FormData();
    data.append("nombre", form.nombre);
    data.append("duracion", form.duracion);
    data.append("idClasificacion", form.idClasificacion);
    data.append("descripcion", form.descripcion);
    data.append("creadoPor", user.idUsuario);

    if (form.poster) {
      data.append("poster", form.poster);
    }

    try {
      await updatePeliculaAsync({
        id: peliculaId,
        data: data,
      });

      // volver a crear relaciones
      for (const idGenero of generosSeleccionados) {
        await crearRelacionAsync({
          idPelicula: peliculaId,
          idGenero: Number(idGenero),
        });
      }

      alert("Película actualizada correctamente");

    } catch (error) {
      console.error(error);
      alert("Error al actualizar película");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pelicula-form">
      <h2>Editar Película</h2>

      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        className="pelicula-input"
      />

      <input
        name="duracion"
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
        {isLoading ? "Guardando..." : "Actualizar"}
      </button>
    </form>
  );
};

export default PeliculaEditForm;