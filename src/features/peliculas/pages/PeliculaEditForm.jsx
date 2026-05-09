import { useState, useEffect, useRef } from "react";
import { useUpdatePelicula } from "../hooks/useUpdatePelicula";
import { useClasificaciones } from "../hooks/useClasificaciones";
import { useGeneros } from "../hooks/useGeneros";
import { useCreatePeliculaGenero } from "../hooks/useCreatePeliculaGenero";
import { usePeliculas } from "../hooks/usePeliculas";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import "../../../styles/pelicula.css";
import Breadcrumb from "../../../components/Breadcrumb";
import Swal from "sweetalert2";
import { FiUploadCloud, FiX } from "react-icons/fi";

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

  const [posterPreview, setPosterPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [generosSeleccionados, setGenerosSeleccionados] = useState([]);
  const [peliculaId, setPeliculaId] = useState(null);

  // obtener ID desde URL
  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/").pop();
    setPeliculaId(Number(id));
  }, []);

  // cargar datos existentes
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

    // Mostrar el poster actual como preview
    if (peli.poster) {
      setPosterPreview(peli.poster);
    }

    setGenerosSeleccionados(
      peli.generos ? peli.generos.map(id => String(id)) : []
    );

  }, [peliculaId, peliculas]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "poster") {
      const file = files[0];
      if (file) {
        setForm({ ...form, poster: file });
        setPosterPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const clearPoster = () => {
    setForm({ ...form, poster: null });
    setPosterPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

    if (!form.nombre || !form.duracion || !form.idClasificacion || !form.descripcion) {
      Swal.fire("Atención", "Todos los campos obligatorios deben llenarse", "warning");
      return;
    }

    if (isNaN(form.duracion)) {
      Swal.fire("Error", "La duración debe ser un número", "error");
      return;
    }

    if (!user) {
      Swal.fire("Error", "Usuario no autenticado", "error");
      return;
    }

    if (generosSeleccionados.length === 0) {
      Swal.fire("Atención", "Debes seleccionar al menos un género", "warning");
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

      Swal.fire("Éxito", "Película actualizada correctamente", "success");

    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Error al actualizar película", "error");
    }
  };

  return (
    <div>
      <div style={{ padding: "0 40px" }}>
        <Breadcrumb items={[
          { label: "Películas", path: "/peliculas/new" },
          { label: "Editar" }
        ]} />
      </div>
    <form onSubmit={handleSubmit} className="pelicula-form">
      <h2>Editar Película</h2>

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
              onChange={handleGeneroChange}
            />
            {g.nombre}
          </label>
        ))}
      </div>

      {/* 🖼️ POSTER UPLOAD CON PREVIEW */}
      <div className="poster-upload-area">
        {posterPreview ? (
          <div className="poster-preview">
            <img src={posterPreview} alt="Vista previa del poster" className="poster-preview__img" />
            <div className="poster-preview__overlay">
              <button type="button" className="poster-preview__remove" onClick={clearPoster} title="Quitar imagen">
                <FiX />
              </button>
            </div>
            <span className="poster-preview__name">
              {form.poster?.name || "Poster actual"}
            </span>
          </div>
        ) : (
          <label className="poster-dropzone" htmlFor="poster-edit-input">
            <FiUploadCloud className="poster-dropzone__icon" />
            <span className="poster-dropzone__text">Cambiar poster (opcional)</span>
            <span className="poster-dropzone__hint">JPG, PNG o WEBP</span>
          </label>
        )}
        <input
          id="poster-edit-input"
          type="file"
          name="poster"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>

      <button type="submit" disabled={isLoading} className="pelicula-button">
        {isLoading ? "Guardando..." : "Actualizar"}
      </button>
    </form>
    </div>
  );
};

export default PeliculaEditForm;