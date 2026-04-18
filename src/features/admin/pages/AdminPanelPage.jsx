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
      </div>

    </div>
  );
};

export default AdminPanelPage;