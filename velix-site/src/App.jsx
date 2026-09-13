import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";

// Strip the trailing slash Vite's BASE_URL always includes ("/" or "/repo-name/")
// so react-router doesn't treat every route as nested under an extra slash.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </BrowserRouter>
  );
}
