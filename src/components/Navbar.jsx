import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS, SERVICES } from "../data/site";
import Icon from "./Icon";

function Caret() {
  return (
    <svg className="service-caret" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M5 7l5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function Arrow() {
  return (
    <svg className="service-arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 12h16M14 4l8 8-8 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function Navbar({
  activeNav,
  setActiveNav,
  isDarkMode,
  onToggleDarkMode,
}) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const servicesRef = useRef(null);

  // Give the header a more solid look once the page scrolls past it.
  // Passive + one read per animation frame, so scrolling never waits on JS.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 12);
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isServicesOpen && !mobileMenuOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setIsServicesOpen(false);
      setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isServicesOpen, mobileMenuOpen]);

  const isServicesActive =
    activeNav === "Services" || SERVICES.some((s) => s.name === activeNav);

  const goTo = (label) => (event) => {
    event.preventDefault();
    setActiveNav(label);
    setIsServicesOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="navbar-frame">
        <a
          className="brand"
          href="/"
          aria-label="Opus Geeks home"
          onClick={goTo("Home")}
        >
          <span className="brand-logo-wrap">
            <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img
                className="brand-logo"
                src="/logo.png"
                alt="Opus Geeks"
                width="194"
                height="107"
                fetchPriority="high"
              />
            </picture>
          </span>
        </a>

        <nav className="desktop-menu" aria-label="Main navigation">
          <div className="desktop-link-list">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.path}
                className={`nav-link ${activeNav === item.label ? "active" : ""}`}
                aria-current={activeNav === item.label ? "page" : undefined}
                onClick={goTo(item.label)}
              >
                <span>{item.label}</span>
              </a>
            ))}

            <div
              ref={servicesRef}
              className={`services-menu-wrap ${isServicesOpen ? "is-open" : ""}`}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
              onBlur={(event) => {
                if (!servicesRef.current?.contains(event.relatedTarget)) {
                  setIsServicesOpen(false);
                }
              }}
            >
              <div
                className={`nav-link service-trigger ${isServicesActive ? "active" : ""}`}
              >
                <a
                  href="/services"
                  className="service-trigger-link"
                  aria-current={activeNav === "Services" ? "page" : undefined}
                  onClick={goTo("Services")}
                >
                  Services
                </a>
                <button
                  type="button"
                  className="service-trigger-toggle"
                  aria-expanded={isServicesOpen}
                  aria-controls="services-dropdown"
                  aria-label={
                    isServicesOpen ? "Hide services" : "Show services"
                  }
                  onClick={() => setIsServicesOpen((open) => !open)}
                >
                  <Caret />
                </button>
              </div>

              {/* Always rendered from static data so it never opens empty;
                  visibility is toggled with CSS. */}
              <div
                id="services-dropdown"
                className="service-dropdown"
                hidden={!isServicesOpen}
              >
                <div className="service-dropdown-grid">
                  {SERVICES.map((service, index) => (
                    <a
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="service-option"
                      aria-current={
                        activeNav === service.name ? "page" : undefined
                      }
                      onClick={goTo(service.name)}
                    >
                      <span className="service-option-row">
                        <span className="service-index" aria-hidden="true">
                          0{index + 1}
                        </span>
                        <span className="service-content">
                          <span className="service-name">{service.name}</span>
                          <span className="service-detail">
                            {service.menu}
                          </span>
                        </span>
                        <Arrow />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
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
          >
            <span className="theme-toggle-track" aria-hidden="true">
              <span className="theme-toggle-thumb">
                <Icon name={isDarkMode ? "sun" : "moon"} />
              </span>
            </span>
          </button>

          <a
            className="cta-button"
            href="/contact"
            onClick={goTo("Contact Us")}
          >
            <span className="cta-button-glass">
              <span>Book a call</span>
            </span>
          </a>

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
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
        <nav
          className="mobile-panel"
          id="mobile-menu"
          aria-label="Mobile navigation"
        >
          <div className="mobile-panel-content">
            {NAV_ITEMS.slice(0, 1)
              .concat([{ label: "Services", path: "/services" }])
              .concat(NAV_ITEMS.slice(1))
              .map((item, index) => (
                <a
                  key={item.label}
                  href={item.path}
                  className={`mobile-nav-link ${activeNav === item.label ? "active" : ""}`}
                  aria-current={activeNav === item.label ? "page" : undefined}
                  style={{ "--stagger-index": index }}
                  onClick={goTo(item.label)}
                >
                  <span>{item.label}</span>
                  {item.label === "Services" && <Caret />}
                </a>
              ))}

            <div className="mobile-services">
              {SERVICES.map((service) => (
                <a
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="mobile-service-link"
                  onClick={goTo(service.name)}
                >
                  <span>{service.name}</span>
                  <Arrow />
                </a>
              ))}
            </div>

            <a
              className="mobile-cta-button"
              href="/contact"
              onClick={goTo("Contact Us")}
            >
              <span>Book a free 30-min call</span>
            </a>

            <button
              className={`mobile-theme-toggle ${isDarkMode ? "is-light" : ""}`}
              type="button"
              onClick={onToggleDarkMode}
            >
              <span className="theme-toggle-track" aria-hidden="true">
                <span className="theme-toggle-thumb">
                  <Icon name={isDarkMode ? "sun" : "moon"} />
                </span>
              </span>
              <span className="mobile-theme-label">
                {isDarkMode ? "Light mode" : "Dark mode"}
              </span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
