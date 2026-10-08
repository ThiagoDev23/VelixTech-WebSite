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
        {/* Two crossfading brand variants occupy the same spot (only one
            opacity:1 at a time via .is-visible) - inert keeps the hidden
            one both unclickable AND out of the keyboard/screen-reader tab
            order, instead of both silently being focusable at once. */}
        <div className={`navbar__brand navbar__brand--dark ${dark ? "is-visible" : ""}`} inert={!dark}>
          <button type="button" className="navbar__logo navbar__logo--dark" style={{ backgroundImage: `url(${logoWhite})` }} onClick={goHome} aria-label="VELIX — página inicial" />
          <button type="button" className="navbar__wordmark navbar__wordmark--dark" onClick={goHome} aria-label="VELIX — página inicial">VELIX</button>
        </div>
        <div className={`navbar__brand navbar__brand--light ${!dark ? "is-visible" : ""}`} inert={dark}>
          <button type="button" className="navbar__logo navbar__logo--light" style={{ backgroundImage: `url(${logoPurple})` }} onClick={goHome} aria-label="VELIX — página inicial" />
          <button type="button" className="navbar__wordmark navbar__wordmark--light" onClick={goHome} aria-label="VELIX — página inicial">VELIX</button>
        </div>

        <div className="navbar__inner">
          <nav className={`navbar__links ${dark ? "navbar__links--dark" : "navbar__links--light"}`} aria-label="Navegação principal">
            <button type="button" onClick={goHome}>HOME</button>
            <button type="button" onClick={goSobre}>SOBRE</button>
            <button type="button" onClick={goPortfolio}>PORTFÓLIO</button>
            <button type="button" onClick={goContato}>CONTATO</button>
          </nav>
        </div>

        <button
          type="button"
          className={`navbar__hamburger ${dark ? "navbar__hamburger--dark" : "navbar__hamburger--light"}`}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu-overlay"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* inert (not just opacity:0/pointer-events:none) so a keyboard user
          tabbing through the closed page can't silently land on invisible
          links/buttons here before ever reaching Hero/Sobre - without it,
          every control below stayed focusable even while fully hidden. */}
      <div
        id="mobile-menu-overlay"
        className={`menu-overlay ${menuOpen ? "is-open" : ""}`}
        style={{ "--menu-bg": `url(${contactBg})` }}
        inert={!menuOpen}
      >
        <div className="menu-overlay__header">
          <button type="button" className="navbar__logo navbar__logo--dark" style={{ backgroundImage: `url(${logoWhite})` }} onClick={() => handleMenuNav(goHome)} aria-label="VELIX — página inicial" />
          <button type="button" className="menu-overlay__close" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}>
            <span />
            <span />
          </button>
        </div>

        <nav className="menu-overlay__links" aria-label="Navegação principal">
          <button type="button" onClick={() => handleMenuNav(goHome)}>HOME</button>
          <button type="button" onClick={() => handleMenuNav(goSobre)}>SOBRE</button>
          <button type="button" onClick={() => handleMenuNav(goPortfolio)}>PORTFÓLIO</button>
          <button type="button" onClick={() => handleMenuNav(goContato)}>CONTATO</button>
        </nav>

        <div className="menu-overlay__social">
          <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="menu-overlay__icon menu-overlay__icon--tiktok" style={{ WebkitMaskImage: `url(${tiktokIcon})`, maskImage: `url(${tiktokIcon})` }} aria-label="Abrir o TikTok da VELIX em uma nova aba" />
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="menu-overlay__icon menu-overlay__icon--instagram" style={{ WebkitMaskImage: `url(${instagramIcon})`, maskImage: `url(${instagramIcon})` }} aria-label="Abrir o Instagram da VELIX em uma nova aba" />
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="menu-overlay__icon menu-overlay__icon--linkedin" style={{ WebkitMaskImage: `url(${linkedinIcon})`, maskImage: `url(${linkedinIcon})` }} aria-label="Abrir o LinkedIn da VELIX em uma nova aba" />
        </div>
      </div>
    </>
  );
}
