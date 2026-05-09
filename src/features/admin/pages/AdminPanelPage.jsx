import "../../../styles/admin.css";
import { FiUsers, FiFilm, FiTag, FiShield, FiGrid, FiPlay } from "react-icons/fi";

const goTo = (path) => {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("popstate"));
};

const adminItems = [
  { title: "Usuarios", icon: <FiUsers />, path: "/admin/usuarios", desc: "Gestionar cuentas y roles" },
  { title: "Películas", icon: <FiFilm />, path: "/peliculas/new", desc: "Agregar nuevas películas" },
  { title: "Géneros", icon: <FiTag />, path: "/admin/generos", desc: "Categorías de películas" },
  { title: "Clasificación", icon: <FiShield />, path: "/admin/clasificaciones", desc: "Clasificaciones por edad" },
  { title: "Salas", icon: <FiGrid />, path: "/admin/salas", desc: "Configurar salas y asientos" },
  { title: "Funciones", icon: <FiPlay />, path: "/admin/funciones", desc: "Programar horarios" },
];

const AdminPanelPage = () => {
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Panel de Administración</h1>
        <p className="admin-subtitle">Gestiona los módulos del sistema Cinema Royale</p>
      </div>

      <div className="admin-grid">
        {adminItems.map((item) => (
          <div className="admin-card" key={item.title} onClick={() => goTo(item.path)}>
            <div className="admin-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p className="admin-card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanelPage;