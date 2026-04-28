import LoginForm from "../components/LoginForm";
import "../../../styles/auth.css";
import logo from "../../../assets/logo.jpeg";

const LoginPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-wrapper">

        {/* LOGO */}
        <div className="auth-logo">
          <img src={logo} alt="Cinema Royale" />
        </div>

        {/* FORM */}
        <LoginForm />

      </div>
    </div>
  );
};

export default LoginPage;