import { useDeletePelicula } from "../hooks/useDelete";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import Swal from "sweetalert2";

const PeliculaCard = ({ pelicula, onEdit }) => {
  const { mutate: eliminar } = useDeletePelicula();
  const user = useCurrentUser();

  const isAdmin =
    user?.rol?.nombre === "ADMIN" || user?.rol?.nombre === "EMPLEADO";

  return (
    <div className="pelicula-card" onClick={() => {
      window.history.pushState({}, "", `/pelicula/${pelicula.idPelicula}`);
      window.dispatchEvent(new Event("popstate"));
    }} style={{cursor: "pointer"}}>
      <img
        src={pelicula.poster}
        alt={pelicula.nombre}
        className="pelicula-img"
      />

      <div className="pelicula-content">
        <h3>{pelicula.nombre}</h3>
        <p>{pelicula.descripcion}</p>

        <p>
          <strong>Duración:</strong> {pelicula.duracion} min
        </p>

        {/* ✅ CORREGIDO */}
        <p>
          <strong>Clasificación:</strong> {pelicula.clasificacion}
        </p>

        {/* ✅ NUEVO: MOSTRAR GENEROS */}
        <p>
          <strong>Géneros:</strong>{" "}
          {pelicula.generos && pelicula.generos.length > 0
            ? pelicula.generos.join(", ")
            : "Sin géneros"}
        </p>

        {isAdmin && (
          <div className="pelicula-actions">
            <button
              className="pelicula-btn pelicula-btn-edit"
              onClick={(e) => { e.stopPropagation(); onEdit(pelicula); }}
            >
              Editar
            </button>

            <button
              className="pelicula-btn pelicula-btn-delete"
              onClick={(e) => {
                e.stopPropagation();
                Swal.fire({
                  title: '¿Estás seguro?',
                  text: `¿Seguro que deseas eliminar "${pelicula.nombre}"?`,
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#3085d6',
                  confirmButtonText: 'Sí, eliminar',
                  cancelButtonText: 'Cancelar'
                }).then((result) => {
                  if (result.isConfirmed) {
                    eliminar(pelicula.idPelicula);
                  }
                });
              }}
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeliculaCard;