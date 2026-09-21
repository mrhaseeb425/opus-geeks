import { useEffect, useState } from "react";
import "../App.css";
import { NAV_ITEMS, SERVICES } from "../data/site";
import Icon from "./Icon";
import Magnetic from "./Magnetic";

export default function Navbar({
  activeNav,
  setActiveNav,
  isDarkMode,
  onToggleDarkMode,
}) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Give the header a tighter, more solid look once the page scrolls past it.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isServicesActive =
    activeNav === "Services" || SERVICES.some((s) => s.name === activeNav);

  const goTo = (label) => {
    setActiveNav(label);
    setIsServicesOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="navbar-frame">
          <a
            className="brand"
            href="#home"
            aria-label="OpusGeeks"
            onClick={() => goTo("Home")}
          >
            <span className="brand-logo-wrap">
              <img className="brand-logo" src="/logo.png" alt="OpusGeeks" />
            </span>
          </a>

          <nav className="desktop-menu" aria-label="Main navigation">
            <div className="desktop-link-list">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={`#${item.hash}`}
                  className={`nav-link ${activeNav === item.label ? "active" : ""}`}
                  onClick={() => goTo(item.label)}
                >
                  <span>{item.label}</span>
                </a>
              ))}

              <div
                className="services-menu-wrap"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <a
                  href="#services"
                  className={`nav-link service-trigger ${isServicesActive ? "active" : ""}`}
                  onClick={(event) => {
                    event.preventDefault();
                    if (isServicesOpen) {
                      goTo("Services");
                    } else {
                      setIsServicesOpen(true);
                    }
                  }}
                  aria-expanded={isServicesOpen}
                >
                  <span>Services</span>
                  <svg
                    className="service-caret"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 7l5 5 5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </a>

                {isServicesOpen && (
                  <div className="service-dropdown">
                    <div className="service-dropdown-grid">
                      {SERVICES.map((service, index) => (
                        <a
                          key={service.name}
                          href={`#${service.hash}`}
                          className="service-option"
                          onClick={() => goTo(service.name)}
                        >
                          <span className="service-option-row">
                            <span className="service-index">0{index + 1}</span>
                            <span className="service-content">
                              <span className="service-name">
                                {service.name}
                              </span>
                              <span className="service-detail">
                                {service.detail}
                              </span>
                            </span>
                            <svg
                              className="service-arrow"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                d="M4 12h16M14 4l8 8-8 8"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                            </svg>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>

          <div className="nav-actions">
            <button
              className={`header-theme-toggle ${isDarkMode ? "is-light" : ""}`}
              type="button"
              onClick={onToggleDarkMode}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              aria-pressed={isDarkMode}
            >
              <span className="theme-toggle-track" aria-hidden="true">
                <span className="theme-toggle-thumb">
                  <Icon name={isDarkMode ? "sun" : "moon"} />
                </span>
              </span>
            </button>

            <Magnetic strength={0.25}>
              <a
                className="cta-button"
                href="#contact"
                onClick={() => goTo("Contact Us")}
              >
                <span className="cta-button-glass">
                  <span>Get Started</span>
                </span>
              </a>
            </Magnetic>

            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={
                mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
              }
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`burger-icon ${mobileMenuOpen ? "is-open" : ""}`}
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-panel">
            <div className="mobile-panel-content">
              <button
                className="mobile-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>

              {NAV_ITEMS.slice(0, 1)
                .concat([{ label: "Services", hash: "services" }])
                .concat(NAV_ITEMS.slice(1))
                .map((item, index) => (
                  <a
                    key={item.label}
                    href={`#${item.hash}`}
                    className={`mobile-nav-link ${activeNav === item.label ? "active" : ""}`}
                    style={{ "--stagger-index": index }}
                    onClick={() => goTo(item.label)}
                  >
                    <span>{item.label}</span>
                    {item.label === "Services" && (
                      <svg
                        className="service-caret"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 7l5 5 5-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                  </a>
                ))}

              <div className="mobile-services">
                {SERVICES.map((service) => (
                  <a
                    key={service.name}
                    href={`#${service.hash}`}
                    className="mobile-service-link"
                    onClick={() => goTo(service.name)}
                  >
                    <span>{service.name}</span>
                    <svg
                      className="service-arrow"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 12h16M14 4l8 8-8 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </a>
                ))}
              </div>

              <a
                className="mobile-cta-button"
                href="#contact"
                onClick={() => goTo("Contact Us")}
              >
                <span>Start a project</span>
              </a>

              <button
                className={`mobile-theme-toggle ${isDarkMode ? "is-light" : ""}`}
                type="button"
                onClick={onToggleDarkMode}
                aria-pressed={isDarkMode}
              >
                <span className="theme-toggle-track" aria-hidden="true">
                  <span className="theme-toggle-thumb">
                    <Icon name={isDarkMode ? "sun" : "moon"} />
                  </span>
                </span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
