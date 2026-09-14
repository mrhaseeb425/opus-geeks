import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import FAQs from "./pages/FAQs";
import { NAV_ITEMS, SERVICES } from "./data/site";

// Map every URL hash slug (e.g. "app-development") to the nav label the app
// renders for it, so a direct link like /#contact or /#web-development opens
// the right page instead of always falling back to Home.
const HASH_TO_LABEL = {
  services: "Services",
  ...Object.fromEntries(NAV_ITEMS.map((item) => [item.hash, item.label])),
  ...Object.fromEntries(SERVICES.map((s) => [s.hash, s.name])),
};

const LABEL_TO_HASH = Object.fromEntries(
  Object.entries(HASH_TO_LABEL).map(([hash, label]) => [label, hash]),
);

function labelFromHash() {
  if (typeof window === "undefined") return "Home";
  const slug = window.location.hash.replace("#", "");
  return HASH_TO_LABEL[slug] || "Home";
}

export default function App() {
  const [activeNav, setActiveNavState] = useState(labelFromHash);

  // Keep in sync with browser back/forward and any direct link navigation.
  useEffect(() => {
    const handleHashChange = () => setActiveNavState(labelFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Wrap the setter so programmatic navigation (nav clicks, in-page CTAs)
  // also updates the URL hash, keeping links shareable and bookmarkable.
  const setActiveNav = useCallback((label) => {
    setActiveNavState(label);
    const hash = LABEL_TO_HASH[label];
    if (hash && typeof window !== "undefined") {
      const url = `${window.location.pathname}${window.location.search}#${hash}`;
      window.history.pushState(null, "", url);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeNav]);

  const renderPage = () => {
    switch (activeNav) {
      case "Home":
        return <Home setActiveNav={setActiveNav} />;
      case "Services":
      case "App Development":
      case "Web Development":
      case "UX/UI Design":
      case "Game Development":
        return <Services serviceName={activeNav} setActiveNav={setActiveNav} />;
      case "Portfolio":
        return <Portfolio setActiveNav={setActiveNav} />;
      case "Blogs":
        return <Blogs />;
      case "About":
        return <About setActiveNav={setActiveNav} />;
      case "Contact Us":
        return <ContactUs />;
      case "FAQs":
        return <FAQs setActiveNav={setActiveNav} />;
      default:
        return <Home setActiveNav={setActiveNav} />;
    }
  };

  return (
    <div className="app-shell">
      <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      <main className="main-stage">{renderPage()}</main>
      <Footer setActiveNav={setActiveNav} />
    </div>
  );
}
