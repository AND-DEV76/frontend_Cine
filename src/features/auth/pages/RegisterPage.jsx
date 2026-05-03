import RegisterForm from "../components/RegisterForm";
import "../../../styles/auth.css";
import logo from "../../../assets/logo.png";

const RegisterPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-wrapper">

        {/* LOGO */}
        <div className="auth-logo">
          <img src={logo} alt="Cinema Royale" />
        </div>

        {/* FORM */}
        <RegisterForm />

      </div>
    </div>
  );
};

export default RegisterPage;