import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Sobre from "../components/Sobre.jsx";
import Contato from "../components/Contato.jsx";
import Footer from "../components/Footer.jsx";

const NAV_POINT = 40; // roughly the vertical center of the 76px fixed navbar

export default function HomePage() {
  const heroRef = useRef(null);
  const sobreRef = useRef(null);
  const contatoRef = useRef(null);
  const footerRef = useRef(null);

  const [theme, setTheme] = useState("dark");
  const [scrolled, setScrolled] = useState(false);
  const [inContato, setInContato] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const measure = useCallback(() => {
    const sections = [
      { theme: "dark", ref: heroRef },
      { theme: "light", ref: sobreRef },
      { theme: "dark", ref: contatoRef, isContato: true },
      { theme: "light", ref: footerRef },
    ];
    let current = sections[0];
    for (const s of sections) {
      const el = s.ref.current;
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= NAV_POINT) current = s;
      if (rect.top <= NAV_POINT && rect.bottom > NAV_POINT) break;
    }
    setTheme(current.theme);
    setInContato(!!current.isContato);
    setScrolled(window.scrollY > 8);
  }, []);

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

  // Scrolls so the footer's bottom lines up with the viewport bottom
  // (fully revealing it). Native scrollIntoView instead of computing a
  // pixel target from a single window.innerHeight snapshot - mobile
  // browsers resize the viewport mid-scroll as their address bar
  // collapses, which made a precomputed target land short of the
  // footer on phones even though the same math checked out on desktop
  // and in a fixed-viewport test. .contato's min-height guarantees
  // Contato + Footer together are always at least one viewport tall,
  // so this never needs to scroll back up into Sobre.
  const scrollToContato = useCallback(() => {
    footerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;
    requestAnimationFrame(() => {
      if (target === "contato") scrollToContato();
      else if (target === "sobre") sobreRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    navigate(".", { replace: true, state: {} });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const navBg = !scrolled || inContato ? "transparent" : theme === "dark" ? "rgba(22,10,30,0.92)" : "rgba(255,255,255,0.94)";
  const navShadow = scrolled && !inContato ? "0 1px 24px rgba(0,0,0,0.18)" : "none";

  return (
    <div className="home">
      <Navbar
        theme={theme}
        background={navBg}
        boxShadow={navShadow}
        onHome={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onSobre={() => sobreRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
        onContato={scrollToContato}
      />
      <Hero ref={heroRef} />
      <Sobre ref={sobreRef} />
      <Contato ref={contatoRef} />
      <Footer variant="light" forwardedRef={footerRef} />
    </div>
  );
}
