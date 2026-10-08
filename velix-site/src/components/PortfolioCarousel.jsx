import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../utils/motion.js";
import "./PortfolioCarousel.css";

const PLACEHOLDER_TEXT = "Ainda não temos projetos disponível no momento.";
const AUTOPLAY_MS = 4200;
const TOUCH_PAUSE_MS = 6000;

export default function PortfolioCarousel({ label, slideCount = 2, autoplayDelay = 0 }) {
  const trackRef = useRef(null);
  const activeRef = useRef(0);
  const lastTouchRef = useRef(0);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((i) => {
    const track = trackRef.current;
    const slide = track?.children[i];
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = null;
    const onScroll = () => {
      if (raf != null) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        let closest = 0;
        let min = Infinity;
        Array.from(track.children).forEach((child, i) => {
          const d = Math.abs(child.offsetLeft - track.scrollLeft);
          if (d < min) {
            min = d;
            closest = i;
          }
        });
        setActive(closest);
      });
    };
    const onTouch = () => {
      lastTouchRef.current = Date.now();
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("touchstart", onTouch, { passive: true });
    track.addEventListener("pointerdown", onTouch);
    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("touchstart", onTouch);
      track.removeEventListener("pointerdown", onTouch);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    // An indefinitely auto-advancing carousel is exactly the kind of motion
    // this preference exists to opt out of - skip starting it entirely.
    if (prefersReducedMotion()) return;
    let intervalId = null;
    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        if (document.hidden) return;
        if (Date.now() - lastTouchRef.current < TOUCH_PAUSE_MS) return;
        scrollToIndex((activeRef.current + 1) % slideCount);
      }, AUTOPLAY_MS);
    }, autoplayDelay);
    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoplayDelay, slideCount, scrollToIndex]);

  return (
    <div className="pcarousel" role="region" aria-roledescription="carrossel" aria-label={label}>
      <div className="pcarousel__header">
        <span className="pcarousel__label">{label}</span>
        {/* Redundant with each slide's own "n de N" aria-label below and
            with the dots' aria-current - hidden from AT so position isn't
            announced three times over for the same information. */}
        <span className="pcarousel__counter" aria-hidden="true">
          {String(active + 1).padStart(2, "0")} / {String(slideCount).padStart(2, "0")}
        </span>
      </div>

      <div className="pcarousel__track" ref={trackRef}>
        {Array.from({ length: slideCount }).map((_, i) => (
          <div key={i} className="pcarousel__slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} de ${slideCount}`}>
            <div className="pcarousel__slide-inner">
              <span className="pcarousel__slide-text">{PLACEHOLDER_TEXT}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pcarousel__dots">
        {Array.from({ length: slideCount }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={`pcarousel__dot ${i === active ? "is-active" : ""}`}
            aria-label={`Ir para o slide ${i + 1} de ${slideCount}`}
            aria-current={i === active ? "true" : undefined}
            onClick={() => scrollToIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
