import { FiChevronRight, FiHome } from "react-icons/fi";
import "../styles/breadcrumb.css";

const Breadcrumb = ({ items = [] }) => {
  const goTo = (path) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <nav className="breadcrumb" aria-label="Navegación">
      <span className="breadcrumb__item breadcrumb__item--link" onClick={() => goTo("/admin")}>
        <FiHome className="breadcrumb__home-icon" />
        Admin
      </span>
      {items.map((item, idx) => (
        <span key={idx} className="breadcrumb__segment">
          <FiChevronRight className="breadcrumb__separator" />
          {item.path ? (
            <span className="breadcrumb__item breadcrumb__item--link" onClick={() => goTo(item.path)}>
              {item.label}
            </span>
          ) : (
            <span className="breadcrumb__item breadcrumb__item--active">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
