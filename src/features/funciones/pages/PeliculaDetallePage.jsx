import { useState, useEffect } from "react";
import { usePeliculaById } from "../../peliculas/hooks/usePeliculaById";
import { getFuncionesPorPelicula, getEstadoAsientos } from "../api/funcionApi";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { reservarAsientos } from "../../checkout/api/reservationApi";
import Swal from "sweetalert2";
import { FiClock, FiCalendar, FiStar, FiPlay } from "react-icons/fi";
import "../../../styles/pelicula-detalle.css";

// Extrae el ID de video de una URL de YouTube
const extractYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

const PeliculaDetallePage = () => {
  const user = useCurrentUser();
  const pathParts = window.location.pathname.split("/");
  const idPelicula = pathParts[pathParts.length - 1];

  const { data: pelicula, isLoading: isLoadingPelicula } = usePeliculaById(idPelicula);
  const [funciones, setFunciones] = useState([]);
  const [funcionSeleccionada, setFuncionSeleccionada] = useState(null);
  const [asientos, setAsientos] = useState([]);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (idPelicula) {
      getFuncionesPorPelicula(idPelicula).then(setFunciones).catch(console.error);
    }
  }, [idPelicula]);

  const handleSelectFuncion = async (funcion) => {
    setFuncionSeleccionada(funcion);
    setAsientosSeleccionados([]);
    try {
      const asientosFuncion = await getEstadoAsientos(funcion.idFuncion);
      setAsientos(asientosFuncion);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudieron cargar los asientos", "error");
    }
  };

  const toggleAsiento = (asiento) => {
    if (asiento.estado !== "DISPONIBLE") return;

    if (asientosSeleccionados.includes(asiento.idAsiento)) {
      setAsientosSeleccionados(prev => prev.filter(id => id !== asiento.idAsiento));
    } else {
      setAsientosSeleccionados(prev => [...prev, asiento.idAsiento]);
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      Swal.fire("Atencion", "Debes iniciar sesion para comprar boletos", "warning");
      return;
    }

    if (asientosSeleccionados.length === 0) {
      Swal.fire("Atencion", "Debes seleccionar al menos un asiento", "warning");
      return;
    }

    // Reservar asientos en el backend antes de ir al checkout
    try {
      await reservarAsientos({
        idFuncion: funcionSeleccionada.idFuncion,
        idAsientos: asientosSeleccionados,
        idUsuario: user.idUsuario,
      });
    } catch (error) {
      const msg = error?.response?.data || "No se pudieron reservar los asientos";
      Swal.fire("Error", String(msg), "error");
      return;
    }

    localStorage.setItem("checkout_data", JSON.stringify({
      pelicula,
      funcion: funcionSeleccionada,
      asientos: asientosSeleccionados,
      reservedAt: new Date().toISOString(),
    }));

    window.history.pushState({}, "", "/checkout");
    window.dispatchEvent(new Event("popstate"));
  };

  const youtubeId = extractYouTubeId(pelicula?.trailer);

  if (isLoadingPelicula) {
    return (
      <div className="detalle-loading">
        <div className="detalle-loading__spinner"></div>
        <p>Cargando pelicula...</p>
      </div>
    );
  }

  if (!pelicula) {
    return <div className="detalle-loading"><p>Pelicula no encontrada</p></div>;
  }

  return (
    <div className="detalle-container">
      {/* Hero con poster de fondo */}
      <section className="detalle-hero">
        <div
          className="detalle-hero__bg"
          style={{ backgroundImage: `url(${pelicula.poster})` }}
        />
        <div className="detalle-hero__overlay" />

        <div className="detalle-hero__content">
          <img
            src={pelicula.poster}
            alt={pelicula.nombre}
            className="detalle-hero__poster"
          />

          <div className="detalle-hero__info">
            <h1 className="detalle-hero__title">{pelicula.nombre}</h1>

            <div className="detalle-hero__badges">
              {pelicula.clasificacion && (
                <span className="detalle-badge detalle-badge--rating">
                  {pelicula.clasificacion}
                </span>
              )}
              {pelicula.anio && (
                <span className="detalle-badge">
                  <FiCalendar /> {pelicula.anio}
                </span>
              )}
              <span className="detalle-badge">
                <FiClock /> {pelicula.duracion} min
              </span>
            </div>

            {pelicula.generos && pelicula.generos.length > 0 && (
              <div className="detalle-hero__genres">
                {pelicula.generos.map((g, i) => (
                  <span key={i} className="detalle-genre-tag">{g}</span>
                ))}
              </div>
            )}

            <p className="detalle-hero__desc">{pelicula.descripcion}</p>

            {youtubeId && (
              <button
                className="btn-royale btn-primary detalle-trailer-btn"
                onClick={() => setShowTrailer(true)}
              >
                <FiPlay /> Ver Trailer
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Modal del trailer */}
      {showTrailer && youtubeId && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <div className="trailer-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="trailer-modal__close" onClick={() => setShowTrailer(false)}>
              &times;
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="trailer-modal__iframe"
            />
          </div>
        </div>
      )}

      {/* Funciones */}
      <section className="detalle-section">
        <h2 className="detalle-section__title">
          <FiStar /> Funciones Disponibles
        </h2>

        {funciones.length === 0 ? (
          <p className="detalle-section__empty">
            No hay funciones programadas para esta pelicula.
          </p>
        ) : (
          <div className="detalle-funciones">
            {funciones.map(f => (
              <button
                key={f.idFuncion}
                onClick={() => handleSelectFuncion(f)}
                className={`detalle-funcion-card ${
                  funcionSeleccionada?.idFuncion === f.idFuncion
                    ? "detalle-funcion-card--active"
                    : ""
                }`}
              >
                <span className="detalle-funcion-card__sala">Sala {f.numeroSala}</span>
                <span className="detalle-funcion-card__fecha">
                  {f.fechaHora ? f.fechaHora.split("T")[0] : ""}
                </span>
                <span className="detalle-funcion-card__hora">
                  {f.fechaHora ? f.fechaHora.split("T")[1].substring(0, 5) : ""}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Selector de asientos */}
      {funcionSeleccionada && (
        <section className="detalle-section detalle-asientos-section">
          <h2 className="detalle-section__title">Selecciona tus Asientos</h2>

          <div className="detalle-pantalla">
            <div className="detalle-pantalla__bar" />
            <span className="detalle-pantalla__label">PANTALLA</span>
          </div>

          <div className="detalle-asientos-grid">
            {["A", "B", "C", "D"].map((fila) => {
              const asientosFila = asientos
                .filter((a) => a.fila === fila)
                .sort((a, b) => a.numero - b.numero);

              if (asientosFila.length === 0) return null;

              return (
                <div key={fila} className="detalle-asientos-fila">
                  <span className="detalle-fila-label">{fila}</span>
                  {asientosFila.map((a) => {
                    const isSelected = asientosSeleccionados.includes(a.idAsiento);
                    const isOcupado = a.estado === "OCUPADO";
                    const isReservado = a.estado === "RESERVADO";

                    let className = "detalle-asiento";
                    if (isSelected) className += " detalle-asiento--selected";
                    if (isOcupado) className += " detalle-asiento--ocupado";
                    if (isReservado) className += " detalle-asiento--reservado";

                    return (
                      <div
                        key={a.idAsiento}
                        className={className}
                        onClick={() => toggleAsiento(a)}
                        title={`Fila ${a.fila} - Asiento ${a.numero}`}
                      >
                        {a.numero}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="detalle-asientos-leyenda">
            <div className="detalle-leyenda-item">
              <div className="detalle-leyenda-box detalle-leyenda-box--disponible" />
              Disponible
            </div>
            <div className="detalle-leyenda-item">
              <div className="detalle-leyenda-box detalle-leyenda-box--selected" />
              Seleccionado
            </div>
            <div className="detalle-leyenda-item">
              <div className="detalle-leyenda-box detalle-leyenda-box--reservado" />
              Reservado
            </div>
            <div className="detalle-leyenda-item">
              <div className="detalle-leyenda-box detalle-leyenda-box--ocupado" />
              Ocupado
            </div>
          </div>

          {asientosSeleccionados.length > 0 && (
            <div className="detalle-checkout-bar">
              <p>Has seleccionado {asientosSeleccionados.length} asiento(s)</p>
              <button
                onClick={handleCheckout}
                className="btn-royale btn-primary"
              >
                Continuar al Pago
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default PeliculaDetallePage;
