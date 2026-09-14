import { useEffect, useState } from "react";
import "../App.css";
import { NAV_ITEMS, SERVICES } from "../data/site";

export default function Navbar({ activeNav, setActiveNav }) {
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
      <header
        className={`site-header ${isScrolled ? "is-scrolled" : ""}`}
      >
        <div className="navbar-frame">
          <a
            className="brand"
            href="#home"
            aria-label="OpusGeeks"
            onClick={() => goTo("Home")}
          >
            <span className="brand-mark">
              <svg
                viewBox="0 0 100 100"
                className="brand-svg"
                aria-hidden="true"
              >
                <path
                  d="M50 10 C 25 10, 10 30, 10 50 C 10 70, 25 90, 50 90 C 70 90, 85 75, 85 50 L 50 50 L 50 62 L 72 62 C 68 74, 58 80, 48 80 C 30 80, 22 65, 22 50 C 22 35, 30 20, 48 20 C 60 20, 70 27, 74 36 L 86 28 C 78 17, 65 10, 50 10 Z"
                  fill="url(#og-gradient)"
                />
                <defs>
                  <linearGradient
                    id="og-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="55%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#2dd4bf" />
                  </linearGradient>
                </defs>
              </svg>
            </span>

            <span className="brand-copy">
              <span className="brand-primary">OPUS</span>
              <span className="brand-secondary">GEEKS</span>
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
            <a
              className="cta-button"
              href="#contact"
              onClick={() => goTo("Contact Us")}
            >
              <span className="cta-button-glass">
                <span>Get Started</span>
              </span>
            </a>

            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={
                mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
              }
              aria-expanded={mobileMenuOpen}
            >
              <span className={`burger-icon ${mobileMenuOpen ? "is-open" : ""}`}>
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
            </div>
          </div>
        )}
      </header>
    </>
  );
}
