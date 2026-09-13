import { forwardRef, useEffect, useRef } from "react";
import heroVideo from "../assets/hero-bg.mp4";
import heroPoster from "../assets/hero-bg.png";
import "./Hero.css";

const Hero = forwardRef(function Hero(_props, ref) {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.loop = true;
    const play = () => {
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };
    const onEnded = () => {
      v.currentTime = 0;
      play();
    };
    const onPause = () => {
      if (!v.seeking && v.currentTime >= v.duration - 0.05) {
        v.currentTime = 0;
        play();
      }
    };
    v.addEventListener("ended", onEnded);
    v.addEventListener("pause", onPause);
    play();
    return () => {
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <section ref={ref} id="hero" className="hero">
      <video
        ref={videoRef}
        src={heroVideo}
        poster={heroPoster}
        autoPlay
        muted
        loop
        playsInline
        className="hero__video"
      />
      <h1 className="hero__title">
        Soluções Tecnológicas
        <br />
        para empresas.
      </h1>
      <p className="hero__subtitle">
        Faça seu website construindo experiência para o próximo nível e aumente sua produtividade.
      </p>
    </section>
  );
});

export default Hero;
