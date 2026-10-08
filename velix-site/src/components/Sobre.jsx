import { forwardRef, useEffect, useRef, useState } from "react";
import tracosBg from "../assets/tracos-bg.png";
import tracosBgMobile from "../assets/tracos-bg-mobile.png";
import office from "../assets/office.jpg";
import officeMobile from "../assets/office-mobile.jpg";
import windowDots from "../assets/window-dots.png";
import { prefersReducedMotion } from "../utils/motion.js";
import "./Sobre.css";

const CARDS = [
  {
    title: "Quem somos ?",
    short: (
      <>
        Somos a <span className="card__brand">ＶＥＬＩＸ</span>, construímos tecnologia para impulsionar negócios.
      </>
    ),
    long: "Uma startup focada no desenvolvimento de soluções tecnológicas para o crescimento de diferentes empresas. Criamos websites, modelos SaaS, automações e soluções digitais personalizadas e escaláveis para o seu negócio, unindo tecnologia e inovação dentro de um ecossistema feito para gerar eficiência, performance e principalmente crescimento para nossos clientes.",
    longVariant: "bottom",
  },
  {
    title: "Web site service",
    short: "Uma Landing page para transformar de uma vez por todas seu negócio no digital.",
    long: "Desenvolvemos landing pages estratégicas e personalizadas para empresas que buscam fortalecer sua presença digital, apresentar seus serviços e transformar visitantes em novos clientes.",
  },
  {
    title: "SaaS service",
    short: "Sistemas via assinatura para alavancar seu negócio.",
    long: "Desenvolvemos sistemas SaaS personalizados, sistemas voltados para empresas que buscam otimizar processos e transformar necessidades em soluções tecnológicas acessíveis e eficientes. Por meio de uma assinatura, ofereça acesso a ferramentas e plataformas completas para seus clientes.",
  },
  {
    title: "Gestão de Tráfego",
    short: "Tráfego pago para levar os resultados da sua empresa para outro nível.",
    long: "Criamos campanhas personalizadas e orientadas por dados, utilizando plataformas de anúncios para levar sua empresa até pessoas com maior potencial de se tornarem clientes, unindo estratégia, análise e otimização contínua para gerar mais alcance, performance e principalmente resultados.",
  },
];

// Staggered per card index, so they reveal one after another instead of
// all snapping in at once.
const REVEAL_DELAYS_MS = [0, 90, 180, 270];
const PHOTO_REVEAL_DELAY_MS = 150;

const Sobre = forwardRef(function Sobre(_props, ref) {
  const [open, setOpen] = useState(null);
  const revealRefs = useRef([]);

  useEffect(() => {
    const targets = revealRefs.current.filter(Boolean);
    if (targets.length === 0) return;

    // Reduced motion, or no IntersectionObserver support (very old
    // browsers): skip the scroll-triggered reveal entirely and show
    // everything immediately - otherwise content would be stuck at
    // opacity:0 with nothing left to ever make it visible.
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          // One-time reveal - once shown, stays shown on scroll-up instead
          // of re-animating every time it crosses the viewport edge.
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="sobre" className="sobre">
      <div className="sobre__bgwrap">
        <picture>
          <source media="(max-width: 1023px)" srcSet={tracosBgMobile} />
          <img src={tracosBg} alt="" className="sobre__bg" aria-hidden="true" />
        </picture>
      </div>

      <div className="sobre__inner">
        <div className="sobre__cards">
          {CARDS.map((card, i) => {
            const isOpen = open === i;
            const panelId = `card-panel-${i}`;
            return (
              <button
                key={card.title}
                ref={(el) => {
                  revealRefs.current[i] = el;
                }}
                type="button"
                className="card"
                style={{ "--reveal-delay": `${REVEAL_DELAYS_MS[i] ?? 0}ms` }}
                onClick={() => setOpen((prev) => (prev === i ? null : i))}
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-label={`${card.title} — ${isOpen ? "recolher detalhes" : "ver mais detalhes"}`}
              >
                <div className="card__bar" style={{ backgroundImage: `url(${windowDots})` }} aria-hidden="true" />
                <span className="card__title" aria-hidden="true">{card.title}</span>
                <span className="card__short" aria-hidden="true">{card.short}</span>

                {/* aria-hidden so a screen reader doesn't read this text while
                    it's visually collapsed (opacity:0) - previously both the
                    short and long copy were always exposed regardless of
                    toggle state, since only aria-label now carries the name. */}
                <div
                  id={panelId}
                  className={`card__overlay ${card.longVariant === "bottom" ? "card__overlay--bottom" : ""} ${isOpen ? "is-open" : ""}`}
                  aria-hidden={!isOpen}
                >
                  <div className="card__bar card__bar--overlay" style={{ backgroundImage: `url(${windowDots})` }} aria-hidden="true" />
                  <span className="card__long">{card.long}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div
          ref={(el) => {
            revealRefs.current[CARDS.length] = el;
          }}
          className="sobre__photo"
          style={{
            "--photo-desktop": `url(${office})`,
            "--photo-mobile": `url(${officeMobile})`,
            "--reveal-delay": `${PHOTO_REVEAL_DELAY_MS}ms`,
          }}
        />
      </div>
    </section>
  );
});

export default Sobre;
