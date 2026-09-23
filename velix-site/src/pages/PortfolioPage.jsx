import { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import PortfolioCarousel from "../components/PortfolioCarousel.jsx";
import portfolioBg from "../assets/portfolio-bg.png";
import "./PortfolioPage.css";

const PLACEHOLDER_TEXT = "Ainda não temos projetos disponível no momento.";

export default function PortfolioPage() {
  // Matches Safari's status bar / Dynamic Island tint to this page's own
  // (always white/light) background, same mechanism as HomePage's
  // per-section version.
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", "#ffffff");
  }, []);

  return (
    <div className="portfolio-page">
      <Navbar theme="light" background="transparent" boxShadow="none" />

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
