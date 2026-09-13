import { forwardRef, useState } from "react";
import tracosBg from "../assets/tracos-bg.png";
import office from "../assets/office.jpg";
import windowDots from "../assets/window-dots.png";
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

const Sobre = forwardRef(function Sobre(_props, ref) {
  const [open, setOpen] = useState(null);

  return (
    <section ref={ref} id="sobre" className="sobre">
      <div className="sobre__bgwrap">
        <img src={tracosBg} alt="" className="sobre__bg" aria-hidden="true" />
      </div>

      <div className="sobre__inner">
        <div className="sobre__cards">
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              className="card"
              onClick={() => setOpen((prev) => (prev === i ? null : i))}
            >
              <div className="card__bar" style={{ backgroundImage: `url(${windowDots})` }} />
              <span className="card__title">{card.title}</span>
              <span className="card__short">{card.short}</span>

              <div className={`card__overlay ${card.longVariant === "bottom" ? "card__overlay--bottom" : ""} ${open === i ? "is-open" : ""}`}>
                <div className="card__bar card__bar--overlay" style={{ backgroundImage: `url(${windowDots})` }} />
                <span className="card__long">{card.long}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="sobre__photo" style={{ backgroundImage: `url(${office})` }} />
      </div>
    </section>
  );
});

export default Sobre;
