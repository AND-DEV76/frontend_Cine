import crImage from "../assets/CR-404.webp";
import "../styles/not-found.css";

const NotFoundPage = () => {
  const goTo = (path) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <div className="not-found">
      <img
        src={crImage}
        alt="Página no encontrada"
        className="not-found__image"
      />
      <span className="not-found__code">404</span>
      <h1 className="not-found__title">¡Escena no encontrada!</h1>
      <p className="not-found__message">
        Parece que esta escena fue cortada en la edición final. 
        La página que buscas no existe o fue movida a otra sala.
      </p>
      <div className="not-found__actions">
        <button className="btn-royale btn-primary" onClick={() => goTo("/")}>
          Volver al Inicio
        </button>
        <button className="btn-royale btn-ghost" onClick={() => goTo("/cartelera")}>
          Ver Cartelera
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
