import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { getMisBoletos } from "../api/checkoutApi";
import { FiFilm } from "react-icons/fi";
import "../../../styles/mis-boletos.css";

const MisBoletosPage = () => {
  const user = useCurrentUser();
  const [boletos, setBoletos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getMisBoletos(user.idUsuario)
        .then(setBoletos)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  // Formatea la fecha en texto legible (ej: "Jueves, 08 de Mayo 2026")
  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "—";
    try {
      const date = new Date(fechaStr + "T00:00:00");
      return date.toLocaleDateString("es-GT", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return fechaStr;
    }
  };

  // Formatea la hora (ej: "15:00" → "3:00 PM")
  const formatHora = (horaStr) => {
    if (!horaStr) return "—";
    try {
      const [h, m] = horaStr.split(":");
      const date = new Date();
      date.setHours(parseInt(h), parseInt(m));
      return date.toLocaleTimeString("es-GT", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return horaStr;
    }
  };

  // Genera un código de boleto estilo cine
  const generarCodigo = (idBoleto) => {
    const base = String(idBoleto).padStart(6, "0");
    return `CR-${base}-${new Date().getFullYear()}`;
  };

  // Genera texto para el QR (simulado)
  const generarQRData = (boleto) => {
    return JSON.stringify({
      cinema: "CinemaRoyale",
      boleto: boleto.idBoleto,
      pelicula: boleto.nombrePelicula,
      sala: boleto.numeroSala,
      asiento: `${boleto.fila}${boleto.numeroAsiento}`,
      fecha: boleto.fecha,
      hora: boleto.hora,
      codigo: generarCodigo(boleto.idBoleto),
    });
  };

  const goTo = (path) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };

  // Estado de carga
  if (isLoading) {
    return (
      <div className="boletos-loading">
        <div className="boletos-loading__spinner"></div>
        <p className="boletos-loading__text">Cargando tus boletos...</p>
      </div>
    );
  }

  const getStatusClass = (estado) => {
    switch (estado?.toUpperCase()) {
      case "ACTIVO": return "ticket__status--activo";
      case "USADO": return "ticket__status--usado";
      case "CANCELADO": return "ticket__status--cancelado";
      default: return "ticket__status--activo";
    }
  };

  return (
    <div className="boletos-page">
      <h1 className="boletos-page__title">Mis Boletos</h1>
      <p className="boletos-page__subtitle">
        {boletos.length > 0
          ? `Tienes ${boletos.length} boleto${boletos.length > 1 ? "s" : ""} comprado${boletos.length > 1 ? "s" : ""}`
          : "Tu historial de entradas aparecerá aquí"}
      </p>

      {boletos.length === 0 ? (
        <div className="boletos-empty">
          <div className="boletos-empty__icon"><FiFilm /></div>
          <p className="boletos-empty__text">No tienes boletos comprados aún.</p>
          <p className="boletos-empty__cta" onClick={() => goTo("/cartelera")}>
            ¡Explora la cartelera y disfruta una película!
          </p>
        </div>
      ) : (
        <div className="boletos-grid">
          {boletos.map((b) => (
            <div className="ticket" key={b.idBoleto}>
              {/* ── Left Section: Movie Info ── */}
              <div className="ticket__left">
                <div>
                  <div className="ticket__header">
                    <span className="ticket__brand">Cinema Royale</span>
                    <span className={`ticket__status ${getStatusClass(b.estado)}`}>
                      {b.estado}
                    </span>
                  </div>

                  <h3 className="ticket__movie-name">{b.nombrePelicula}</h3>

                  <div className="ticket__details">
                    <div className="ticket__detail">
                      <span className="ticket__detail-label">Fecha</span>
                      <span className="ticket__detail-value">
                        {formatFecha(b.fecha)}
                      </span>
                    </div>

                    <div className="ticket__detail">
                      <span className="ticket__detail-label">Hora</span>
                      <span className="ticket__detail-value ticket__detail-value--highlight">
                        {formatHora(b.hora)}
                      </span>
                    </div>

                    <div className="ticket__detail">
                      <span className="ticket__detail-label">Sala</span>
                      <span className="ticket__detail-value">
                        Sala {b.numeroSala}
                      </span>
                    </div>

                    <div className="ticket__detail">
                      <span className="ticket__detail-label">Asiento</span>
                      <span className="ticket__detail-value ticket__detail-value--seat">
                        {b.fila}{b.numeroAsiento}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="ticket__footer">
                  <span className="ticket__price">Q{b.precio?.toFixed(2)}</span>
                  <span className="ticket__id">{generarCodigo(b.idBoleto)}</span>
                </div>
              </div>

              {/* ── Perforated Divider ── */}
              <div className="ticket__divider"></div>

              {/* ── Right Section: QR Code ── */}
              <div className="ticket__right">
                <span className="ticket__scan-text">Escanea para entrar</span>
                <div className="ticket__qr-wrapper">
                  <QRCodeSVG
                    value={generarQRData(b)}
                    size={110}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#0a0e1a"
                    includeMargin={false}
                  />
                </div>
                <span className="ticket__barcode">
                  {String(b.idBoleto).padStart(8, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisBoletosPage;
