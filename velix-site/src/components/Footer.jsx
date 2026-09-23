import { Link } from "react-router-dom";
import tiktokIcon from "../assets/social-c-white.png";
import instagramIcon from "../assets/social-b-white.png";
import linkedinIcon from "../assets/social-linkedin-white.png";
import "./Footer.css";

const LINKS = {
  tiktok: "https://www.tiktok.com/@velixtech_",
  instagram: "https://www.instagram.com/velix_tech",
  linkedin: "https://www.linkedin.com/in/velix-tech-821768428/",
};

// Both footers mask the same uniformly-sized icon set (from the portfolio
// footer's assets) and just recolor via background-color, so the two
// footers always match in size/spacing regardless of variant.
const icons = { tiktok: tiktokIcon, instagram: instagramIcon, linkedin: linkedinIcon };

// variant: "light" (white bg / black icons, home) | "dark" (black bg / white icons, portfolio)
export default function Footer({ variant = "light", forwardedRef }) {
  return (
    <footer ref={forwardedRef} className={`footer footer--${variant}`}>
      <div className="footer__social">
        <a href={LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="footer__icon footer__icon--tiktok" style={{ WebkitMaskImage: `url(${icons.tiktok})`, maskImage: `url(${icons.tiktok})` }} aria-label="TikTok" />
        <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="footer__icon footer__icon--instagram" style={{ WebkitMaskImage: `url(${icons.instagram})`, maskImage: `url(${icons.instagram})` }} aria-label="Instagram" />
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="footer__icon footer__icon--linkedin" style={{ WebkitMaskImage: `url(${icons.linkedin})`, maskImage: `url(${icons.linkedin})` }} aria-label="LinkedIn" />
      </div>
      <span className="footer__copy">
        <span className="footer__wordmark">ＶＥＬＩＸ</span> © 2026
      </span>

      <nav className="footer__legal">
        <Link to="/politica-de-privacidade.html">Política de Privacidade</Link>
        <span className="footer__legal-sep" aria-hidden="true">·</span>
        <Link to="/termos-de-uso.html">Termos de Uso</Link>
      </nav>
    </footer>
  );
}
