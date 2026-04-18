import "../../../styles/admin.css";

const AdminCard = ({ title, onClick }) => {
  return (
    <div className="admin-card" onClick={onClick}>
      
      <div className="admin-icon">🎬</div>

      <h3>{title}</h3>

    </div>
  );
};

export default AdminCard;