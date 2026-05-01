import React from 'react';
import mascotImg from '../../../assets/minipekka.png';
import '../../../styles/landing.css';

const LandingPage = () => {

  const goTo = (path) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <div className="landing-container">

      {/* ── HERO ─────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-bg"></div>

        {/* Líneas diagonales decorativas */}
        <div className="hero-lines"></div>

        {/* Diamantes flotantes */}
        <div className="diamond-particle"></div>
        <div className="diamond-particle"></div>
        <div className="diamond-particle"></div>
        <div className="diamond-particle"></div>
        <div className="diamond-particle"></div>

        <div className="hero-inner">
          <div className="hero-text">
            <span className="hero-tag">Tu cine favorito</span>
            <h1 className="hero-title">
              Vive la experiencia<br />
              <span className="hero-title-accent">Cinema Royale</span>
            </h1>
            <p className="hero-description">
              Disfruta de los mejores estrenos en salas con tecnología de última generación,
              sonido envolvente y la comodidad que mereces. Tu próxima película favorita te espera.
            </p>
            <div className="hero-actions">
              <button className="btn-royale btn-primary" onClick={() => goTo('/cartelera')}>
                Ver Cartelera
              </button>
              <button className="btn-royale btn-ghost" onClick={() => goTo('/register')}>
                Crear Cuenta
              </button>
            </div>
          </div>

          <div className="hero-mascot">
            <div className="mascot-wrapper">
              <div className="mascot-glow"></div>
              <img src={mascotImg} alt="Cinema Royale Mascota" className="mascot-img" />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────── */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">6</div>
            <div className="stat-label">Salas Premium</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4K</div>
            <div className="stat-label">Proyección Digital</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">Dolby</div>
            <div className="stat-label">Sonido Envolvente</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Reservas Online</div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────── */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-tag">Nuestras Salas</span>
          <h2 className="section-title">Una experiencia cinematográfica premium</h2>
        </div>

        <div className="features-grid">
          <div className="feature-card glass">
            <div className="feature-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                <polyline points="17 2 12 7 7 2"></polyline>
              </svg>
            </div>
            <h3 className="feature-title">Pantallas IMAX</h3>
            <p className="feature-desc">
              Pantallas de gran formato con resolución 4K HDR para que cada fotograma sea una obra maestra visual.
            </p>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
            </div>
            <h3 className="feature-title">Dolby Atmos</h3>
            <p className="feature-desc">
              Sistema de audio inmersivo con altavoces posicionales. Siente cada efecto de sonido como si estuvieras dentro de la película.
            </p>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h3 className="feature-title">Asientos Reclinables</h3>
            <p className="feature-desc">
              Butacas VIP con reclinación eléctrica, mesa personal y servicio a tu asiento para la máxima comodidad.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-box">
          <h2>¿Listo para tu próxima función?</h2>
          <p>
            Explora nuestra cartelera, elige tu película y reserva los mejores asientos desde la comodidad de tu hogar.
          </p>
          <button className="btn-royale btn-secondary" onClick={() => goTo('/cartelera')}>
            Explorar Cartelera
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
