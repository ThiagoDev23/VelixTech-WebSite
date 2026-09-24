import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoWhite from "../assets/logo-icon-white-330.png";
import logoPurple from "../assets/logo-icon-purple-330.png";
import contactBg from "../assets/contact-bg.png";
import tiktokIcon from "../assets/social-c-white.png";
import instagramIcon from "../assets/social-b-white.png";
import linkedinIcon from "../assets/social-linkedin-white.png";
import "./Navbar.css";

const SOCIAL_LINKS = {
  tiktok: "https://www.tiktok.com/@velixtech_",
  instagram: "https://www.instagram.com/velix_tech",
  linkedin: "https://www.linkedin.com/in/velix-tech-821768428/",
};

// theme: "dark" -> white wordmark/icon (for dark sections), "light" -> purple wordmark/icon
export default function Navbar({ theme = "light", background = "transparent", boxShadow = "none", onHome, onSobre, onContato }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const goHome = () => {
    if (onHome) return onHome();
    if (location.pathname !== "/") {
      // A route change doesn't reset the browser's own scroll position, so
      // without this, arriving from a scrolled-down Portfolio page lands
      // partway down Home instead of at the top.
      window.scrollTo(0, 0);
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

  const handleMenuNav = (fn) => {
    setMenuOpen(false);
    fn();
  };

  return (
    <>
      <div className="navbar" style={{ background, boxShadow }}>
        <div className={`navbar__brand navbar__brand--dark ${dark ? "is-visible" : ""}`}>
          <div className="navbar__logo navbar__logo--dark" style={{ backgroundImage: `url(${logoWhite})` }} onClick={goHome} />
          <span className="navbar__wordmark navbar__wordmark--dark" onClick={goHome}>VELIX</span>
        </div>
        <div className={`navbar__brand navbar__brand--light ${!dark ? "is-visible" : ""}`}>
          <div className="navbar__logo navbar__logo--light" style={{ backgroundImage: `url(${logoPurple})` }} onClick={goHome} />
          <span className="navbar__wordmark navbar__wordmark--light" onClick={goHome}>VELIX</span>
        </div>

        <div className="navbar__inner">
          <nav className={`navbar__links ${dark ? "navbar__links--dark" : "navbar__links--light"}`}>
            <span onClick={goHome}>HOME</span>
            <span onClick={goSobre}>SOBRE</span>
            <span onClick={goPortfolio}>PORTFÓLIO</span>
            <span onClick={goContato}>CONTATO</span>
          </nav>
        </div>

        <button
          type="button"
          className={`navbar__hamburger ${dark ? "navbar__hamburger--dark" : "navbar__hamburger--light"}`}
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`menu-overlay ${menuOpen ? "is-open" : ""}`} style={{ "--menu-bg": `url(${contactBg})` }}>
        <div className="menu-overlay__header">
          <div className="navbar__logo navbar__logo--dark" style={{ backgroundImage: `url(${logoWhite})` }} onClick={() => handleMenuNav(goHome)} />
          <button type="button" className="menu-overlay__close" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}>
            <span />
            <span />
          </button>
        </div>

        <nav className="menu-overlay__links">
          <span onClick={() => handleMenuNav(goHome)}>HOME</span>
          <span onClick={() => handleMenuNav(goSobre)}>SOBRE</span>
          <span onClick={() => handleMenuNav(goPortfolio)}>PORTFÓLIO</span>
          <span onClick={() => handleMenuNav(goContato)}>CONTATO</span>
        </nav>

        <div className="menu-overlay__social">
          <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="menu-overlay__icon menu-overlay__icon--tiktok" style={{ WebkitMaskImage: `url(${tiktokIcon})`, maskImage: `url(${tiktokIcon})` }} aria-label="TikTok" />
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="menu-overlay__icon menu-overlay__icon--instagram" style={{ WebkitMaskImage: `url(${instagramIcon})`, maskImage: `url(${instagramIcon})` }} aria-label="Instagram" />
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="menu-overlay__icon menu-overlay__icon--linkedin" style={{ WebkitMaskImage: `url(${linkedinIcon})`, maskImage: `url(${linkedinIcon})` }} aria-label="LinkedIn" />
        </div>
      </div>
    </>
  );
}
