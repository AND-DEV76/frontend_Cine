import React from 'react';
import mascotImg from '../assets/minipekka.png';
import '../styles/footer.css';

const Footer = () => {
  const goTo = (path) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <img src={mascotImg} alt="Cinema Royale" className="footer-brand-icon" />
            <span className="footer-brand-text">
              Cinema<span className="footer-brand-accent">Royale</span>
            </span>
          </div>
          <p className="footer-description">
            Tu destino premium para disfrutar del mejor cine con tecnología
            de vanguardia, comodidad insuperable y los estrenos más esperados.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Navegación</h4>
          <ul className="footer-links">
            <li><span onClick={() => goTo('/')}>Inicio</span></li>
            <li><span onClick={() => goTo('/cartelera')}>Cartelera</span></li>
            <li><span>Próximos Estrenos</span></li>
            <li><span>Promociones</span></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Información</h4>
          <ul className="footer-links">
            <li><span>Preguntas Frecuentes</span></li>
            <li><span>Términos y Condiciones</span></li>
            <li><span>Política de Privacidad</span></li>
            <li><span>Contacto</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Cinema Royale. Todos los derechos reservados.</p>
        <p>Diseñado con dedicación.</p>
      </div>
    </footer>
  );
};

export default Footer;
