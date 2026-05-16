import { useState, useRef } from "react";
import { useCreatePelicula } from "../hooks/useCreatePelicula";
import { useClasificaciones } from "../hooks/useClasificaciones";
import { useGeneros } from "../hooks/useGeneros";
import { useCreatePeliculaGenero } from "../hooks/useCreatePeliculaGenero";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import "../../../styles/pelicula.css";
import Breadcrumb from "../../../components/Breadcrumb";
import Swal from 'sweetalert2';
import { FiUploadCloud, FiX } from "react-icons/fi";

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
    trailer: "",
    anio: "",
    poster: null,
  });

  const [posterPreview, setPosterPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [generosSeleccionados, setGenerosSeleccionados] = useState([]);

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

    if (generosSeleccionados.length === 0) {
      Swal.fire('Advertencia', 'Debes seleccionar al menos un género', 'warning');
      return;
    }

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
    if (form.trailer) data.append("trailer", form.trailer);
    if (form.anio) data.append("anio", form.anio);
    data.append("creadoPor", user.idUsuario);

    try {
      const res = await crearPeliculaAsync(data);

      const peliculaId = res?.data?.idPelicula || res?.idPelicula;

      if (!peliculaId) {
        throw new Error("No se pudo obtener el ID de la película");
      }

      console.log("PELÍCULA ID:", peliculaId);

      for (const idGenero of generosSeleccionados) {
        const payload = {
          idPelicula: peliculaId,
          idGenero: Number(idGenero),
        };

        await crearRelacionAsync(payload);
      }

      Swal.fire('Éxito', 'Película y géneros guardados correctamente', 'success');

      // RESET
      setForm({
        nombre: "",
        duracion: "",
        idClasificacion: "",
        descripcion: "",
        trailer: "",
        anio: "",
        poster: null,
      });
      setPosterPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setGenerosSeleccionados([]);

    } catch (error) {
      Swal.fire('Error', 'Error al guardar la película', 'error');
    }
  };

  return (
    <div>
      <div style={{ padding: "0 40px" }}>
        <Breadcrumb items={[{ label: "Películas" }]} />
      </div>
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

      <input
        name="trailer"
        placeholder="URL del trailer (YouTube)"
        value={form.trailer}
        onChange={handleChange}
        className="pelicula-input"
      />

      <input
        name="anio"
        placeholder="Año de estreno"
        value={form.anio}
        onChange={handleChange}
        className="pelicula-input"
        type="number"
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
            <span className="poster-preview__name">{form.poster?.name}</span>
          </div>
        ) : (
          <label className="poster-dropzone" htmlFor="poster-input">
            <FiUploadCloud className="poster-dropzone__icon" />
            <span className="poster-dropzone__text">Haz clic para subir el poster</span>
            <span className="poster-dropzone__hint">JPG, PNG o WEBP</span>
          </label>
        )}
        <input
          id="poster-input"
          type="file"
          name="poster"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>

      <button type="submit" disabled={isLoading} className="pelicula-button">
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
    </form>
    </div>
  );
};

export default PeliculaForm;