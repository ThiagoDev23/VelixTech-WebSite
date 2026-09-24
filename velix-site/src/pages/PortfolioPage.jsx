import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import PortfolioCarousel from "../components/PortfolioCarousel.jsx";
import portfolioBg from "../assets/portfolio-bg.png";
import "./PortfolioPage.css";

const PLACEHOLDER_TEXT = "Ainda não temos projetos disponível no momento.";

export default function PortfolioPage() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Matches Safari's status bar / Dynamic Island tint to this page's own
  // (always white/light) background, same mechanism as HomePage's
  // per-section version.
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", "#ffffff");
  }, []);

  const measure = useCallback(() => {
    setScrolled(window.scrollY > 8);
    setIsMobile(window.innerWidth < 1024);
  }, []);

  // Desktop's navbar stays transparent over this page always (unchanged);
  // on mobile, once scrolled, it tints to the same white-translucent look
  // Sobre uses on the home page, per request.
  useEffect(() => {
    let raf = null;
    const schedule = () => {
      if (raf == null) raf = requestAnimationFrame(() => { raf = null; measure(); });
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [measure]);

  const mobileScrolled = scrolled && isMobile;

  return (
    <div className="portfolio-page">
      <Navbar
        theme="light"
        background={mobileScrolled ? "rgba(255,255,255,0.94)" : "transparent"}
        boxShadow={mobileScrolled ? "0 1px 24px rgba(0,0,0,0.18)" : "none"}
      />

      <section className="portfolio">
        <div className="portfolio__bgwrap">
          <img src={portfolioBg} alt="" className="portfolio__bg" />
        </div>

        <h1 className="portfolio__title">Nosso Portfólio</h1>

        <div className="portfolio__grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="portfolio__card">
              <div className="portfolio__card-inner">
                <span className="portfolio__card-text">{PLACEHOLDER_TEXT}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio__carousels">
          <PortfolioCarousel label="Web sites" slideCount={2} autoplayDelay={0} />
          <PortfolioCarousel label="Sistemas SaaS" slideCount={2} autoplayDelay={900} />
        </div>
      </section>

      <Footer variant="dark" />
    </div>
  );
}
