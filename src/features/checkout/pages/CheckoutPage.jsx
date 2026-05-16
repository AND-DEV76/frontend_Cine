import { useState, useEffect, useRef, useCallback } from "react";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { getMetodosPago, procesarCompra } from "../api/checkoutApi";
import { liberarAsientos } from "../api/reservationApi";
import Swal from "sweetalert2";
import { FiClock } from "react-icons/fi";
import "../../../styles/checkout.css";

const RESERVATION_SECONDS = 5 * 60; // 5 minutos

const CheckoutPage = () => {
  const user = useCurrentUser();
  const [checkoutData, setCheckoutData] = useState(null);
  const [metodosPago, setMetodosPago] = useState([]);
  const [idMetodoPago, setIdMetodoPago] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESERVATION_SECONDS);
  const timerRef = useRef(null);
  const hasExpiredRef = useRef(false);

  // Calcula tiempo restante basado en cuando se reservo
  const calcSecondsLeft = useCallback((data) => {
    if (!data?.reservedAt) return RESERVATION_SECONDS;
    const elapsed = Math.floor((Date.now() - new Date(data.reservedAt).getTime()) / 1000);
    return Math.max(0, RESERVATION_SECONDS - elapsed);
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem("checkout_data");
    if (raw) {
      const parsed = JSON.parse(raw);
      setCheckoutData(parsed);
      setSecondsLeft(calcSecondsLeft(parsed));
    } else {
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new Event("popstate"));
    }

    getMetodosPago().then(setMetodosPago).catch(console.error);
  }, [calcSecondsLeft]);

  // Countdown
  useEffect(() => {
    if (!checkoutData) return;

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (!hasExpiredRef.current) {
            hasExpiredRef.current = true;
            handleExpired();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [checkoutData]);

  // Liberar asientos si el usuario cierra la pagina
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (checkoutData && user) {
        // Usar sendBeacon para que se envie incluso al cerrar
        const payload = JSON.stringify({
          idFuncion: checkoutData.funcion.idFuncion,
          idUsuario: user.idUsuario,
        });
        navigator.sendBeacon(
          import.meta.env.VITE_API_URL + "/reservas/liberar",
          new Blob([payload], { type: "application/json" })
        );
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [checkoutData, user]);

  const handleExpired = async () => {
    if (checkoutData && user) {
      try {
        await liberarAsientos({
          idFuncion: checkoutData.funcion.idFuncion,
          idUsuario: user.idUsuario,
        });
      } catch (e) {
        // Error silencioso, el cleanup job se encargara
      }
    }

    localStorage.removeItem("checkout_data");
    Swal.fire("Tiempo agotado", "Tu reserva de asientos ha expirado. Selecciona nuevamente.", "warning").then(() => {
      window.history.pushState({}, "", "/cartelera");
      window.dispatchEvent(new Event("popstate"));
    });
  };

  const handleCancelReservation = async () => {
    const result = await Swal.fire({
      title: "Cancelar compra",
      text: "Se liberaran los asientos reservados",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, cancelar",
      cancelButtonText: "Volver",
    });

    if (result.isConfirmed && checkoutData && user) {
      try {
        await liberarAsientos({
          idFuncion: checkoutData.funcion.idFuncion,
          idUsuario: user.idUsuario,
        });
      } catch (e) {
        // Silencioso
      }
      clearInterval(timerRef.current);
      localStorage.removeItem("checkout_data");
      window.history.pushState({}, "", "/cartelera");
      window.dispatchEvent(new Event("popstate"));
    }
  };

  if (!checkoutData) return null;

  const { pelicula, funcion, asientos } = checkoutData;
  const precioPorBoleto = 50;
  const total = asientos.length * precioPorBoleto;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isUrgent = secondsLeft < 60;

  const handlePagar = async () => {
    if (!idMetodoPago) {
      Swal.fire("Atencion", "Debes seleccionar un metodo de pago", "warning");
      return;
    }

    if (secondsLeft <= 0) {
      handleExpired();
      return;
    }

    setIsProcessing(true);
    try {
      await procesarCompra({
        idUsuario: user.idUsuario,
        idMetodoPago: Number(idMetodoPago),
        idAsientos: asientos,
        idFuncion: funcion.idFuncion,
        total: total,
      });

      clearInterval(timerRef.current);

      Swal.fire("Compra Exitosa", "Tus boletos han sido generados", "success").then(() => {
        localStorage.removeItem("checkout_data");
        window.history.pushState({}, "", "/mis-boletos");
        window.dispatchEvent(new Event("popstate"));
      });
    } catch (error) {
      const msg = error?.response?.data || "No se pudo procesar la compra";
      Swal.fire("Error", String(msg), "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-container">
      {/* Overlay de procesamiento */}
      {isProcessing && (
        <div className="checkout-overlay">
          <div className="checkout-overlay__spinner"></div>
          <p className="checkout-overlay__text">Procesando tu pago...</p>
        </div>
      )}

      {/* Timer */}
      <div className={`checkout-timer ${isUrgent ? "checkout-timer--urgent" : ""}`}>
        <FiClock />
        <span>
          Tiempo restante: {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
      </div>

      <h1 className="checkout-title">Resumen de Compra</h1>

      <div className="checkout-card">
        <h2 className="checkout-movie-name">{pelicula.nombre}</h2>
        <div className="checkout-details">
          <p><strong>Funcion:</strong> Sala {funcion.numeroSala}</p>
          <p>
            <strong>Fecha:</strong>{" "}
            {funcion.fechaHora ? funcion.fechaHora.split("T")[0] : ""} a las{" "}
            {funcion.fechaHora ? funcion.fechaHora.split("T")[1].substring(0, 5) : ""}
          </p>
          <p><strong>Boletos:</strong> {asientos.length}</p>
          <p><strong>Precio unitario:</strong> Q{precioPorBoleto.toFixed(2)}</p>
        </div>

        <div className="checkout-total">
          <h3>Total a Pagar:</h3>
          <h3 className="checkout-total__amount">Q{total.toFixed(2)}</h3>
        </div>
      </div>

      <div className="checkout-card">
        <h3 className="checkout-card__subtitle">Metodo de Pago</h3>
        <select
          value={idMetodoPago}
          onChange={(e) => setIdMetodoPago(e.target.value)}
          className="checkout-select"
        >
          <option value="">Seleccione un metodo...</option>
          {metodosPago.map((mp) => (
            <option key={mp.idMetodoPago} value={mp.idMetodoPago}>
              {mp.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="checkout-actions">
        <button
          onClick={handleCancelReservation}
          className="btn-royale btn-ghost"
        >
          Cancelar
        </button>
        <button
          onClick={handlePagar}
          disabled={isProcessing || secondsLeft <= 0}
          className="btn-royale btn-primary checkout-pay-btn"
        >
          {isProcessing ? "Procesando..." : "Confirmar y Pagar"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
