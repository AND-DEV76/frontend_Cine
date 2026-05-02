import "../../../styles/admin.css";
import AdminCard from "../components/AdminCard";

const goTo = (path) => {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("popstate"));
};

const AdminPanelPage = () => {
  return (
    <div className="admin-container">

      <div className="admin-grid">
        <AdminCard
          title="Usuarios"
          onClick={() => goTo("/admin/usuarios")}
        />


        <AdminCard
          title="Película"
          onClick={() => goTo("/admin/generos")}
        />

        <AdminCard
  title="Clasificación"
  onClick={() => goTo("/admin/clasificaciones")}
/>

<AdminCard
  title="Salas"
  onClick={() => goTo("/admin/salas")}
/>
      </div>

    </div>
  );
};

export default AdminPanelPage;