import tiktokBlack from "../assets/social-tiktok.png";
import linkedinBlack from "../assets/social-linkedin.png";
import tiktokWhite from "../assets/social-c-white.png";
import instagramWhite from "../assets/social-b-white.png";
import linkedinWhite from "../assets/social-linkedin-white.png";
import instagramSvg from "../assets/social-instagram.svg";
import "./Footer.css";

const LINKS = {
  tiktok: "https://www.tiktok.com/@velixtech_",
  instagram: "https://www.instagram.com/velix_tech",
  linkedin: "https://www.linkedin.com/in/velix-tech-821768428/",
};

// variant: "light" (white bg / black icons, home) | "dark" (black bg / white icons, portfolio)
export default function Footer({ variant = "light", forwardedRef }) {
  const icons =
    variant === "dark"
      ? { tiktok: tiktokWhite, instagram: instagramWhite, linkedin: linkedinWhite }
      : { tiktok: tiktokBlack, instagram: instagramSvg, linkedin: linkedinBlack };

  return (
    <footer ref={forwardedRef} className={`footer footer--${variant}`}>
      <div className="footer__social">
        <a href={LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="footer__icon" style={{ WebkitMaskImage: `url(${icons.tiktok})`, maskImage: `url(${icons.tiktok})` }} aria-label="TikTok" />
        <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="footer__icon" style={{ WebkitMaskImage: `url(${icons.instagram})`, maskImage: `url(${icons.instagram})` }} aria-label="Instagram" />
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="footer__icon" style={{ WebkitMaskImage: `url(${icons.linkedin})`, maskImage: `url(${icons.linkedin})` }} aria-label="LinkedIn" />
      </div>
      <span className="footer__copy">
        <span className="footer__wordmark">ＶＥＬＩＸ</span> © 2026
      </span>
    </footer>
  );
}
