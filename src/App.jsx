import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import "./App.css";
import CardSpotlight from "./components/CardSpotlight";
import Cursor from "./components/Cursor";
import Footer from "./components/Footer";
import MouseTrail from "./components/MouseTrail";
import Navbar from "./components/Navbar";
import PageCurtain from "./components/PageCurtain";
import Preloader from "./components/Preloader";
import { NAV_ITEMS, SERVICES } from "./data/site";
import { initLenis, scrollToTop } from "./lib/smoothScroll";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import ContactUs from "./pages/ContactUs";
import FAQs from "./pages/FAQs";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";

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
  const [displayedNav, setDisplayedNav] = useState(activeNav);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    initLenis();
  }, []);

  // The curtain (below) covers the screen, then flips displayedNav so the
  // page swap happens while fully hidden, then reveals the new page — this
  // is what keeps the wipe transition from ever showing a mid-navigation
  // flash of the outgoing or incoming content.
  const handleCovered = useCallback(() => {
    setDisplayedNav(activeNav);
    scrollToTop();
  }, [activeNav]);

  const renderPage = (nav) => {
    switch (nav) {
      case "Home":
        return <Home setActiveNav={setActiveNav} />;
      case "Services":
      case "App Development":
      case "Web Development":
      case "UX/UI Design":
      case "Game Development":
        return <Services serviceName={nav} setActiveNav={setActiveNav} />;
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

  const pageContent =
    displayedNav === "Contact Us" ? (
      <ContactUs
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((enabled) => !enabled)}
      />
    ) : (
      renderPage(displayedNav)
    );

  return (
    <MotionConfig reducedMotion="user">
      <div className={`app-shell ${isDarkMode ? "is-dark" : ""}`}>
        <Preloader />
        <PageCurtain trigger={activeNav} onCovered={handleCovered} />
        <MouseTrail />
        <CardSpotlight />
        <Cursor />
        <Navbar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode((enabled) => !enabled)}
        />
        <main className="main-stage">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayedNav}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {pageContent}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer setActiveNav={setActiveNav} />
      </div>
    </MotionConfig>
  );
}
