import { useNavigate, useLocation } from "react-router-dom";
import logoWhite from "../assets/logo-icon-white-330.png";
import logoPurple from "../assets/logo-icon-purple-330.png";
import "./Navbar.css";

// theme: "dark" -> white wordmark/icon (for dark sections), "light" -> purple wordmark/icon
export default function Navbar({ theme = "light", background = "transparent", boxShadow = "none", onHome, onSobre, onContato }) {
  const navigate = useNavigate();
  const location = useLocation();

  const goHome = () => {
    if (onHome) return onHome();
    if (location.pathname !== "/") navigate("/");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goSobre = () => {
    if (onSobre) return onSobre();
    navigate("/", { state: { scrollTo: "sobre" } });
  };

  const goPortfolio = () => {
    navigate("/portfolio");
    window.scrollTo({ top: 0 });
  };

  const goContato = () => {
    if (onContato) return onContato();
    navigate("/", { state: { scrollTo: "contato" } });
  };

  const dark = theme === "dark";

  return (
    <div className="navbar" style={{ background, boxShadow }}>
      <div className={`navbar__brand navbar__brand--dark ${dark ? "is-visible" : ""}`}>
        <div className="navbar__logo navbar__logo--dark" style={{ backgroundImage: `url(${logoWhite})` }} onClick={goHome} />
        <span className="navbar__wordmark navbar__wordmark--dark" onClick={goHome}>ＶＥＬＩＸ</span>
      </div>
      <div className={`navbar__brand navbar__brand--light ${!dark ? "is-visible" : ""}`}>
        <div className="navbar__logo navbar__logo--light" style={{ backgroundImage: `url(${logoPurple})` }} onClick={goHome} />
        <span className="navbar__wordmark navbar__wordmark--light" onClick={goHome}>ＶＥＬＩＸ</span>
      </div>

      <div className="navbar__inner">
        <nav className={`navbar__links ${dark ? "navbar__links--dark" : "navbar__links--light"}`}>
          <span onClick={goHome}>HOME</span>
          <span onClick={goSobre}>SOBRE</span>
          <span onClick={goPortfolio}>PORTFOLIO</span>
          <span onClick={goContato}>CONTATO</span>
        </nav>
      </div>
    </div>
  );
}
