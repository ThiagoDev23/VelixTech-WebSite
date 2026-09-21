import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import "./LegalPage.css";

const DEFAULT_TITLE = "Velix Tech";
const DEFAULT_DESCRIPTION = "VELIX — Soluções tecnológicas para empresas. Websites, SaaS e gestão de tráfego.";

// Single-page app, so there's no per-route <title>/meta description from the
// server - set them here instead, and restore the site-wide defaults on
// unmount so navigating away doesn't leave a stale title/description behind.
function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content");
    meta?.setAttribute("content", description);
    return () => {
      document.title = DEFAULT_TITLE;
      if (previousDescription != null) meta?.setAttribute("content", previousDescription);
      else meta?.setAttribute("content", DEFAULT_DESCRIPTION);
    };
  }, [title, description]);
}

export default function LegalPage({ title, description, updated, children }) {
  usePageMeta(title, description);

  return (
    <div className="legal-page">
      {/* Solid background (unlike Portfolio's transparent one) because this
          page's body text scrolls directly underneath the fixed navbar -
          transparent would make the links unreadable against it. */}
      <Navbar theme="light" background="rgba(255,255,255,0.96)" boxShadow="0 1px 24px rgba(0,0,0,0.08)" />

      <main className="legal">
        <Link to="/" className="legal__back">
          ← Voltar para a página inicial
        </Link>

        <h1 className="legal__title">{title.split(" | ")[0]}</h1>
        <p className="legal__updated">Última atualização: {updated}</p>

        <div className="legal__content">{children}</div>

        <Link to="/" className="legal__back legal__back--bottom">
          ← Voltar para a página inicial
        </Link>
      </main>

      <Footer variant="dark" />
    </div>
  );
}
