import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import portfolioBg from "../assets/portfolio-bg.png";
import "./PortfolioPage.css";

const PLACEHOLDER_TEXT = "Ainda não temos projetos disponível no momento.";

export default function PortfolioPage() {
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
      </section>

      <Footer variant="dark" />
    </div>
  );
}
